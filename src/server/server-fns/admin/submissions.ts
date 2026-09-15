import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { prisma } from "@server/auth"
import { requireAdmin } from "@server/server-auth"

export const listSubmissionsFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin()
  return prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } })
})

export const markSubmissionReadFn = createServerFn({ method: "POST" })
  .validator((raw: unknown) =>
    z.object({ id: z.string().min(1), isRead: z.boolean() }).parse(raw),
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.contactSubmission.update({
      where: { id: data.id },
      data: { isRead: data.isRead },
    })
  })

export const deleteSubmissionFn = createServerFn({ method: "POST" })
  .validator((raw: unknown) => z.object({ id: z.string().min(1) }).parse(raw))
  .handler(async ({ data }) => {
    await requireAdmin()
    await prisma.contactSubmission.delete({ where: { id: data.id } })
    return { success: true }
  })
