# FundLink v7

A React + Vite single-page application for connecting founders, investors, and partners.

## Deploy to Vercel

### Option 1: Vercel CLI (fastest)
```bash
npm install
npm run build
npx vercel --prod
```

### Option 2: GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click Deploy

## Local Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build       # production build → dist/
npm run preview     # preview the production build locally
```

## Project Structure
```
├── index.html          # HTML entry point
├── vite.config.js      # Vite config
├── vercel.json         # Vercel SPA routing + cache headers
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx        # React entry point
    ├── index.css       # Global styles
    └── App.jsx         # Full application (~9,900 lines)
```
