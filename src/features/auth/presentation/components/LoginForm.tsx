import { setAuth } from "@/features/auth/application/authSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import ErrorAlert from "@/components/ErrorAlert"
import { InputField } from "@/components/fields"

import { useLogin } from "../hooks"
import { LoginSchema, LoginValues } from "../validators"

export default function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mutateAsync, isPending, isError, error } = useLogin()
  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handelSubmit = async (values: LoginValues) => {
    const response = await mutateAsync(values)
    dispatch(setAuth(response?.user))
    Cookies.set("accessToken", response?.accessToken || "")
    navigate("/home")
  }

  return (
    <Form {...form}>
      {isError ? <ErrorAlert error={error} /> : null}
      <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-4">
        <InputField
          label="Email"
          name="email"
          type="email"
          form={form}
          placeholder="john@doe.com"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          form={form}
          placeholder="********"
        />
        <Link className="text-blue-600 text-sm" to="/forgot-password">
          Forgot password?
        </Link>
        <Button type="submit" className="w-full" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
