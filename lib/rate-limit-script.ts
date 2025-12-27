export const RATE_LIMIT_LUA = `
-- KEYS:
-- 1 = api minute
-- 2 = api day
-- 3 = user minute
-- 4 = user day

-- ARGV:
-- 1 = api minute limit
-- 2 = api day limit
-- 3 = user minute limit
-- 4 = user day limit

local api_min = redis.call("INCR", KEYS[1])
if api_min == 1 then redis.call("EXPIRE", KEYS[1], 60) end
if api_min > tonumber(ARGV[1]) then return {0, "api_min", api_min} end

local api_day = redis.call("INCR", KEYS[2])
if api_day == 1 then redis.call("EXPIRE", KEYS[2], 86400) end
if api_day > tonumber(ARGV[2]) then return {0, "api_day", api_day} end

local user_min = redis.call("INCR", KEYS[3])
if user_min == 1 then redis.call("EXPIRE", KEYS[3], 60) end
if user_min > tonumber(ARGV[3]) then return {0, "user_min", user_min} end

local user_day = redis.call("INCR", KEYS[4])
if user_day == 1 then redis.call("EXPIRE", KEYS[4], 86400) end
if user_day > tonumber(ARGV[4]) then return {0, "user_day", user_day} end

return {1, api_min, api_day, user_min, user_day}
`;
