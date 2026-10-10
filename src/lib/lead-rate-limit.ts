import { createHash } from 'node:crypto';
import { isIP } from 'node:net';

const windowMs = 15 * 60 * 1000;
const entries = new Map<string, { count: number; expires: number }>();

export function rateLimitKey(headers: Headers, email: string, trustProxy: boolean) {
  // Enable only behind a proxy that overwrites this header and blocks direct access.
  const forwarded = trustProxy ? headers.get('x-real-ip')?.trim() : '';
  const identity = forwarded && isIP(forwarded) ? forwarded : email.toLowerCase();
  return createHash('sha256').update(identity).digest('hex');
}

export function takeLeadSlot(key: string, now = Date.now()) {
  for (const [id, value] of entries) if (value.expires <= now) entries.delete(id);
  const global = entries.get('global');
  const client = entries.get(key);
  if (global && global.count >= 60) return Math.ceil((global.expires - now) / 1000);
  if (client && client.count >= 5) return Math.ceil((client.expires - now) / 1000);
  for (const id of ['global', key]) {
    const value = entries.get(id) ?? { count: 0, expires: now + windowMs };
    value.count += 1;
    entries.set(id, value);
  }
  return 0;
}
