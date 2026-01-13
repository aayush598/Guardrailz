import { db } from '@/shared/db/client';
import { analyticsEvents } from '@/shared/db/schema';
import { eq, and } from 'drizzle-orm';
import { GUARDRAIL_EXECUTED_EVENT } from '../events/guardrail-executed.event';

export async function getGuardrailPerformance(userId: string) {
  return db
    .select()
    .from(analyticsEvents)
    .where(
      and(
        eq(analyticsEvents.userId, userId),
        eq(analyticsEvents.eventType, GUARDRAIL_EXECUTED_EVENT),
      ),
    );
}
