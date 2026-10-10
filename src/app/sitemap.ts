import type { MetadataRoute } from 'next';
import { identity } from '@/lib/site';
import { getPublishedArticles } from '@/content/articles';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!identity.indexable || !identity.origin) return [];
  return [
    { url: `${identity.origin}/` },
    { url: `${identity.origin}/blog` },
    ...getPublishedArticles().map(article => ({ url: `${identity.origin}/blog/${article.slug}`, lastModified: article.updatedAt })),
  ];
}
