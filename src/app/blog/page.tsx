import { ArticleCard, BlogLabel, Breadcrumbs } from '@/components/blog';
import { getPublishedArticles } from '@/content/articles';
import { blogMetadata, blogStructuredData } from '@/lib/blog-seo';

export const metadata = blogMetadata();

export default function BlogPage() {
  const articles = getPublishedArticles();
  return <main id="main" className="blog-index">
    <div className="container">
      <Breadcrumbs />
      <header className="blog-index-heading">
        <BlogLabel />
        <h1>Полезные материалы<br />для закупки ВСП</h1>
        <p>От первой спецификации до приёмки на объекте.<br />Разбираем вопросы, которые возникают перед поставкой.</p>
      </header>
      <section aria-label="Статьи о закупке материалов ВСП">
        <div className="blog-index-divider"><span>Все материалы</span><span>Материалов: {articles.length}</span></div>
        <div className="article-grid">{articles.map(article => <ArticleCard key={article.slug} article={article} heading="h2" />)}</div>
      </section>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData()).replace(/</g, '\\u003c') }} />
  </main>;
}
