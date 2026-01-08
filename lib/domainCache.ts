/**
 * Domain Cache - In-memory caching for domain lookups
 * 
 * This provides a simple LRU-style cache for domain→slug mappings
 * to reduce database queries in the middleware.
 * 
 * For production at scale (10k+ users), consider:
 * - Vercel Edge Config
 * - Vercel KV (Redis)
 * - Upstash Redis
 */

interface CachedDomain {
  slug: string | null;
  isPublished: boolean;
  cachedAt: number;
}

// Cache TTL in milliseconds (5 minutes)
const CACHE_TTL_MS = 5 * 60 * 1000;

// Maximum number of cached domains
const MAX_CACHE_SIZE = 1000;

// In-memory cache
const domainCache = new Map<string, CachedDomain>();

/**
 * Get a domain from the cache
 * Returns null if not cached or expired
 */
export function getCachedDomain(domain: string): CachedDomain | null {
  const cached = domainCache.get(domain);
  
  if (!cached) {
    return null;
  }
  
  // Check if expired
  if (Date.now() - cached.cachedAt > CACHE_TTL_MS) {
    domainCache.delete(domain);
    return null;
  }
  
  return cached;
}

/**
 * Set a domain in the cache
 */
export function setCachedDomain(
  domain: string, 
  slug: string | null, 
  isPublished: boolean
): void {
  // Evict oldest entries if cache is full
  if (domainCache.size >= MAX_CACHE_SIZE) {
    // Remove the first (oldest) entry
    const firstKey = domainCache.keys().next().value;
    if (firstKey) {
      domainCache.delete(firstKey);
    }
  }
  
  domainCache.set(domain, {
    slug,
    isPublished,
    cachedAt: Date.now(),
  });
}

/**
 * Invalidate a specific domain from cache
 * Call this when a domain's settings change
 */
export function invalidateDomain(domain: string): void {
  domainCache.delete(domain);
}

/**
 * Invalidate all cached domains
 * Call this during deployments or major changes
 */
export function invalidateAllDomains(): void {
  domainCache.clear();
}

/**
 * Get cache statistics for monitoring
 */
export function getCacheStats(): { size: number; maxSize: number; ttlMs: number } {
  return {
    size: domainCache.size,
    maxSize: MAX_CACHE_SIZE,
    ttlMs: CACHE_TTL_MS,
  };
}
