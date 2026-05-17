import { AU_REDIRECT_HOSTS, CANONICAL_HOST } from '@/lib/site';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  token?: string;
};

type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
};

// Minimum reCAPTCHA v3 score to accept (0.0 = bot, 1.0 = human).
const SCORE_THRESHOLD = 0.5;
const RECAPTCHA_ACTION = 'contact';

const ALLOWED_RECAPTCHA_HOSTS = new Set([
  CANONICAL_HOST,
  'iterralabs.com',
  'localhost',
  ...AU_REDIRECT_HOSTS,
]);

function isAllowedRecaptchaHostname(hostname: string | undefined) {
  if (!hostname) return false;
  if (ALLOWED_RECAPTCHA_HOSTS.has(hostname)) return true;
  return hostname.endsWith('.vercel.app');
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const company = body.company?.trim() ?? '';
  const message = body.message?.trim() ?? '';
  const token = body.token ?? '';

  // ── Field validation ──
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  // ── reCAPTCHA v3 verification ──
  if (!token) {
    return NextResponse.json({ error: 'Captcha token missing.' }, { status: 400 });
  }
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error('RECAPTCHA_SECRET_KEY is not set');
    return NextResponse.json({ error: 'Server is not configured.' }, { status: 500 });
  }

  try {
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const verify = (await verifyRes.json()) as RecaptchaVerifyResponse;

    if (
      !verify.success ||
      verify.action !== RECAPTCHA_ACTION ||
      (verify.score ?? 0) < SCORE_THRESHOLD ||
      !isAllowedRecaptchaHostname(verify.hostname)
    ) {
      console.warn(
        '[contact] reCAPTCHA rejected:',
        verify['error-codes']?.join(', ') ??
          `action=${verify.action} score=${verify.score} hostname=${verify.hostname}`,
      );
      return NextResponse.json(
        { error: 'Captcha verification failed. Please try again.' },
        { status: 400 },
      );
    }
  } catch (err) {
    console.error('reCAPTCHA verification request failed', err);
    return NextResponse.json({ error: 'Could not verify captcha.' }, { status: 502 });
  }

  // ── Send email via Resend ──
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !fromEmail || !toEmail) {
    console.error('Resend env vars missing (RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL)');
    return NextResponse.json({ error: 'Server is not configured.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const safe = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  try {
    const { error } = await resend.emails.send({
      from: `Iterra Labs site <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || '—'}`,
        '',
        message,
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#111">
          <h2 style="margin:0 0 16px">New contact form submission</h2>
          <p><strong>Name:</strong> ${safe(name)}</p>
          <p><strong>Email:</strong> ${safe(email)}</p>
          <p><strong>Company:</strong> ${safe(company) || '—'}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p style="white-space:pre-wrap">${safe(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend send error', error);
      return NextResponse.json({ error: 'Could not send your message.' }, { status: 502 });
    }
  } catch (err) {
    console.error('Resend threw', err);
    return NextResponse.json({ error: 'Could not send your message.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
