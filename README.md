# NUSU

Website for the Nile University Student Union. Built with TanStack Start, React, and Tailwind CSS, it includes a landing page, events hub, board overview, contact page, and an admin console for managing all of the above.

## Features

- Marketing site with routes for Home, About, Events, and Contact.
- Database-driven content for events, sponsors, board members, and site copy.
- Admin console at `/admin` with role-based access control (Better Auth).
- S3 image uploads with per-context resolution guidance.
- Responsive, component-driven UI built on Base UI and shadcn patterns.

## Tech stack

- React 19 + TypeScript
- TanStack Start + TanStack Router
- Vite
- Tailwind CSS v4
- Base UI + shadcn-style components
- Prisma + PostgreSQL
- Better Auth (with the `admin` plugin for RBAC)
- Zod for validation
- AWS S3 for image storage
- date-fns for date formatting

## Getting started

### Prerequisites

- Node.js 20.19+ (or newer)
- pnpm (recommended)
- Docker (for local Postgres) or another Postgres instance

### 1. Install

```bash
pnpm install
```

### 2. Configure environment

Edit `.env` and fill in the values described below.

#### Required

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string. |
| `BETTER_AUTH_SECRET` | Random secret used to sign sessions. Generate with `openssl rand -hex 32`. |
| `BETTER_AUTH_URL` | Public origin of the app, e.g. `http://localhost:3000`. |

#### Super admin (used by the seed)

| Variable | Purpose |
| --- | --- |
| `SUPER_ADMIN_EMAIL` | Email of the first super-admin user. |
| `SUPER_ADMIN_PASSWORD` | Password for that user. Use something strong. |
| `SUPER_ADMIN_NAME` | Display name (optional, defaults to "Super Admin"). |

#### AWS S3 (image uploads)

| Variable | Purpose |
| --- | --- |
| `AWS_REGION` | Bucket region, e.g. `eu-central-1`. |
| `AWS_ACCESS_KEY_ID` | IAM access key with `PutObject` on the bucket. |
| `AWS_SECRET_ACCESS_KEY` | IAM secret. |
| `AWS_S3_BUCKET` | Bucket name. |
| `AWS_S3_PUBLIC_URL` | Optional CDN base URL (e.g. `https://cdn.nusu.edu`). Defaults to the virtual-hosted bucket URL. |

### 3. Start Postgres (Docker)

```bash
docker compose up -d
```

The container reads `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, and `POSTGRES_PORT` from `.env`.

### 4. Generate the Prisma client

```bash
pnpm generate
```

### 5. Run migrations

```bash
pnpm migrate
```

### 6. Seed the super admin and singleton content

```bash
pnpm seed
```

This script:

- Creates the super-admin user from `SUPER_ADMIN_EMAIL` / `SUPER_ADMIN_PASSWORD` if it does not already exist (password is hashed via Better Auth's signup flow).
- Promotes that user to the `super-admin` role.
- Inserts default rows for the singleton content tables (`WhoWeAre`, `AboutHero`, `AboutCTA`, `Footer`, `ContactInfo`, `OfficeHours`) so the public site renders before anything has been edited.

The seed is idempotent — running it again only updates the super-admin's role if it has been changed.

### 7. Run locally

```bash
pnpm dev
```

The dev server runs on http://localhost:3000.

## Admin console

The admin console lives at **`/admin`**.

### Signing in

1. Visit <http://localhost:3000/admin>.
2. Unauthenticated requests are redirected to `/login`.
3. Sign in with your `SUPER_ADMIN_EMAIL` / `SUPER_ADMIN_PASSWORD`.

### Roles

There are three roles, defined in `src/lib/auth-shared.ts`:

| Role | What it can do |
| --- | --- |
| `super-admin` | Everything `admin` can do, plus create/update/delete other admin users and impersonate them. Bootstrapped from `.env` via the seed. |
| `admin` | Full CRUD on site content and contact submissions. Cannot manage other users. Created by a super-admin from the **Members** screen. |
| `user` | No admin access. Reserved for future public accounts. |

### Adding a new admin

1. Sign in as a super-admin.
2. Open **Access → Members** in the sidebar.
3. Create a new user with an email, password, and role.

The new admin can then sign in at `/login` with the credentials you set.

## Image uploads

Image-bearing forms (sponsors, board members, events) display the recommended resolution and aspect ratio, and reject files outside the configured limits. Specs live in `src/lib/image-requirements.ts`.

Uploads use presigned PUT URLs issued by `presignImageUploadFn` (see `src/lib/server-fns/uploads.ts`), so the browser uploads directly to S3 without proxying through the Node server. The DB stores the resulting public URL.

The S3 bucket should have:

- CORS configured to allow `PUT` from the app's origin.
- Public read access (or a CloudFront distribution pointed at it via `AWS_S3_PUBLIC_URL`).

## Scripts

```bash
pnpm dev        # Start dev server (port 3000)
pnpm generate   # Prisma client generation
pnpm migrate    # Prisma migrate dev
pnpm push       # Prisma database push
pnpm seed       # Seed super admin + singleton content
pnpm build      # Production build
pnpm preview    # Preview production build
pnpm lint       # ESLint
pnpm format     # Prettier
pnpm typecheck  # TypeScript type check
pnpm test       # Vitest
```

## Project structure

- `src/routes` — File-based routes (Home, About, Events, Contact, Admin).
- `src/routes/admin.tsx` — Admin layout (Better Auth–guarded sidebar shell).
- `src/components` — Page sections and shared UI components.
- `src/components/ui` — shadcn-style primitives (sidebar, dialog, etc).
- `src/data` — Static fallback data (read-only after Phase 2).
- `src/lib/auth.ts` — Better Auth server instance (with `admin` plugin).
- `src/lib/auth-client.ts` — Better Auth React client.
- `src/lib/auth-shared.ts` — Access-control statements shared by client + server.
- `src/lib/server-auth.ts` — `requireAdmin` / `requireSuperAdmin` server-side guards.
- `src/lib/validators.ts` — Zod schemas for every entity.
- `src/lib/s3.ts` — S3 client + presigned URL helper.
- `src/lib/image-requirements.ts` — Per-context image specs surfaced to editors.
- `src/lib/server-fns` — `createServerFn` handlers (uploads, session, etc).
- `prisma/schema.prisma` — Database schema.
- `prisma/seed.ts` — Seed script (super admin + singletons).
- `public` — Static assets (logo, hero images).

## Updating content

After Phase 2 lands, every editable section of the site is managed from `/admin`. Until then, the site falls back to `src/data/events.ts` and `src/data/board.ts`.

## Adding UI components

This project follows shadcn-style component patterns. To add a new component:

```bash
npx shadcn@latest add button
```

Then import it where needed:

```tsx
import { Button } from "@/components/ui/button"
```
