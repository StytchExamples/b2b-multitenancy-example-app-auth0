import Link from "next/link"
import { redirect } from "next/navigation"

import { appClient } from "@/lib/auth0"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/submit-button"

export async function SignUpForm() {
  const session = await appClient.getSession()

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-[black]">
          Sign Up
        </h1>
        <p className="text-sm text-muted-foreground">
          Input email below to get started
        </p>
      </div>
      <form
        action={async (formData: FormData) => {
          "use server"

          const email = formData.get("email")
          if (!email || typeof email !== "string") return

          const searchParams = new URLSearchParams({
            login_hint: email,
          })

          redirect(`/onboarding/signup?${searchParams.toString()}`)
        }}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-[black]" htmlFor="email">
              Email
            </Label>
            <Input
              className=" h-14 rounded-none border border-gray-300 bg-white p-0 px-2 text-black placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              type="email"
              name="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <SubmitButton className="h-14 rounded-none border border-blue-600 bg-blue-600 px-8 py-3 text-lg text-white hover:bg-blue-700">
            Get Started
          </SubmitButton>
        </div>
        {session ? (
          <div className="right-4 mt-4 md:right-8 md:top-8">
            <a href="/api/auth/logout">
              <SubmitButton className="rounded-none border border-blue-600 bg-blue-600 px-8 py-3 text-lg text-white hover:bg-blue-700">
                Logout
              </SubmitButton>
            </a>
          </div>
        ) : (
          <div className="mt-4 md:right-8 md:top-8">
            <span className="text-sm text-gray-600">Already joined? </span>
            <a
              href="/api/auth/login"
              className="text-sm text-blue-600 underline hover:text-blue-700"
            >
              Log in
            </a>
          </div>
        )}
      </form>
    </div>
  )
}
