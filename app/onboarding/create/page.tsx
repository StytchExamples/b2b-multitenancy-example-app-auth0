import Link from "next/link"

import { CreateOrganizationForm } from "./create-organization-form"

export default async function Create() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f8ff]">
      {/* Main container */}
      <div className="w-full max-w-[600px] rounded-lg bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-blue-600">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your organization name to create an account.
          </p>
        </div>

        {/* Form */}
        <CreateOrganizationForm />

        {/* Terms and Privacy */}
        <p className="mt-6 text-center text-sm text-gray-600">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="text-blue-600 underline underline-offset-4 hover:text-blue-700"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-blue-600 underline underline-offset-4 hover:text-blue-700"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
