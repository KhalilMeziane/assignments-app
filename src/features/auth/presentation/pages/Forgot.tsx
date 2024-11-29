import { Link } from "react-router-dom"

import { BrandName } from "@/lib/constants"
import Head from "@/components/Head"

import { ForgotForm } from "../components"

export default function Forgot() {
  return (
    <>
      <Head>
        <title>Forgot | {BrandName}</title>
      </Head>
      <main className="px-2 md:px-3 lg:px-4 bg-gray-50">
        <section className="flex flex-col items-center justify-center h-screen">
          <div className="w-full md:w-4/6 lg:w-3/6 xl:w-2/6 border-2 border-gray-100 p-2 md:p-3 lg:p-5 rounded-lg bg-white">
            <h1 className="text-xl lg:text-2xl font-bold text-center mb-1">
              Forgot your password?
            </h1>
            <p className="text-sm text-gray-600 text-center mb-2 ">
              Enter your email address and we'll send you a otp to reset your
              password.
            </p>
            <ForgotForm />
            <div className="pt-2">
              <p className="text-sm text-center">
                Remembered your password?{" "}
                <Link className="text-blue-600 font-medium underline" to="/">
                  Back to Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}