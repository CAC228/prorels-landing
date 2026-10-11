export const leadRecipient = 'zakaz@prorelsa.ru';
export const leadLimits = { email: 254, phone: 40, comment: 4000, body: 24000 };
export type LeadFields = 'email' | 'phone' | 'comment' | 'consent';
export type LeadErrors = Partial<Record<LeadFields, string>>;
export type LeadInput = {
  email: string;
  phone: string;
  comment: string;
  consent: true;
  sourcePath: string;
  utm: Record<string, string>;
};
export const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
export const isEmail = (value: string) => value.length <= leadLimits.email && /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(value);

export function validateLead(value: unknown): { data?: LeadInput; errors: LeadErrors; spam?: boolean } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { errors: { comment: 'Проверьте данные формы.' } };
  const raw = value as Record<string, unknown>;
  const field = (name: string) => typeof raw[name] === 'string' ? raw[name].trim() : '';
  if (field('website')) return { errors: {}, spam: true };
  const email = field('email');
  const phone = field('phone');
  const comment = field('comment');
  const errors: LeadErrors = {};
  if (!isEmail(email)) errors.email = 'Укажите почту в формате name@company.ru.';
  if (phone.length > leadLimits.phone || !/^\+?[\d ()-]+$/.test(phone) || !/^\d{7,15}$/.test(phone.replace(/\D/g, ''))) errors.phone = 'Укажите телефон с кодом страны или города.';
  if (comment.length < 5 || comment.length > leadLimits.comment || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(comment)) errors.comment = `Опишите задачу: от 5 до ${leadLimits.comment} символов.`;
  if (raw.consent !== true) errors.consent = 'Подтвердите согласие на обработку данных.';
  if (Object.keys(errors).length) return { errors };
  const sourcePath = field('sourcePath');
  const utm: Record<string, string> = {};
  if (raw.utm && typeof raw.utm === 'object' && !Array.isArray(raw.utm)) {
    const supplied = raw.utm as Record<string, unknown>;
    for (const key of utmKeys) {
      if (typeof supplied[key] === 'string') utm[key] = supplied[key].replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 160);
    }
  }
  return { data: { email, phone, comment, consent: true, sourcePath, utm }, errors: {} };
}
