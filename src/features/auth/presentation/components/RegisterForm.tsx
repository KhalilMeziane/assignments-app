import { setAuth } from "@/features/auth/application/authSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import ErrorAlert from "@/components/ErrorAlert"
import { InputField } from "@/components/fields"

import { useRegister } from "../hooks"
import { SignupSchema, SignupValues } from "../validators"

export default function RegisterForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mutateAsync, isPending, isError, error } = useRegister()
  const form = useForm<SignupValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const handelSubmit = async (values: SignupValues) => {
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
          label="Name"
          name="name"
          type="text"
          form={form}
          placeholder="john doe"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          form={form}
          placeholder="********"
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
