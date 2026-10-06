# Akhil Damaramadugu — Portfolio

React + Vite + Framer Motion. **Kinetic typography** in an editorial layout: charcoal `#090907` and earth brown `#6C5636`, on a derived paper tone (light) or charcoal (dark). Fully responsive; respects `prefers-reduced-motion`.

## Type

[Onest](https://fonts.google.com/specimen/Onest) (variable, weights 100–900), bundled locally via Fontsource. The weight axis drives most of the motion. SF Pro Display is listed as a fallback in the font stack; Apple's licence doesn't allow embedding it on websites, so it only appears on Apple devices if Onest fails to load.

## Kinetic system (`src/components/Kinetic.jsx`)

- **ProximityText** — the hero name: letters gain weight, stretch taller and lean toward the cursor; a slow weight wave runs through it on touch/idle. It arrives scrambled and rearranges into "Akhil.", and splits apart as you scroll past. Also used for the email link and the footer.
- **KineticTitle** — section titles: letters rise, rotate and un-stretch into place, then each line drifts sideways with scroll (alternating directions).
- **ScrollWords** — the About lead paragraph fills in word by word as you scroll.
- **Odometer** — stats and scores roll digit by digit and gain weight as they land.
- **VelocityBand** — big type bands that skew and stretch with scroll speed and reverse when you scroll up.
- **HoverWave** — weight ripples through a word on hover (skills, interests, education, repos, "AWS").
- **RollText** — link and button labels roll their letters on hover.

**Cursor** (`src/components/Cursor.jsx`) — a minimal 8px dot in difference blend (it inverts whatever it's over, so it suits both themes). It grows slightly over links and buttons, hides over form fields, and stretches into a thin vertical line while you scroll. Fine pointers only; off with reduced motion.

Colours live at the top of `src/styles.css` (`--charcoal`, `--earth`, `--paper`).

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Update content

Everything lives in `src/data/portfolio.js`. Links that are empty (`""`) show a "coming soon" state instead of breaking:

- `projects[].githubUrl` — repo link for each project (falls back to your GitHub profile)
- `projects[].demoUrl` — live demo link

## Before you deploy

1. **Resume:** put your PDF at `public/Akhil_Damaramadugu_Resume.pdf` (or change `profile.resumeUrl`).
2. **Contact form:** by default it opens the visitor's email app with the message pre-filled. To receive messages directly, create a free form at Formspree (or similar), copy `.env.example` to `.env`, and set `VITE_FORM_ENDPOINT`. That URL is public by design; never put API keys or secrets in frontend code.
3. **Open Graph:** after deploying, uncomment `og:url` and `og:image` in `index.html` and add a 1200×630 preview image to `public/`.

## Deploy

Works on Vercel, Netlify, GitHub Pages, or AWS (S3 + CloudFront). Build command `npm run build`, output directory `dist`.

## Structure

```
src/
  components/   Navbar, Hero, About (incl. interests), Skills, Projects,
                ProjectCard, ProjectVisuals, ProjectModal, Certifications,
                TechCycler, Cursor, Education, GithubSection, Contact, Footer, ui,
                Kinetic (ProximityText, KineticTitle, ScrollWords, Odometer,
                VelocityBand, HoverWave, RollText, FadeIn)
  data/         portfolio.js  (all content)
  hooks/        useActiveSection, useCycle
  App.jsx  main.jsx  styles.css
public/         favicon.svg  (+ your resume PDF)
```
