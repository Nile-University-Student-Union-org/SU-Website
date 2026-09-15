import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { boardMemberSchema } from "@shared/validators"
import { prisma } from "@server/auth"
import { requireAdmin } from "@server/server-auth"

export const listBoardMembersAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin()
  return prisma.boardMember.findMany({
    orderBy: [{ committeeId: "asc" }, { order: "asc" }],
    include: { committee: { select: { id: true, name: true, slug: true, color: true } } },
  })
})

export const createBoardMemberFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => boardMemberSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.boardMember.create({ data })
  })

export const updateBoardMemberFn = createServerFn({ method: "POST" })
  .validator((raw: unknown) =>
    z.object({ id: z.string().min(1), data: boardMemberSchema }).parse(raw),
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.boardMember.update({ where: { id: data.id }, data: data.data })
  })

export const deleteBoardMemberFn = createServerFn({ method: "POST" })
  .validator((raw: unknown) => z.object({ id: z.string().min(1) }).parse(raw))
  .handler(async ({ data }) => {
    await requireAdmin()
    await prisma.boardMember.delete({ where: { id: data.id } })
    return { success: true }
  })
