export function resolveSiteIdentity(env: Record<string, string | undefined>) {
  const input = env.SITE_URL?.trim();
  const wantsIndexing = env.SITE_INDEXABLE === 'true';
  let origin: string | undefined;
  if (input) {
    const url = new URL(input);
    if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
      throw new Error('SITE_URL must be an HTTPS origin without a path, credentials, query or fragment.');
    }
    if (/^(localhost|127\.|0\.|\[::1\])/.test(url.hostname) || url.hostname.endsWith('.local') || url.hostname.endsWith('.test') || url.hostname.endsWith('.example')) {
      throw new Error('SITE_URL must be the public landing domain.');
    }
    if (['prorelsa.ru', 'www.prorelsa.ru', 'traer.ru', 'www.traer.ru'].includes(url.hostname)) {
      throw new Error('The landing needs its own domain; do not canonicalize it to the catalog.');
    }
    origin = url.origin;
  }
  if (wantsIndexing && !origin) {
    throw new Error('Set SITE_URL before enabling SITE_INDEXABLE.');
  }
  const indexable = Boolean(origin && wantsIndexing && env.VERCEL_ENV !== 'preview');
  return { origin, indexable };
}
