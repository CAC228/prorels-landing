import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { act } from 'react';
import { ContactForm } from '../src/components/contact-form';

test('form validates, preserves input after errors, blocks duplicates and confirms actual delivery', async () => {
  const dom = new JSDOM('<!doctype html><html><body><div id="test"></div></body></html>', { url: 'https://landing.example.org/blog/test?utm_source=search&utm_campaign=relsy' });
  const browserErrors: unknown[] = [];
  dom.window.addEventListener('error', event => browserErrors.push(event.error));
  const saved = new Map<string, PropertyDescriptor | undefined>();
  const globals: Record<string, unknown> = {
    window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement,
    HTMLInputElement: dom.window.HTMLInputElement, HTMLFormElement: dom.window.HTMLFormElement,
    FormData: dom.window.FormData, requestAnimationFrame: (callback: FrameRequestCallback) => { callback(0); return 0; },
    IS_REACT_ACT_ENVIRONMENT: true,
  };
  let calls = 0;
  let sent: Record<string, unknown> = {};
  let release: (response: Response) => void = () => {};
  globals.fetch = (_url: string, options: RequestInit) => {
    calls++;
    sent = JSON.parse(options.body as string);
    return new Promise<Response>(resolve => { release = resolve; });
  };
  for (const [name, value] of Object.entries(globals)) {
    saved.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
  }
  const { createRoot } = await import('react-dom/client');
  const root = createRoot(dom.window.document.getElementById('test')!);
  try {
    await act(async () => { root.render(<ContactForm sourcePath="/blog/test" />); });
    const form = dom.window.document.querySelector('form')!;
    const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement;
    const submit = () => form.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    await act(async () => { submit(); });
    assert.equal(calls, 0);
    assert.equal(field('email').getAttribute('aria-invalid'), 'true');
    assert.match(form.textContent!, /Подтвердите согласие/);
    field('email').value = 'buyer@example.org';
    field('phone').value = '+7 900 000-00-00';
    field('comment').value = 'Нужны рельсы Р65 и крепёж.';
    field('consent').checked = true;
    await act(async () => { submit(); submit(); });
    assert.equal(calls, 1, 'duplicate submission while pending is ignored');
    assert.equal(form.querySelector('button')!.disabled, true);
    assert.equal(sent.sourcePath, '/blog/test');
    assert.deepEqual(sent.utm, { utm_source: 'search', utm_medium: '', utm_campaign: 'relsy', utm_content: '', utm_term: '' });
    await act(async () => { release(Response.json({ message: 'Почта пока недоступна.' }, { status: 503 })); });
    assert.match(form.textContent!, /Заявка не отправлена/);
    assert.equal(field('email').value, 'buyer@example.org');
    assert.equal(field('comment').value, 'Нужны рельсы Р65 и крепёж.');
    assert.equal(form.querySelector('button')!.disabled, false);
    await act(async () => { submit(); });
    await act(async () => { release(Response.json({ message: 'Заявка отправлена.', id: 'TEST1234' })); });
    assert.match(form.textContent!, /Спасибо за заявку/);
    assert.match(form.textContent!, /TEST1234/);
    assert.equal(field('email').value, '');
    assert.equal(field('comment').value, '');
    assert.equal(field('consent').checked, false);
    assert.deepEqual(browserErrors, []);
  } finally {
    await act(async () => { root.unmount(); });
    dom.window.close();
    for (const [name, descriptor] of saved) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else Reflect.deleteProperty(globalThis, name);
    }
  }
});
