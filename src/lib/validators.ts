import { z } from "zod"

const trimmed = (max: number, min = 1) =>
  z.string().trim().min(min).max(max)

const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined))

const url = z.string().trim().url()
const optionalUrl = z
  .string()
  .trim()
  .max(2048)
  .optional()
  .transform((v) => (v ? v : undefined))
  .pipe(z.string().url().optional())

// ─── Auth ───────────────────────────────────────────────────────────────────

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
})

export const createMemberSchema = z.object({
  name: trimmed(120),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(128),
  role: z.enum(["admin", "super-admin"]),
})

export const updateMemberRoleSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(["admin", "super-admin"]),
})

// ─── Image upload ───────────────────────────────────────────────────────────

export const presignUploadSchema = z.object({
  filename: trimmed(200),
  contentType: z.enum([
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/avif",
    "image/svg+xml",
  ]),
  size: z.number().int().positive().max(8 * 1024 * 1024),
  prefix: z.enum(["sponsors", "members", "events", "site"]),
})

// ─── Home / About content ───────────────────────────────────────────────────

export const whoWeAreSchema = z.object({
  eyebrow: trimmed(80),
  countWord: trimmed(20),
  titleSuffix: trimmed(160),
  description: trimmed(800),
  ctaLabel: trimmed(40),
  ctaLink: trimmed(200),
})

export const aboutHeroSchema = z.object({
  eyebrow: trimmed(120),
  title: trimmed(160),
  description: trimmed(800),
})

export const aboutCTASchema = z.object({
  enabled: z.boolean(),
  eyebrow: trimmed(120),
  title: trimmed(160),
  description: trimmed(800),
  buttonText: trimmed(40),
  buttonLink: trimmed(200),
})

export const footerSchema = z.object({
  description: trimmed(400),
  copyrightSuffix: trimmed(200),
})

export const contactInfoSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  phone: trimmed(40),
  address: trimmed(200),
  mapUrl: optionalUrl,
})

export const officeHoursSchema = z.object({
  dayRange: trimmed(80),
  hours: trimmed(80),
  note: optionalTrimmed(200),
})

// ─── Sponsors ───────────────────────────────────────────────────────────────

export const sponsorSchema = z.object({
  name: trimmed(120),
  label: optionalTrimmed(120).default(""),
  year: optionalTrimmed(20).default(""),
  imageUrl: url,
  websiteUrl: optionalUrl,
  description: optionalTrimmed(400),
  order: z.number().int().min(0).max(9999).default(0),
})

// ─── Social links ───────────────────────────────────────────────────────────

export const socialLinkSchema = z.object({
  label: trimmed(60),
  href: url,
  icon: trimmed(40),
  order: z.number().int().min(0).max(9999).default(0),
})

// ─── Stats ──────────────────────────────────────────────────────────────────

export const statSchema = z.object({
  value: trimmed(20),
  label: trimmed(80),
  order: z.number().int().min(0).max(9999).default(0),
})

// ─── Committees / Board members ─────────────────────────────────────────────

export const committeeSchema = z.object({
  slug: trimmed(60).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and dashes only."),
  name: trimmed(120),
  tagline: trimmed(160),
  description: trimmed(800),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a 6-digit hex like #018BCE."),
  order: z.number().int().min(0).max(9999).default(0),
})

export const boardMemberSchema = z.object({
  name: trimmed(120),
  role: trimmed(80),
  committeeId: z.string().min(1),
  major: trimmed(120),
  year: trimmed(40),
  image: url,
  bio: trimmed(800),
  cvDescription: z.string().max(20000).default(""),
  inSu: z.array(z.string().trim().min(1).max(280)).max(20).default([]),
  collaborations: z.array(z.string().trim().min(1).max(280)).max(20).default([]),
  achievements: z.array(z.string().trim().min(1).max(280)).max(20).default([]),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(120)
    .optional()
    .transform((v) => (v ? v : undefined))
    .pipe(z.string().email().optional()),
  linkedin: optionalUrl,
  order: z.number().int().min(0).max(9999).default(0),
})

// ─── Events ─────────────────────────────────────────────────────────────────

export const eventStatusSchema = z.object({
  slug: trimmed(60).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and dashes only."),
  name: trimmed(80),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a 6-digit hex like #018BCE."),
  order: z.number().int().min(0).max(9999).default(0),
})

export const eventSchema = z
  .object({
    name: trimmed(160),
    startAt: z.coerce.date(),
    endAt: z.coerce.date(),
    statusId: z.string().min(1),
    location: trimmed(200),
    description: trimmed(2000),
    tags: z.array(z.string().trim().min(1).max(40)).max(10).default([]),
    image: url,
  })
  .refine((v) => v.endAt.getTime() >= v.startAt.getTime(), {
    message: "endAt must be on or after startAt.",
    path: ["endAt"],
  })

// ─── Public contact form ────────────────────────────────────────────────────

export const contactSubmissionSchema = z.object({
  name: trimmed(120),
  phone: trimmed(40),
  email: z.string().trim().toLowerCase().email(),
  subject: trimmed(160),
  content: trimmed(4000),
})

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>
export type SponsorInput = z.infer<typeof sponsorSchema>
export type CommitteeInput = z.infer<typeof committeeSchema>
export type BoardMemberInput = z.infer<typeof boardMemberSchema>
export type EventInput = z.infer<typeof eventSchema>
