import { redis } from "./redis";
import { RATE_LIMIT_LUA } from "./rate-limit-script";
import { db } from "./db";
import { apiKeys, userRateLimits } from "./db/schema";
import { eq } from "drizzle-orm";

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
  limits?: {
    perMinute: { current: number; max: number };
    perDay: { current: number; max: number };
  };
}

function minuteKey(id: string, ts: number) {
  const d = new Date(ts);
  return `${d.getUTCFullYear()}${d.getUTCMonth()}${d.getUTCDate()}${d.getUTCHours()}${d.getUTCMinutes()}`;
}

function dayKey(id: string, ts: number) {
  const d = new Date(ts);
  return `${d.getUTCFullYear()}${d.getUTCMonth()}${d.getUTCDate()}`;
}

export async function checkRateLimit(
  apiKeyId: string,
  userId: string
): Promise<RateLimitResult> {
  const now = Date.now();

  /* ---- fetch limits (cached later if needed) ---- */
  const [apiKey] = await db
    .select()
    .from(apiKeys)
    .where(eq(apiKeys.id, apiKeyId))
    .limit(1);

  if (!apiKey) {
    return { allowed: false, reason: "Invalid API key" };
  }

  let [userLimit] = await db
    .select()
    .from(userRateLimits)
    .where(eq(userRateLimits.userId, userId))
    .limit(1);

  if (!userLimit) {
    [userLimit] = await db
      .insert(userRateLimits)
      .values({
        userId,
        requestsPerMinute: 500,
        requestsPerDay: 50000,
      })
      .returning();
  }

  /* ---- redis keys ---- */
  const keys = [
    `rl:api:${apiKeyId}:min:${minuteKey(apiKeyId, now)}`,
    `rl:api:${apiKeyId}:day:${dayKey(apiKeyId, now)}`,
    `rl:user:${userId}:min:${minuteKey(userId, now)}`,
    `rl:user:${userId}:day:${dayKey(userId, now)}`,
  ];

  const result = (await redis.eval(
    RATE_LIMIT_LUA,
    keys.length,
    ...keys,
    apiKey.requestsPerMinute,
    apiKey.requestsPerDay,
    userLimit.requestsPerMinute,
    userLimit.requestsPerDay
  )) as any[];

  if (result[0] === 0) {
    return {
      allowed: false,
      reason: result[1],
    };
  }

  return {
    allowed: true,
    limits: {
      perMinute: {
        current: result[1],
        max: apiKey.requestsPerMinute,
      },
      perDay: {
        current: result[2],
        max: apiKey.requestsPerDay,
      },
    },
  };
}
