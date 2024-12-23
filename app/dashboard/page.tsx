import Link from "next/link"
import { Label } from "@radix-ui/react-label"

import { appClient, managementClient } from "@/lib/auth0"
import { Button } from "@/components/ui/button" // Assuming Button is a UI component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardHome() {
  const session = await appClient.getSession()

  const { data: org } = await managementClient.organizations.get({
    id: session!.user.org_id,
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f8ff]">
      {/* Main container with flex for centering */}
      <div className="flex w-full max-w-[800px] flex-col items-center gap-8 p-8">
        {/* Card container with centered content */}
        <Card className="w-full rounded-lg border-none bg-[#e0f7fa] shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-600">
              Organization Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            {/* Display Name and Organization Name */}
            <div className="flex flex-col items-start gap-2">
              <Label className="text-gray-600">Display Name</Label>
              <p className="text-lg font-semibold text-gray-800">
                {org.display_name || "N/A"}
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label className="text-gray-600">Organization Name</Label>
              <p className="text-lg font-semibold text-gray-800">
                {org.name || "N/A"}
              </p>
            </div>

            {/* User Name and Email */}
            <div className="flex flex-col items-start gap-2">
              <Label className="text-gray-600">User Name</Label>
              <p className="text-lg font-semibold text-gray-800">
                {session?.user.name || "N/A"}
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label className="text-gray-600">Email</Label>
              <p className="text-lg font-semibold text-gray-800">
                {session?.user.email || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Link href="/dashboard/organization/sso" passHref>
          <Button>Configure SSO</Button>
        </Link>
      </div>
    </div>
  )
}

function ConfigureSSOButton() {
  const handleClick = (e) => {
    e.preventDefault()
    console.log("Clicked")
    window.location.href = "/organization/sso"
  }

  return (
    <Button
      className="mt-6 w-full max-w-[300px] bg-blue-600 text-white hover:bg-blue-700"
      onClick={handleClick}
    >
      Configure SSO
    </Button>
  )
}
