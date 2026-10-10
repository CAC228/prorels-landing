import type { MetadataRoute } from 'next';
import { identity } from '@/lib/site';
export default function robots(): MetadataRoute.Robots {
  // Let crawlers read the noindex on previews. Production includes only its own sitemap.
  return { rules: { userAgent: '*', allow: '/' }, ...(identity.indexable && identity.origin ? { sitemap: `${identity.origin}/sitemap.xml` } : {}) };
}
