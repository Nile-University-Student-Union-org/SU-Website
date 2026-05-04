# NUSU

Website for the Nile University Student Union. Built with TanStack Start, React, and Tailwind CSS, it includes a landing page, events hub, board overview, and contact page.

## Features

- Marketing site with routes for Home, About, Events, and Contact.
- Data-driven events and board listings.
- Responsive, component-driven UI built on Base UI and shadcn patterns.

## Tech stack

- React 19 + TypeScript
- TanStack Start + TanStack Router
- Vite
- Tailwind CSS v4
- Base UI + shadcn-style components
- date-fns for date formatting

## Getting started

### Prerequisites

- Node.js 20.19+ (or newer)
- pnpm (recommended)

### Install

```bash
pnpm install
```

### Configure environment

```bash
cp .env.example .env
```

Update `DATABASE_URL` in `.env` with your Postgres connection string.

### Run database (Docker)

```bash
docker compose up -d
```

The container uses `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, and
`POSTGRES_PORT` from `.env`.

### Generate Prisma client

```bash
pnpm generate
```

### Run migrations (development)

```bash
pnpm migrate
```

### Run locally

```bash
pnpm dev
```

The dev server runs on http://localhost:3000.

## Scripts

```bash
pnpm dev        # Start dev server (port 3000)
pnpm generate   # Prisma client generation
pnpm migrate    # Prisma migrate dev
pnpm push       # Prisma database push
pnpm build      # Production build
pnpm preview    # Preview production build
pnpm lint       # ESLint
pnpm format     # Prettier
pnpm typecheck  # TypeScript type check
pnpm test       # Vitest
```

## Project structure

- src/routes - File-based routes (Home, About, Events, Contact)
- src/components - Page sections and shared UI components
- src/data - Events and board data
- public - Static assets (logo, hero images)

## Updating content

- Events data lives in src/data/events.ts.
- Board and committee data lives in src/data/board.ts.
- Hero and brand images are in public (logo.svg, hero-text.png, student-group.png, hand.png, person.jpg).

## Adding UI components

This project follows shadcn-style component patterns. To add a new component:

```bash
npx shadcn@latest add button
```

Then import it where needed:

```tsx
import { Button } from "@/components/ui/button"
```
