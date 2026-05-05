import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { prisma } from "@/lib/auth"
import { requireSuperAdmin } from "@/lib/server-auth"

export const listAdminUsersFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireSuperAdmin()
  return prisma.user.findMany({
    where: { role: { in: ["admin", "super-admin"] } },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      banned: true,
      createdAt: true,
    },
  })
})

export const updateUserRoleFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) =>
    z
      .object({
        userId: z.string().min(1),
        role: z.enum(["admin", "super-admin"]),
      })
      .parse(raw),
  )
  .handler(async ({ data }) => {
    await requireSuperAdmin()
    return prisma.user.update({
      where: { id: data.userId },
      data: { role: data.role },
      select: { id: true, role: true },
    })
  })
