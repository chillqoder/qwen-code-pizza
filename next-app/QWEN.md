# Next.js App - Project Context

## Project Overview

This is a **Next.js 16** application bootstrapped with `create-next-app`. It uses the **App Router** architecture (Next.js 13+) with TypeScript and Tailwind CSS v4 for styling.

### Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.1.6 |
| Language | TypeScript 5 |
| UI Library | React 19.2.3 |
| Styling | Tailwind CSS v4 |
| Fonts | Geist Sans & Geist Mono (via `next/font`) |
| Linting | ESLint 9 with `eslint-config-next` |

### Architecture

- **App Router**: Uses the `src/app/` directory structure for routing
- **Server Components**: Default React Server Components (RSC) pattern
- **Path Aliases**: `@/*` resolves to `./src/*`
- **Dark Mode**: Automatic color scheme detection via CSS media query

## Building and Running

### Development

```bash
yarn dev
```

Starts the development server at [http://localhost:3000](http://localhost:3000) with hot reload.

### Production Build

```bash
yarn build    # Build for production
yarn start    # Start production server
```

### Linting

```bash
yarn lint
```

Runs ESLint with Next.js recommended configuration.

## Development Conventions

### TypeScript

- **Strict mode** enabled
- **No emit** - compilation handled by Next.js
- **Module resolution**: `bundler` strategy
- **ES2017** target
- Files: `.ts`, `.tsx`, `.mts`

### Code Style

- ESLint configured via `eslint.config.mjs` (flat config format)
- Extends `eslint-config-next` with TypeScript support
- Ignored: `.next/`, `out/`, `build/`, `next-env.d.ts`

### Styling

- Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- CSS custom properties for theming (`--background`, `--foreground`)
- Utility-first approach with Tailwind classes
- Geist font family for sans-serif and mono text

### File Structure

```
next-app/
├── src/
│   └── app/
│       ├── layout.tsx    # Root layout (metadata, fonts, global styles)
│       ├── page.tsx      # Home page (/)
│       └── globals.css   # Global styles & Tailwind imports
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint flat config
└── postcss.config.mjs    # PostCSS configuration
```

### Key Patterns

1. **Layout-Page Pattern**: `layout.tsx` wraps all pages; `page.tsx` defines route content
2. **Metadata API**: Export `metadata` constant for SEO/title/description
3. **Image Optimization**: Use `next/image` component for optimized images
4. **Dark Mode**: CSS-based automatic switching via `prefers-color-scheme`

## Useful Commands Summary

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Create production build |
| `yarn start` | Run production server |
| `yarn lint` | Run ESLint |
