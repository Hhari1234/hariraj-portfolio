# Hariraj Kuragayala — Portfolio

Premium portfolio for a software engineer focused on backend systems, AI-powered developer tools, and full-stack product work.

Live site: <https://hariraj-portfolio-1.vercel.app>

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- EmailJS (optional contact form fallback)

## Local development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
npm run preview
```

## Verification scripts

Playwright-based checks in `scripts/` (run against `npm run preview` on
`http://127.0.0.1:4173`, or set `LAYOUT_URL` to point at a deployed URL):

```bash
node scripts/layout-check.mjs    # overflow, text metrics, nav overlap, card overflow, fixed elements
node scripts/behavior-check.mjs   # scroll progress, back-to-top, active nav, form validation, mobile menu
node scripts/section-report.mjs   # per-section geometry, contrast ratios, portrait size
node scripts/verify-content.mjs   # stats, card icon sizes, section order
node scripts/screenshots.mjs      # full-page screenshots at 390/768/1440/1920
```

## Deployment and metadata

- The canonical production URL is `https://hariraj-portfolio-1.vercel.app`; it is set in
  `siteUrl` in `src/data/profile.ts` and mirrored in `index.html`, `public/robots.txt`
  and `public/sitemap.xml`.
- This repository is linked to the Vercel project `hariraj-portfolio-1`
  (see `.vercel/project.json`).
- The portfolio uses `/resume.pdf` from the public folder for the CV download.
- Contact form submissions open the default email client unless EmailJS env values are
  configured in a local `.env` file.

## Notes

- `profile.ts` is the single source of truth for content.
- Project repository, live-demo and certification credential URLs are taken from the CV
  and verified against the live endpoints; a link is only rendered when a real URL exists.
- `.env` is git-ignored and should never contain secrets.
