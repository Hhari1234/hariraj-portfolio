# Hariraj Kuragayala — Portfolio

Personal developer portfolio built with React, TypeScript, Vite, Tailwind CSS, React Three Fiber, and Framer Motion.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Three.js + React Three Fiber + drei (hero 3D scene)
- Framer Motion (animations, scroll reveals, reduced-motion aware)
- Optional: EmailJS (contact form)

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview   # serve the build locally to sanity-check it
```

Output goes to `dist/`.

## Lint

```bash
npm run lint
```

## Contact form (optional)

The contact form works out of the box — without any configuration it opens the visitor's
email client with a pre-filled message addressed to you. No errors, no broken UI.

To have it send email directly instead, create a `.env` file (see `.env.example`) with:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [emailjs.com](https://www.emailjs.com) after creating a service + template.
`.env` is git-ignored — never commit real keys.

## Adding a personal photo (optional)

No photo was supplied, so none was invented or placed in the design. The Hero uses the 3D
scene instead, and About uses focus-area cards. If you'd like to add a headshot:

1. Drop the image in `src/assets/` (e.g. `photo.jpg`, ideally a square, ≥600×600px, WebP or
   optimized JPG).
2. Add an `<img>` in `About.tsx` or `Hero.tsx` with `loading="lazy" decoding="async"` and a
   descriptive `alt`.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
4. If using EmailJS, add the three `VITE_EMAILJS_*` variables in Vercel's Environment
   Variables settings.
5. Deploy. Vercel will give you a URL like `https://<project-name>.vercel.app`.
6. Once you have the real URL, replace every occurrence of the placeholder
   `https://hariraj-portfolio.vercel.app` in `index.html`, `public/robots.txt`, and
   `public/sitemap.xml` with your actual URL, then redeploy.

A `vercel.json` is not required for this static Vite SPA — Vercel's Vite preset handles
SPA routing automatically. If you add client-side routes later and see 404s on refresh,
add a `vercel.json` with a rewrite of `/(.*) -> /index.html`.

## Project structure

```
src/
  components/
    common/     — ErrorBoundary
    layout/     — Navbar, Footer, LoadingScreen
    sections/   — Hero, About, Skills, Experience, FeaturedProject, Projects,
                  Certifications, GitHubActivity, Contact
    3d/         — HeroScene, TechChip, Particles, HeroSceneWrapper (lazy + Suspense)
    ui/         — Button, SectionHeader, Reveal, RotatingRoles, ProjectCard,
                  ArchitectureFlow, BrandIcons
  data/         — profile.ts (single source of truth, sourced from resume)
  hooks/        — useReducedMotion, useIsMobile, useActiveSection
  types/        — shared TypeScript interfaces
public/
  resume.pdf, favicon.svg, robots.txt, sitemap.xml, manifest.json
```
