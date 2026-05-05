import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { socialLinkSchema } from "@/lib/validators"
import { prisma } from "@/lib/auth"
import { requireAdmin } from "@/lib/server-auth"

export const listSocialLinksAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin()
  return prisma.socialLink.findMany({ orderBy: { order: "asc" } })
})

export const createSocialLinkFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => socialLinkSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.socialLink.create({ data })
  })

export const updateSocialLinkFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) =>
    z.object({ id: z.string().min(1), data: socialLinkSchema }).parse(raw),
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.socialLink.update({ where: { id: data.id }, data: data.data })
  })

export const deleteSocialLinkFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => z.object({ id: z.string().min(1) }).parse(raw))
  .handler(async ({ data }) => {
    await requireAdmin()
    await prisma.socialLink.delete({ where: { id: data.id } })
    return { success: true }
  })
