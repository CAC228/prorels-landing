import nodemailer from 'nodemailer';
import { isEmail, leadRecipient, type LeadInput } from './lead-contract.ts';
import { renderLeadEmail, type LeadSource } from './lead-email.ts';

export class MailConfigurationError extends Error {}

export function smtpSettings(env: NodeJS.ProcessEnv) {
  const host = env.SMTP_HOST?.trim();
  const from = env.SMTP_FROM?.trim();
  const port = Number(env.SMTP_PORT || 465);
  // Plain SMTP is only available for an explicitly selected loopback test sink.
  const localTest = env.SMTP_LOCAL_TEST === 'true' && ['127.0.0.1', '::1'].includes(host ?? '');
  if (!host || !from || !isEmail(from) || !Number.isInteger(port) || port < 1 || port > 65535 || (!localTest && (!env.SMTP_USER || !env.SMTP_PASS))) {
    throw new MailConfigurationError('SMTP is not configured');
  }
  if (env.SMTP_LOCAL_TEST === 'true' && !localTest) throw new MailConfigurationError('Test SMTP must use loopback');
  return {
    from,
    transport: {
      host, port, secure: !localTest && port === 465,
      requireTLS: !localTest && port !== 465,
      ...(localTest ? { ignoreTLS: true } : { auth: { user: env.SMTP_USER!, pass: env.SMTP_PASS! } }),
      connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
      disableFileAccess: true, disableUrlAccess: true,
    },
  };
}

export async function sendLead(lead: LeadInput, source: LeadSource, id: string) {
  const settings = smtpSettings(process.env);
  const transport = nodemailer.createTransport(settings.transport);
  try {
    const result = await transport.sendMail({
      from: { name: 'ПроРельс — заявки', address: settings.from },
      to: leadRecipient,
      replyTo: { address: lead.email },
      ...renderLeadEmail(lead, source, id),
      headers: { 'X-Prorels-Source': 'landing', 'X-Prorels-Lead-ID': id },
    });
    if (!result.accepted?.some(address => String(address).toLowerCase() === leadRecipient)) throw new Error('SMTP did not accept recipient');
  } finally {
    transport.close();
  }
}
