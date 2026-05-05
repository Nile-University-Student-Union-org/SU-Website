# NUSU

Website for the Nile University Student Union. Built with TanStack Start, React, and Tailwind CSS, it includes a landing page, events hub, board overview, contact page, and an admin console for managing all of the above.

## Features

- Marketing site with routes for Home, About, Events, and Contact.
- Database-driven content for events, sponsors, board members, and site copy.
- Admin console at `/admin` with role-based access control (Better Auth).
- S3-compatible image uploads (AWS S3, Cloudflare R2, or local MinIO).
- Rich-text editing for long-form fields (Tiptap).
- Responsive, component-driven UI built on Base UI and shadcn patterns.
- Dark/light mode toggle in the admin sidebar.

## Tech stack

- React 19 + TypeScript
- TanStack Start + TanStack Router
- Vite
- Tailwind CSS v4
- Base UI + shadcn-style components
- Prisma + PostgreSQL
- Better Auth (with the `admin` plugin for RBAC)
- Tiptap v2 (rich-text editor)
- Zod for validation
- AWS S3 / Cloudflare R2 / MinIO for image storage
- date-fns for date formatting

## Getting started

### Prerequisites

- Node.js 20.19+ (or newer)
- pnpm (recommended)
- Docker (for local Postgres + MinIO) or external equivalents

### 1. Install

```bash
pnpm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

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

#### S3-compatible image storage

| Variable | Purpose |
| --- | --- |
| `AWS_REGION` | Bucket region, e.g. `eu-central-1`. Use `auto` for Cloudflare R2. |
| `AWS_ACCESS_KEY_ID` | IAM access key (or MinIO/R2 key) with `PutObject` on the bucket. |
| `AWS_SECRET_ACCESS_KEY` | IAM secret (or MinIO/R2 secret). |
| `AWS_S3_BUCKET` | Bucket name. |
| `AWS_S3_ENDPOINT` | Custom endpoint URL. **Required for MinIO and Cloudflare R2** (omit for native AWS S3). |
| `AWS_S3_PUBLIC_URL` | Base URL for serving stored files. Defaults to virtual-hosted S3 URL if unset. |

### 3. Start Postgres and MinIO (Docker)

```bash
docker compose up -d
```

This starts:

- **PostgreSQL** — reads `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT` from `.env`.
- **MinIO** — S3-compatible local object storage on port `9000` (API) and `9001` (console). Uses `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` as credentials.
- **minio-init** — one-shot container that creates the bucket and sets it to public-read automatically.

MinIO console: <http://localhost:9001>

### 4. Generate the Prisma client

```bash
pnpm generate
```

### 5. Run migrations

```bash
pnpm migrate
```

### 6. Seed the database

> **This step is mandatory.** Skipping it leaves the app in a broken state:
>
> - There will be no super-admin account, so you cannot log in to the admin console at all.
> - The singleton content rows (`WhoWeAre`, `AboutHero`, `AboutCTA`, `Footer`, `ContactInfo`, `OfficeHours`) will not exist. Every public page that reads from them will throw a server error or render completely blank.

```bash
pnpm seed
```

What the seed does:

1. **Singleton rows** — upserts default content for all singleton tables so the public site renders immediately, even before anything is edited in the admin console.
2. **Super-admin account** — signs up the user at `SUPER_ADMIN_EMAIL` via Better Auth (so the password is correctly hashed and the auth `Account` row is created), then promotes the user to the `super-admin` role.

The seed is **idempotent** — running it multiple times is safe. It will only promote the role if it has been downgraded, and never overwrites singleton rows that have already been edited.

#### After seeding: create the executive committee

The About page has a special layout that features the **Executive Committee** prominently at the top. This is driven by a hard-coded slug check:

```ts
committees.find((c) => c.slug === "executive")
```

After seeding, go to **Admin → About page → Committees** and create a committee with `slug` set to exactly `executive`. Any committee without that slug will appear in the regular grid below.

### 7. Run locally

```bash
pnpm dev
```

The dev server runs on <http://localhost:3000>.

## Admin console

The admin console lives at **`/admin`**.

### Signing in

1. Visit <http://localhost:3000/admin>.
2. Unauthenticated requests are redirected to `/login`.
3. Sign in with your `SUPER_ADMIN_EMAIL` / `SUPER_ADMIN_PASSWORD`.

### Roles

| Role | What it can do |
| --- | --- |
| `super-admin` | Everything `admin` can do, plus manage other admin users from the **Members** screen. Bootstrapped from `.env` via the seed. |
| `admin` | Full CRUD on all site content and contact submissions. Created by a super-admin from the **Members** screen. |
| `user` | No admin access. Reserved for future public accounts. |

### Adding a new admin

1. Sign in as a super-admin.
2. Open **Access → Members** in the sidebar.
3. Create a new user with an email, password, and the `admin` role.

The new admin can then sign in at `/login` with those credentials.

## Image uploads

Image-bearing forms (sponsors, board members, events) display the recommended resolution and aspect ratio. Specs live in `src/lib/image-requirements.ts`.

Uploads use presigned PUT URLs issued by `presignImageUploadFn` (`src/lib/server-fns/uploads.ts`), so the browser uploads directly to the storage provider without proxying through the Node server. The DB stores the resulting public URL.

### Using MinIO locally (default)

The `.env.example` ships with MinIO values pre-filled. After `docker compose up -d`, the bucket is created automatically by the `minio-init` container and files are served at `http://localhost:9000/nusu`.

No extra bucket configuration is needed for local development.

### Using Cloudflare R2

Set the following in `.env`:

```env
AWS_REGION=auto
AWS_ACCESS_KEY_ID=<r2-access-key-id>
AWS_SECRET_ACCESS_KEY=<r2-secret-access-key>
AWS_S3_BUCKET=<your-bucket-name>
AWS_S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
AWS_S3_PUBLIC_URL=https://<your-r2-public-domain>
```

### Using AWS S3

Omit `AWS_S3_ENDPOINT` entirely. Set a real region (e.g. `eu-central-1`) and standard IAM credentials. The bucket must allow:

- CORS `PUT` from the app's origin.
- Public read access (or a CloudFront distribution via `AWS_S3_PUBLIC_URL`).

## Scripts

```bash
pnpm dev        # Start dev server (port 3000)
pnpm generate   # Prisma client generation
pnpm migrate    # Prisma migrate dev
pnpm push       # Prisma database push (no migration history)
pnpm seed       # Seed super admin + singleton content
pnpm build      # Production build
pnpm preview    # Preview production build
pnpm lint       # ESLint
pnpm format     # Prettier
pnpm typecheck  # TypeScript type check
pnpm test       # Vitest
```

## Project structure

```text
src/
  routes/               File-based routes (Home, About, Events, Contact, Admin)
  routes/admin.tsx      Admin layout — Better Auth–guarded sidebar shell
  components/           Page sections and shared UI components
  components/ui/        shadcn-style primitives (sidebar, dialog, calendar, etc.)
  components/admin/     Admin-only components (AdminShell, RichTextEditor, ImageUploader)
  lib/auth.ts           Better Auth server instance (with admin plugin)
  lib/auth-client.ts    Better Auth React client
  lib/auth-shared.ts    Access-control statements shared by client + server
  lib/server-auth.ts    requireAdmin / requireSuperAdmin server-side guards
  lib/validators.ts     Zod schemas for every entity
  lib/s3.ts             S3 client + presigned URL helper (supports custom endpoint)
  lib/image-requirements.ts  Per-context image specs surfaced to editors
  lib/server-fns/       createServerFn handlers (uploads, session, public reads, admin CRUD)
prisma/
  schema.prisma         Database schema
  seed.ts               Seed script (super admin + singletons)
public/                 Static assets (logo, hero images)
```

## Adding UI components

This project follows shadcn-style component patterns. To add a new component:

```bash
npx shadcn@latest add button
```

Then import it where needed:

```tsx
import { Button } from "@/components/ui/button"
```
