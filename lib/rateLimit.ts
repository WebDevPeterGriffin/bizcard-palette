/**
 * Rate Limiter for Domain Operations
 * 
 * Implements a sliding window rate limiter to prevent abuse
 * of domain-related API endpoints.
 * 
 * Default limits:
 * - 5 domain additions per user per day
 * - 10 domain verifications per user per hour
 * - 3 domain removals per user per day
 */

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

// In-memory store for rate limits
// Key format: `${userId}:${operation}`
const rateLimitStore = new Map<string, RateLimitEntry>();

// Rate limit configurations (count, window in milliseconds)
const RATE_LIMITS = {
  'domain:add': { limit: 5, windowMs: 24 * 60 * 60 * 1000 }, // 5 per day
  'domain:verify': { limit: 10, windowMs: 60 * 60 * 1000 }, // 10 per hour
  'domain:remove': { limit: 3, windowMs: 24 * 60 * 60 * 1000 }, // 3 per day
} as const;

export type RateLimitOperation = keyof typeof RATE_LIMITS;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  retryAfterMs?: number;
}

/**
 * Check if an operation is allowed for a user
 * Uses sliding window algorithm
 */
export function checkRateLimit(
  userId: string, 
  operation: RateLimitOperation
): RateLimitResult {
  const key = `${userId}:${operation}`;
  const config = RATE_LIMITS[operation];
  const now = Date.now();
  
  let entry = rateLimitStore.get(key);
  
  // If no entry or window expired, reset
  if (!entry || (now - entry.windowStart) >= config.windowMs) {
    entry = { count: 0, windowStart: now };
    rateLimitStore.set(key, entry);
  }
  
  const remaining = Math.max(0, config.limit - entry.count);
  const resetAt = new Date(entry.windowStart + config.windowMs);
  const retryAfterMs = entry.windowStart + config.windowMs - now;
  
  if (entry.count >= config.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt,
      retryAfterMs,
    };
  }
  
  return {
    allowed: true,
    remaining: remaining - 1, // Account for this operation
    resetAt,
  };
}

/**
 * Consume a rate limit token after operation is successful
 * Call this AFTER the operation succeeds, not before
 */
export function consumeRateLimit(
  userId: string, 
  operation: RateLimitOperation
): void {
  const key = `${userId}:${operation}`;
  const entry = rateLimitStore.get(key);
  
  if (entry) {
    entry.count++;
    rateLimitStore.set(key, entry);
  }
}

/**
 * Get rate limit info without consuming a token
 */
export function getRateLimitInfo(
  userId: string, 
  operation: RateLimitOperation
): RateLimitResult {
  const key = `${userId}:${operation}`;
  const config = RATE_LIMITS[operation];
  const now = Date.now();
  
  const entry = rateLimitStore.get(key);
  
  if (!entry || (now - entry.windowStart) >= config.windowMs) {
    return {
      allowed: true,
      remaining: config.limit,
      resetAt: new Date(now + config.windowMs),
    };
  }
  
  const remaining = Math.max(0, config.limit - entry.count);
  
  return {
    allowed: remaining > 0,
    remaining,
    resetAt: new Date(entry.windowStart + config.windowMs),
    retryAfterMs: remaining <= 0 ? entry.windowStart + config.windowMs - now : undefined,
  };
}

/**
 * Format error message for rate limit exceeded
 */
export function formatRateLimitError(operation: RateLimitOperation, resetAt: Date): string {
  const minutes = Math.ceil((resetAt.getTime() - Date.now()) / (60 * 1000));
  
  if (minutes < 60) {
    return `Too many ${operation.replace('domain:', '')} attempts. Please try again in ${minutes} minutes.`;
  }
  
  const hours = Math.ceil(minutes / 60);
  return `Too many ${operation.replace('domain:', '')} attempts. Please try again in ${hours} hours.`;
}

/**
 * Clean up expired entries (call periodically)
 */
export function cleanupExpiredRateLimits(): number {
  const now = Date.now();
  let cleaned = 0;
  
  for (const [key, entry] of rateLimitStore.entries()) {
    // Find the longest window to determine if entry is completely expired
    const maxWindow = Math.max(...Object.values(RATE_LIMITS).map(c => c.windowMs));
    
    if (now - entry.windowStart > maxWindow) {
      rateLimitStore.delete(key);
      cleaned++;
    }
  }
  
  return cleaned;
}
