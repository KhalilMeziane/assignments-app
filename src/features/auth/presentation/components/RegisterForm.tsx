import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/fields"

import { SignupSchema, SignupValues } from "../validators"

export default function RegisterForm() {
  const form = useForm<SignupValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const handelSubmit = (values: SignupValues) => {
    console.log(values)
  }
  return (
    <Form {...form}>
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
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
