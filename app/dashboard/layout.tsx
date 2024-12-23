import Link from "next/link"
import { redirect } from "next/navigation"
import { UserProvider } from "@auth0/nextjs-auth0/client"

import { appClient, managementClient } from "@/lib/auth0"
import { OrganizationSwitcher } from "@/components/organization-switcher"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await appClient.getSession()

  // if the user is not authenticated, redirect to login
  if (!session?.user) {
    redirect("/api/auth/login")
  }

  const { data: orgs } = await managementClient.users.getUserOrganizations({
    id: session.user.sub,
  })

  // if the user does not belong to any organizations, redirect to onboarding
  if (!orgs.length) {
    redirect("/onboarding/create")
  }

  return (
    <UserProvider>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-2 py-4 sm:px-8">
        <div className="flex items-center space-x-6">
          <OrganizationSwitcher
            organizations={orgs.map((o) => ({
              id: o.id,
              slug: o.name,
              displayName: o.display_name!,
              logoUrl: o.branding?.logo_url,
            }))}
            currentOrgId={session.user.org_id}
          />

          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
        </div>{" "}
      </nav>

      <main className="mx-auto grid min-h-[calc(100svh-164px)] max-w-7xl px-2 sm:px-8 lg:py-6">
        {children}
      </main>
    </UserProvider>
  )
}
