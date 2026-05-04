import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouter,
  useRouterState,
} from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Logout01Icon,
  Settings01Icon,
  UserGroupIcon,
  Calendar01Icon,
  Mail01Icon,
  Image01Icon,
  Home01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons"
import { authClient } from "@/lib/auth-client"
import { getAdminSessionFn } from "@/lib/server-fns/session"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    const session = await getAdminSessionFn()
    if (!session) {
      throw redirect({
        to: "/login",
        search: { redirect: location.pathname },
      })
    }
    if (!["admin", "super-admin"].includes(session.user.role)) {
      throw redirect({ to: "/login", search: { redirect: "/admin" } })
    }
    return { session }
  },
  component: AdminLayout,
})

type NavItem = {
  to: string
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  superAdminOnly?: boolean
  exact?: boolean
}

type NavGroup = { label: string; items: Array<NavItem> }

const NAV: Array<NavGroup> = [
  {
    label: "General",
    items: [{ to: "/admin", label: "Overview", icon: Home01Icon, exact: true }],
  },
  {
    label: "Home page",
    items: [
      { to: "/admin/sponsors", label: "Sponsors", icon: Image01Icon },
      { to: "/admin/who-we-are", label: "Who We Are", icon: InformationCircleIcon },
    ],
  },
  {
    label: "About page",
    items: [
      { to: "/admin/about-hero", label: "About hero", icon: InformationCircleIcon },
      { to: "/admin/committees", label: "Committees", icon: UserGroupIcon },
      { to: "/admin/board", label: "Board members", icon: UserGroupIcon },
      { to: "/admin/about-cta", label: "About CTA", icon: ArrowRight01Icon },
    ],
  },
  {
    label: "Events page",
    items: [
      { to: "/admin/events", label: "Events", icon: Calendar01Icon },
      { to: "/admin/event-statuses", label: "Event categories", icon: Calendar01Icon },
    ],
  },
  {
    label: "Site-wide",
    items: [
      { to: "/admin/contact-info", label: "Contact info", icon: Mail01Icon },
      { to: "/admin/office-hours", label: "Office hours", icon: Settings01Icon },
      { to: "/admin/footer", label: "Footer", icon: Settings01Icon },
      { to: "/admin/social-links", label: "Social links", icon: Settings01Icon },
    ],
  },
  {
    label: "Inbox",
    items: [{ to: "/admin/submissions", label: "Contact submissions", icon: Mail01Icon }],
  },
  {
    label: "Access",
    items: [
      { to: "/admin/users", label: "Members", icon: UserGroupIcon, superAdminOnly: true },
    ],
  },
]

function AdminLayout() {
  const ctx = Route.useRouteContext() as {
    session?: { user: { name: string; email: string; role: string } }
  }
  const router = useRouter()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  // Login page is rendered at /admin/login, but its file route is a sibling so
  // it never actually renders inside this layout. The route guard above lets
  // it render without a session, but we still bail out if we got here without
  // one for any reason.
  if (!ctx.session) return <Outlet />
  const { session } = ctx
  const isSuperAdmin = session.user.role === "super-admin"

  function isActive(item: NavItem) {
    if (item.exact) return pathname === item.to
    return pathname === item.to || pathname.startsWith(`${item.to}/`)
  }

  async function signOut() {
    await authClient.signOut()
    router.navigate({ to: "/login", search: { redirect: undefined } })
  }

  const groups = NAV.map((g) => ({
    ...g,
    items: g.items.filter((i) => !i.superAdminOnly || isSuperAdmin),
  })).filter((g) => g.items.length > 0)

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                tooltip="NUSU admin"
                render={<Link to="/admin" />}
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-foreground text-background">
                  <img src="/logo.svg" alt="" className="size-4 invert" />
                </div>
                <div className="flex flex-col leading-none gap-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em]">
                    NUSU
                  </span>
                  <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Admin Console
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {groups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton
                        tooltip={item.label}
                        isActive={isActive(item)}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        render={<Link to={item.to as any} />}
                      >
                        <HugeiconsIcon
                          icon={item.icon}
                          size={14}
                          strokeWidth={1.75}
                        />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip={session.user.email}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted text-foreground text-xs font-semibold">
                  {session.user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col leading-tight min-w-0 gap-0.5">
                  <span className="text-sm font-semibold truncate">
                    {session.user.name}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {session.user.role}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Sign out"
                onClick={signOut}
              >
                <HugeiconsIcon icon={Logout01Icon} size={14} strokeWidth={1.75} />
                <span>Sign out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex items-center gap-3 px-4 sm:px-6 h-14 border-b border-border bg-background">
          <SidebarTrigger />
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Admin
          </span>
        </header>
        <div className="min-w-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
