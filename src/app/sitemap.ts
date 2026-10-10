import type { MetadataRoute } from 'next';
import { identity } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return identity.indexable && identity.origin ? [{ url: `${identity.origin}/` }] : [];
}
