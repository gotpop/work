# Gotpop Work

![Deploy Status](https://github.com/gotpop/gotpop-work/actions/workflows/deploy.yml/badge.svg)
[![Production](https://img.shields.io/badge/production-work.gotpop.io-blue)](https://work.gotpop.io)

Professional portfolio site built with Next.js & Storyblok CMS, deployed to AWS EC2.

## Tech Stack

| Category   | Technology       |
| ---------- | ---------------- |
| Framework  | Next.js 16       |
| CMS        | Storyblok        |
| Language   | TypeScript       |
| Styling    | Scoped styles    |
| Deployment | Docker + AWS EC2 |
| CI/CD      | GitHub Actions   |

## Development

```bash
yarn dev        # Start dev server (http://localhost:3001)
yarn build      # Build for production
yarn lint       # Run linter
yarn type-check # Check TypeScript types
```

## Deployment

Automatic deployment via GitHub Actions:

1. Push to `master` branch (triggers deployment)
2. Create PR to `master` (runs lint, format & type checks)
3. Merge PR (deploys to EC2 at https://work.gotpop.io)
