import { appClient } from "@/lib/auth0"
import { SubmitButton } from "@/components/submit-button"

import { SignUpForm } from "./signup-form"
import { WelcomeBackCard } from "./welcome-back-card"

export default async function Home() {
  const session = await appClient.getSession()

  return (
    <div className="flex h-screen items-center justify-center bg-[#fff]">
      <div className="flex">
        {session ? <WelcomeBackCard /> : <SignUpForm />}
      </div>
    </div>
  )
}
