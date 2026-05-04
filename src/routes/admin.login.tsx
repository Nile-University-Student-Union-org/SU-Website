import { createFileRoute, redirect } from "@tanstack/react-router"
import { z } from "zod"

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(undefined),
})

// Redirect shim: /admin/login → /login (login page lives outside the admin layout)
export const Route = createFileRoute("/admin/login")({
  validateSearch: loginSearchSchema,
  beforeLoad: ({ search }) => {
    throw redirect({ to: "/login", search: { redirect: search.redirect } })
  },
  component: () => null,
})
