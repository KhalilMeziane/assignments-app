import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import ErrorAlert from "@/components/ErrorAlert"
import { InputField } from "@/components/fields"

import { useLogin } from "../hooks"
import { LoginSchema, LoginValues } from "../validators"

export default function LoginForm() {
  const { mutateAsync, isPending, isError, error } = useLogin()
  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handelSubmit = async (values: LoginValues) => {
    await mutateAsync(values)
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
