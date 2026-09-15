import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { sponsorSchema } from "@shared/validators"
import { prisma } from "@server/auth"
import { requireAdmin } from "@server/server-auth"

export const listSponsorsAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin()
  return prisma.sponsor.findMany({ orderBy: { order: "asc" } })
})

export const createSponsorFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => sponsorSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.sponsor.create({ data })
  })

export const updateSponsorFn = createServerFn({ method: "POST" })
  .validator((raw: unknown) =>
    z.object({ id: z.string().min(1), data: sponsorSchema }).parse(raw),
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.sponsor.update({ where: { id: data.id }, data: data.data })
  })

export const deleteSponsorFn = createServerFn({ method: "POST" })
  .validator((raw: unknown) => z.object({ id: z.string().min(1) }).parse(raw))
  .handler(async ({ data }) => {
    await requireAdmin()
    await prisma.sponsor.delete({ where: { id: data.id } })
    return { success: true }
  })
