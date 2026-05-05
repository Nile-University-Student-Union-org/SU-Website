import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { eventSchema, eventStatusSchema } from "@/lib/validators"
import { prisma } from "@/lib/auth"
import { requireAdmin } from "@/lib/server-auth"

export const listEventsAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin()
  return prisma.event.findMany({
    orderBy: { startAt: "desc" },
    include: { status: true },
  })
})

export const createEventFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => eventSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.event.create({ data })
  })

export const updateEventFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) =>
    z.object({ id: z.string().min(1), data: eventSchema }).parse(raw),
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.event.update({ where: { id: data.id }, data: data.data })
  })

export const deleteEventFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => z.object({ id: z.string().min(1) }).parse(raw))
  .handler(async ({ data }) => {
    await requireAdmin()
    await prisma.event.delete({ where: { id: data.id } })
    return { success: true }
  })

// Event statuses

export const listEventStatusesAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin()
  return prisma.eventStatus.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { events: true } } },
  })
})

export const createEventStatusFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => eventStatusSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.eventStatus.create({ data })
  })

export const updateEventStatusFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) =>
    z.object({ id: z.string().min(1), data: eventStatusSchema }).parse(raw),
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return prisma.eventStatus.update({ where: { id: data.id }, data: data.data })
  })

export const deleteEventStatusFn = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => z.object({ id: z.string().min(1) }).parse(raw))
  .handler(async ({ data }) => {
    await requireAdmin()
    await prisma.eventStatus.delete({ where: { id: data.id } })
    return { success: true }
  })
