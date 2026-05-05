import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { sponsorSchema } from "@/lib/validators"
import { prisma } from "@/lib/auth"
import { requireAdmin } from "@/lib/server-auth"

export const listSponsorsAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin()
  return prisma.sponsor.findMany({ orderBy: { order: "asc" } })
})

export const createSponsorFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => sponsorSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.sponsor.create({ data })
  })

export const updateSponsorFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) =>
    z.object({ id: z.string().min(1), data: sponsorSchema }).parse(raw),
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.sponsor.update({ where: { id: data.id }, data: data.data })
  })

export const deleteSponsorFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => z.object({ id: z.string().min(1) }).parse(raw))
  .handler(async ({ data }) => {
    await requireAdmin()
    await prisma.sponsor.delete({ where: { id: data.id } })
    return { success: true }
  })
