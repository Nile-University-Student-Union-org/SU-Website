import { createAccessControl } from "better-auth/plugins/access"
import {
  adminAc as defaultAdminAc,
  defaultStatements,
  userAc as defaultUserAc,
} from "better-auth/plugins/admin/access"

export const statement = {
  ...defaultStatements,
  content: ["read", "create", "update", "delete"],
  submission: ["read", "delete"],
} as const

export const ac = createAccessControl(statement)

export const adminRole = ac.newRole({
  ...defaultAdminAc.statements,
  content: ["read", "create", "update", "delete"],
  submission: ["read", "delete"],
})

export const superAdminRole = ac.newRole({
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "impersonate-admins",
    "delete",
    "set-password",
    "get",
    "update",
  ],
  session: ["list", "revoke", "delete"],
  content: ["read", "create", "update", "delete"],
  submission: ["read", "delete"],
})

export const userRole = ac.newRole({
  ...defaultUserAc.statements,
})

export type AdminRole = "super-admin" | "admin" | "user"
