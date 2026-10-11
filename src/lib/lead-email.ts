import type { LeadInput } from './lead-contract.ts';

export type LeadSource = { title: string; url: string; path: string };
export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);

export function renderLeadEmail(lead: LeadInput, source: LeadSource, id: string, date = new Date()) {
  const time = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Moscow' }).format(date);
  const e = escapeHtml;
  const campaign = Object.entries(lead.utm).filter(([, value]) => value);
  const text = [
    '#ПроРельс — новая заявка', `Номер: ${id}`, `Получена: ${time} (МСК)`, '',
    `Почта: ${lead.email}`, `Телефон: ${lead.phone}`, '', 'Комментарий:', lead.comment, '',
    'Источник: лендинг ПроРельс', `Страница: ${source.title}`, `Адрес: ${source.url}`,
    ...campaign.map(([key, value]) => `${key}: ${value}`), '',
    'Согласие на обработку данных: подтверждено в форме.', 'Ответ на это письмо будет отправлен заявителю.',
  ].join('\n');
  const row = (label: string, value: string) => `<tr><td style="padding:10px 0;color:#5b6871;font-size:13px;vertical-align:top;width:100px">${label}</td><td style="padding:10px 0;font-size:16px;word-break:break-word">${value}</td></tr>`;
  const html = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Новая заявка — ПроРельс</title></head>
<body style="margin:0;padding:0;background:#f3f5f6;color:#151D25;font-family:Arial,sans-serif">
<div style="display:none;max-height:0;overflow:hidden">Заявка с лендинга ПроРельс · ${e(source.title)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f5f6"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#FFFFFF;border:1px solid #dde3e7">
<tr><td style="padding:28px 32px;background:#151D25;border-top:5px solid #FB5A00"><div style="color:#FFFFFF;font-size:30px;font-weight:bold"><span style="color:#FB5A00">#Про</span>Рельс</div><div style="margin-top:10px;color:#FFFFFF;font-size:12px;letter-spacing:2px">РЕЛЬСЫ · ШПАЛЫ · КРЕПЁЖ</div></td></tr>
<tr><td style="padding:32px"><div style="font-size:12px;color:#5b6871">ЗАЯВКА С ЛЕНДИНГА · № ${e(id)}</div><h1 style="font-size:28px;line-height:1.2;margin:14px 0 10px">Новая задача на поставку</h1><p style="margin:0 0 22px;font-size:13px;color:#5b6871">${e(time)} (МСК)</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #dde3e7;border-bottom:1px solid #dde3e7">${row('Почта', `<a style="color:#151D25" href="mailto:${e(lead.email)}">${e(lead.email)}</a>`)}${row('Телефон', `<a style="color:#151D25" href="tel:${e(lead.phone.replace(/[^\d+]/g, ''))}">${e(lead.phone)}</a>`)}</table>
<h2 style="font-size:17px;margin:28px 0 12px">Комментарий клиента</h2><div style="font-size:15px;line-height:1.7;overflow-wrap:anywhere;background:#f3f5f6;border-left:3px solid #FB5A00;padding:18px">${e(lead.comment).replace(/\r?\n/g, '<br>')}</div>
<h2 style="font-size:17px;margin:28px 0 12px">Откуда пришла заявка</h2><p style="font-size:14px;line-height:1.7;margin:0">Лендинг ПроРельс<br><strong>${e(source.title)}</strong><br><a style="color:#151D25;word-break:break-all" href="${e(source.url)}">${e(source.url)}</a></p>
${campaign.length ? `<table role="presentation" width="100%" style="margin-top:14px">${campaign.map(([key, value]) => row(e(key), e(value))).join('')}</table>` : ''}
<p style="margin:28px 0 0"><a href="mailto:${e(lead.email)}" style="display:inline-block;background:#FB5A00;color:#151D25;text-decoration:none;font-weight:bold;font-size:15px;padding:15px 22px;border-radius:3px">Ответить клиенту →</a></p>
</td></tr><tr><td style="padding:20px 32px;border-top:1px solid #dde3e7;font-size:12px;line-height:1.7;color:#5b6871">Клиент подтвердил согласие на обработку данных в форме.<br>Кнопка «Ответить» в почте также направит письмо клиенту.</td></tr>
</table></td></tr></table></body></html>`;
  return { subject: `ПроРельс · заявка с лендинга · ${source.path === '/' ? 'Главная' : 'Блог'} · ${id}`, text, html };
}
