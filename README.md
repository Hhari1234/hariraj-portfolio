# Hariraj Kuragayala — Portfolio

Premium portfolio for a software engineer focused on backend systems, AI-powered developer tools, and full-stack product work.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Framer Motion
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

## Deployment and metadata

- Replace the placeholder Vercel URL in `siteUrl` and the metadata files once the real deployment URL is known.
- The portfolio uses `/resume.pdf` from the public folder for the CV download.
- Contact form submissions open the default email client unless EmailJS env values are configured in a local `.env` file.

## Notes

- `profile.ts` is the single source of truth for content.
- The project intentionally hides any missing repo or live demo link until a verified public URL is available.
- `.env` is git-ignored and should never contain secrets.
