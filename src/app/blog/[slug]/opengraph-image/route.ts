import { getArticle, getPublishedArticles } from '@/content/articles';
import { renderBlogImage } from '@/lib/blog-image';

export const dynamic = 'force-static';
export const dynamicParams = false;
export function generateStaticParams() {
  return getPublishedArticles().map(article => ({ slug: article.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) return new Response('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
  return renderBlogImage(article.title, article.category);
}
