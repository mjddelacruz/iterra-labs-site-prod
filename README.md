# Iterra Labs — Marketing Site

Public marketing website for [Iterra Labs](https://www.iterralabs.com): a boutique AI and cloud engineering studio based in Australia. Built with Next.js as a single-page site with SEO, contact delivery, and canonical-domain redirects.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Resend](https://resend.com/) — contact form email delivery
- [Google reCAPTCHA v3](https://www.google.com/recaptcha/) — spam protection on the contact form

## Features

- Responsive landing page (hero, services, process, about, contact)
- Contact API route with server-side reCAPTCHA verification
- SEO: metadata, JSON-LD, dynamic Open Graph image, `sitemap.xml`, `robots.txt`
- Middleware: 301 redirects from `iterralabs.com` / `iterralabs.com.au` → `www.iterralabs.com`

## Prerequisites

- Node.js 18.18+ (Node 20+ recommended)
- npm

## Getting started

```bash
# Install dependencies
npm install

# Copy environment template and fill in values
cp .env.example .env.local

# Run development server (http://localhost:4000)
npm run dev
```

## Environment variables

Create `.env.local` from `.env.example`:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://www.iterralabs.com`) |
| `RESEND_API_KEY` | Resend API key for sending email |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in Resend |
| `CONTACT_TO_EMAIL` | Inbox that receives contact submissions |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key (client) |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret key (server) |

Site copy and defaults live in `lib/site.ts`. Contact form logic is in `app/api/contact/route.ts`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port **4000** |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run Next.js ESLint |

## Project structure

```
app/
  api/contact/     # POST handler — reCAPTCHA + Resend
  components/      # Page sections and shared UI
  layout.tsx       # Root layout, fonts, metadata
  page.tsx         # Home page
  sitemap.ts       # Dynamic sitemap
  robots.ts        # robots.txt
lib/
  site.ts          # Site config, canonical host, AU redirects
middleware.ts      # Domain canonicalization
```

## Deployment

Deploy to any Next.js-compatible host (e.g. [Vercel](https://vercel.com)). Set all environment variables in the host dashboard and point DNS for `www.iterralabs.com` (and redirect hosts) to the deployment.

## License

Private — © Iterra Labs. All rights reserved.
