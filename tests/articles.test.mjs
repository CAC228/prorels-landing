import assert from 'node:assert/strict';
import test from 'node:test';
import { articles, getArticle, getPublishedArticles, readingMinutes } from '../src/content/articles.ts';

test('public article registry has valid unique URLs, dates and contents anchors', () => {
  const slugs = new Set();
  for (const article of articles) {
    assert.match(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(!slugs.has(article.slug), `duplicate slug: ${article.slug}`);
    slugs.add(article.slug);
    assert.ok(article.title.trim() && article.description.trim());
    assert.match(article.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(article.publishedAt).toISOString().slice(0, 10), article.publishedAt);
    assert.equal(new Date(article.updatedAt).toISOString().slice(0, 10), article.updatedAt);
    assert.ok(article.updatedAt >= article.publishedAt);
    const anchors = article.sections.map(section => section.id);
    assert.equal(new Set(anchors).size, anchors.length);
    assert.ok(!anchors.includes('takeaway'));
    for (const section of article.sections) {
      assert.match(section.id, /^[a-z0-9-]+$/);
      assert.ok(section.title && section.paragraphs.length);
      if (section.table) for (const row of section.table.rows) assert.equal(row.length, section.table.headers.length);
    }
    assert.ok(readingMinutes(article) > 0);
  }
});

test('drafts are excluded from the shared public registry', () => {
  const draft = { ...articles[0], slug: 'not-for-publication', status: 'draft' };
  assert.deepEqual(getPublishedArticles([draft, articles[0]]), [articles[0]]);
  assert.equal(getArticle('not-for-publication'), undefined);
  assert.equal(getArticle('unknown-article'), undefined);
});
