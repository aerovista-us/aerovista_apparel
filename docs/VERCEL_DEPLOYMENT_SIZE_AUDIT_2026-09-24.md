# Vercel deployment-size audit — 2026-09-24

The Vite application builds from `index.html`, `src/`, and deployable assets under `public/`.

Large product/mockup source images also live at the repository root and under `AeroVista Products/`. Those files remain preserved in Git but are not required by `vite build`; production gallery assets already live under `public/`.

This change adds `.vercelignore` so those source masters are not uploaded into each Vercel build context. Runtime files and `public/` remain untouched.
