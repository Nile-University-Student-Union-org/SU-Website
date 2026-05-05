import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { statSchema } from "@/lib/validators"
import { prisma } from "@/lib/auth"
import { requireAdmin } from "@/lib/server-auth"

export const listStatsAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin()
  return prisma.stat.findMany({ orderBy: { order: "asc" } })
})

export const createStatFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => statSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.stat.create({ data })
  })

export const updateStatFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) =>
    z.object({ id: z.string().min(1), data: statSchema }).parse(raw),
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.stat.update({ where: { id: data.id }, data: data.data })
  })

export const deleteStatFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => z.object({ id: z.string().min(1) }).parse(raw))
  .handler(async ({ data }) => {
    await requireAdmin()
    await prisma.stat.delete({ where: { id: data.id } })
    return { success: true }
  })
