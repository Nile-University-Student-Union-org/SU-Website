import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { committeeSchema } from "@/lib/validators"
import { prisma } from "@/lib/auth"
import { requireAdmin } from "@/lib/server-auth"

export const listCommitteesAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin()
  return prisma.committee.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { members: true } } },
  })
})

export const createCommitteeFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => committeeSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.committee.create({ data })
  })

export const updateCommitteeFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) =>
    z.object({ id: z.string().min(1), data: committeeSchema }).parse(raw),
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.committee.update({ where: { id: data.id }, data: data.data })
  })

export const deleteCommitteeFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => z.object({ id: z.string().min(1) }).parse(raw))
  .handler(async ({ data }) => {
    await requireAdmin()
    await prisma.committee.delete({ where: { id: data.id } })
    return { success: true }
  })
