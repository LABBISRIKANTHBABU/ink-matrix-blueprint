/**
 * Simple client-side rate limiter using a sliding window approach.
 * Note: This is a basic protection - server-side rate limiting should also be implemented.
 */

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

const rateLimitStore: Map<string, number[]> = new Map();

/**
 * Check if an action is rate limited
 * @param key - Unique identifier for the rate limit (e.g., 'auth', 'contact-form')
 * @param config - Rate limit configuration
 * @returns Object with allowed status and remaining time if limited
 */
export const checkRateLimit = (
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remainingMs?: number } => {
  const now = Date.now();
  const attempts = rateLimitStore.get(key) || [];

  // Filter out expired attempts
  const validAttempts = attempts.filter((t) => now - t < config.windowMs);

  if (validAttempts.length >= config.maxAttempts) {
    const oldestAttempt = validAttempts[0];
    const remainingMs = config.windowMs - (now - oldestAttempt);
    return { allowed: false, remainingMs };
  }

  // Record this attempt
  validAttempts.push(now);
  rateLimitStore.set(key, validAttempts);

  return { allowed: true };
};

/**
 * Reset rate limit for a specific key
 */
export const resetRateLimit = (key: string): void => {
  rateLimitStore.delete(key);
};

/**
 * Format remaining time for display
 */
export const formatRemainingTime = (ms: number): string => {
  const seconds = Math.ceil(ms / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
};

// Pre-configured rate limiters
export const AUTH_RATE_LIMIT: RateLimitConfig = {
  maxAttempts: 5,
  windowMs: 60000, // 5 attempts per minute
};

export const FORM_RATE_LIMIT: RateLimitConfig = {
  maxAttempts: 3,
  windowMs: 60000, // 3 submissions per minute
};

export const MESSAGE_RATE_LIMIT: RateLimitConfig = {
  maxAttempts: 5,
  windowMs: 300000, // 5 messages per 5 minutes
};
