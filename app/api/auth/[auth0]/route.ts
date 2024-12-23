import { redirect } from "next/navigation"
import { NextRequest } from "next/server"
import { HandlerError } from "@auth0/nextjs-auth0"

import { appClient } from "@/lib/auth0"

export const GET = appClient.handleAuth({
  login: appClient.handleLogin((request) => {
    const searchParams = request.nextUrl.searchParams
    const organization = searchParams.get("organization")
    const invitation = searchParams.get("invitation")

    return {
      authorizationParams: {
        organization,
        invitation,
      },
      returnTo: "/dashboard",
    }
  }),
  signup: appClient.handleLogin({
    authorizationParams: {
      screen_hint: "signup",
    },
    returnTo: "/",
  }),
  onError(_req: NextRequest, error: HandlerError) {
    redirect(
      `/api/auth/error?error=${error.cause?.message || "An error occured while authenticating the user."}`
    )
  },
})
