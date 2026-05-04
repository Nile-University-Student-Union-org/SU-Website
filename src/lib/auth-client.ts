import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { ac, adminRole, superAdminRole, userRole } from "./auth-shared"

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        "super-admin": superAdminRole,
        admin: adminRole,
        user: userRole,
      },
    }),
  ],
})

export type AuthClient = typeof authClient
