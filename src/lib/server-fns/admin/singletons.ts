import { createServerFn } from "@tanstack/react-start"
import {
  whoWeAreSchema,
  aboutHeroSchema,
  aboutCTASchema,
  footerSchema,
  contactInfoSchema,
  officeHoursSchema,
} from "@/lib/validators"
import { prisma } from "@/lib/auth"
import { requireAdmin } from "@/lib/server-auth"

export const updateWhoWeAreFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => whoWeAreSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.whoWeAre.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    })
  })

export const updateAboutHeroFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => aboutHeroSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.aboutHero.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    })
  })

export const updateAboutCTAFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => aboutCTASchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.aboutCTA.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    })
  })

export const updateFooterFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => footerSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.footer.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    })
  })

export const updateContactInfoFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactInfoSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.contactInfo.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    })
  })

export const updateOfficeHoursFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => officeHoursSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.officeHours.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    })
  })
