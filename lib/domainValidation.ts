/**
 * Domain validation utilities for custom domain support
 * Handles format validation, normalization, and pre-flight checks
 */

// Valid domain format regex - supports subdomains and apex domains
// Must start with alphanumeric, can contain hyphens, must have at least one dot
const DOMAIN_REGEX = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;

// Reserved/protected domains that users cannot claim
const BLOCKED_DOMAINS = [
  'localhost',
  'vercel.app',
  'vercel.com',
  'supabase.co',
  'supabase.com',
  'mildtechstudios.com',
  // Add more as needed
];

// TLDs that are commonly used for testing and shouldn't be allowed
const BLOCKED_TLDS = [
  'local',
  'localhost',
  'test',
  'example',
  'invalid',
];

export interface DomainValidationResult {
  valid: boolean;
  message?: string;
  normalized?: string;
}

/**
 * Normalizes a domain string by:
 * - Converting to lowercase
 * - Removing protocol (http://, https://)
 * - Removing trailing slashes and paths
 * - Removing www. prefix (optional, configurable)
 */
export function normalizeDomain(domain: string): string {
  let normalized = domain.trim().toLowerCase();
  
  // Remove protocol
  normalized = normalized.replace(/^https?:\/\//, '');
  
  // Remove path, query, hash
  normalized = normalized.split('/')[0];
  normalized = normalized.split('?')[0];
  normalized = normalized.split('#')[0];
  
  // Remove port
  normalized = normalized.split(':')[0];
  
  // Remove trailing dots
  normalized = normalized.replace(/\.+$/, '');
  
  return normalized;
}

/**
 * Validates domain format and returns detailed result
 */
export function validateDomainFormat(domain: string): DomainValidationResult {
  if (!domain || typeof domain !== 'string') {
    return {
      valid: false,
      message: 'Domain is required',
    };
  }

  const normalized = normalizeDomain(domain);

  // Check for empty after normalization
  if (!normalized) {
    return {
      valid: false,
      message: 'Please enter a valid domain name',
    };
  }

  // Check if user included protocol
  if (domain.includes('://')) {
    return {
      valid: false,
      message: "Don't include http:// or https:// - just enter the domain (e.g., example.com)",
      normalized,
    };
  }

  // Check for spaces
  if (domain.includes(' ')) {
    return {
      valid: false,
      message: 'Domain cannot contain spaces',
      normalized,
    };
  }

  // Check minimum length (a.co = 4 chars)
  if (normalized.length < 4) {
    return {
      valid: false,
      message: 'Domain is too short',
      normalized,
    };
  }

  // Check maximum length (253 chars per DNS spec)
  if (normalized.length > 253) {
    return {
      valid: false,
      message: 'Domain is too long (max 253 characters)',
      normalized,
    };
  }

  // Check format with regex
  if (!DOMAIN_REGEX.test(normalized)) {
    return {
      valid: false,
      message: 'Invalid domain format. Use format like: example.com or subdomain.example.com',
      normalized,
    };
  }

  // Check for consecutive dots
  if (normalized.includes('..')) {
    return {
      valid: false,
      message: 'Domain cannot contain consecutive dots',
      normalized,
    };
  }

  // Check for blocked domains
  for (const blocked of BLOCKED_DOMAINS) {
    if (normalized === blocked || normalized.endsWith(`.${blocked}`)) {
      return {
        valid: false,
        message: 'This domain is not allowed',
        normalized,
      };
    }
  }

  // Check for blocked TLDs
  const tld = normalized.split('.').pop() || '';
  if (BLOCKED_TLDS.includes(tld)) {
    return {
      valid: false,
      message: `Domains ending in .${tld} are not allowed`,
      normalized,
    };
  }

  // Check each label (part between dots)
  const labels = normalized.split('.');
  for (const label of labels) {
    if (label.length > 63) {
      return {
        valid: false,
        message: 'Each part of the domain cannot exceed 63 characters',
        normalized,
      };
    }
    if (label.startsWith('-') || label.endsWith('-')) {
      return {
        valid: false,
        message: 'Domain parts cannot start or end with a hyphen',
        normalized,
      };
    }
  }

  return {
    valid: true,
    normalized,
  };
}

/**
 * Generates a unique verification token for domain ownership
 */
export function generateVerificationToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = 'dbc-';
  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

/**
 * Gets the TXT record name for domain verification
 */
export function getVerificationRecordName(domain: string): string {
  return `_dbc-verify.${domain}`;
}

/**
 * Checks if domain is a subdomain (has more than 2 parts)
 * e.g., blog.example.com = true, example.com = false
 */
export function isSubdomain(domain: string): boolean {
  const normalized = normalizeDomain(domain);
  return normalized.split('.').length > 2;
}

/**
 * Gets the apex domain from a subdomain
 * e.g., blog.example.com -> example.com
 */
export function getApexDomain(domain: string): string {
  const normalized = normalizeDomain(domain);
  const parts = normalized.split('.');
  if (parts.length <= 2) {
    return normalized;
  }
  return parts.slice(-2).join('.');
}
