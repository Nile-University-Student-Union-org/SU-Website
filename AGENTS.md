# AGENTS.md — Nile University Student Union (NUSU) Codebase Guide

This document serves as the operational guide and behavioral protocol for AI pair programming agents working on this repository.

---

## 1. Project Overview & Tech Stack

- **Application**: Nile University Student Union (NUSU) official public website and administrative management portal.
- **Framework**: TanStack Start (React 19, Nitro server engine, TanStack Router, Vite).
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`), custom design tokens in `src/styles.css`, Lucide React, and HugeIcons.
- **Database & Storage**:
  - PostgreSQL 17 Alpine via Docker (`nusu-postgres` on port 5432)
  - MinIO S3 Object Storage via Docker (`nusu-minio` on S3 API port 9000 / Console 9001)
  - Prisma ORM (`prisma/schema.prisma` with `@prisma/adapter-pg`)
- **Authentication**: Better Auth (`src/server/auth.ts`, `src/client/auth-client.ts`).
- **Package Manager**: `pnpm`.

---

## 2. Session Lifecycle Automation (MANDATORY RULES)

### Command: `terminate`
Whenever the user says **"terminate"** (or requests to end/wrap up the session):
1. **Stop All Docker Containers**:
   Execute `docker compose stop` (or `docker compose down` if requested) via `run_command`.
2. **Generate `handoff.md`**:
   Write or update `handoff.md` at the project root (`d:\SU\SU-Website\handoff.md`) containing:
   - Summary of work completed in the session
   - Current system status (Docker containers, dev server, builds)
   - Modified files and key architectural/design decisions
   - Immediate next steps and pending tasks for the next session
3. **Sign-off**:
   Provide a concise confirmation message that Docker containers have been stopped and `handoff.md` is ready for the next session.

### Command: `start`
Whenever the user says **"start"** (or begins a new session):
1. **Read Handoff**:
   Inspect `handoff.md` at the project root to load the context of the previous session.
2. **Start Docker Containers**:
   Execute `docker compose up -d` via `run_command` to ensure PostgreSQL and MinIO are running and healthy.
3. **Provide Quick Recap**:
   Deliver a very quick, bulleted recap:
   - Summary of what was accomplished in the last session
   - Status of Docker services and dev server
   - Suggested next priorities

---

## 3. Brand & Design System Guidelines

- **NUSU Signature Palette**:
  - **Deep Nile Navy**: `#0F3056` (Dominant brand color, dark mode surface accents, headings)
  - **Midnight Navy**: `#081B31` / `#071524` / `#040C16` (Deep backgrounds, footer base, dark shell)
  - **Light Navy**: `#18477D` (Subtle depth, active borders)
  - **Nile Royal Blue**: `#018BCE` (Primary interactive color, eyebrows, rings, buttons)
  - **Nile Sky Blue**: `#2DB1FA` (Luminous dark mode highlights, active accents, glow states)
  - **Excellence Gold**: `#E5A823` (Awards, badges, highlight accents)
- **Dark Mode & Contrast Invariants**:
  - In dark mode, the footer background MUST be midnight navy (`bg-nusu-navy dark:bg-[#040C16]`) — never bright blue.
  - The navbar emblem and "Student Union" subtitle MUST render in crisp white (`brightness-0 invert` for logo, `text-white` for text) when positioned over dark backgrounds or in dark mode.
  - All interactive buttons, links, and clickable items MUST have `cursor: pointer;` (`cursor-pointer`).

---

## 4. Key Developer Commands

- **Development Server**: `pnpm dev` (runs on `http://localhost:3001/`)
- **Type Checking**: `pnpm typecheck` (`tsc --noEmit`)
- **Production Build**: `pnpm build`
- **Database Schema Sync**: `pnpm push` / `pnpm migrate`
- **Database Client Generation**: `pnpm generate`
- **Database Seed**: `pnpm seed`
- **Docker Services**:
  - Start containers: `docker compose up -d`
  - Stop containers: `docker compose stop`
  - Tear down containers: `docker compose down`
