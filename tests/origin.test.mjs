import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveSiteIdentity } from '../src/lib/origin.ts';

test('a build without the landing domain stays noindex', () => {
  assert.deepEqual(resolveSiteIdentity({}), { origin: undefined, indexable: false });
  assert.throws(() => resolveSiteIdentity({ SITE_INDEXABLE: 'true' }), /Set SITE_URL/);
});
test('indexing requires an explicit switch and canonical HTTPS origin', () => {
  assert.deepEqual(resolveSiteIdentity({ SITE_URL: 'https://landing.prorels.ru/' }), { origin: 'https://landing.prorels.ru', indexable: false });
  assert.deepEqual(resolveSiteIdentity({ SITE_URL: 'https://landing.prorels.ru/', SITE_INDEXABLE: 'true' }), { origin: 'https://landing.prorels.ru', indexable: true });
});
test('preview environment cannot inherit the production indexing switch', () => {
  assert.equal(resolveSiteIdentity({ SITE_URL: 'https://landing.prorels.ru', SITE_INDEXABLE: 'true', VERCEL_ENV: 'preview' }).indexable, false);
});
test('catalog domains, local origins and malformed URL parts cannot become canonical', () => {
  for (const SITE_URL of ['https://prorelsa.ru', 'https://www.prorelsa.ru', 'https://traer.ru', 'http://landing.prorels.ru', 'https://localhost', 'https://127.0.0.1', 'https://site.test', 'https://landing.prorels.ru/page', 'https://landing.prorels.ru/?x=1', 'https://landing.prorels.ru/#main', 'https://user:pass@landing.prorels.ru']) {
    assert.throws(() => resolveSiteIdentity({ SITE_URL, SITE_INDEXABLE: 'true' }), undefined, SITE_URL);
  }
});
test('internationalized domains normalize to the same origin for every SEO surface', () => {
  assert.equal(resolveSiteIdentity({ SITE_URL: 'https://пример.рф' }).origin, 'https://xn--e1afmkfd.xn--p1ai');
});
