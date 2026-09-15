import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { ac, adminRole, superAdminRole, userRole } from "@shared/auth-shared"

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
