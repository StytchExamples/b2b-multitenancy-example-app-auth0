import { onboardingClient } from "@/lib/auth0"

export const GET = onboardingClient.handleAuth({
  signup: onboardingClient.handleLogin((request) => {
    const searchParams = request.nextUrl.searchParams
    const loginHint = searchParams.get("login_hint")

    return {
      authorizationParams: {
        screen_hint: "signup",
        login_hint: loginHint,
      },
      returnTo: "/onboarding/verify",
    }
  }),
})
