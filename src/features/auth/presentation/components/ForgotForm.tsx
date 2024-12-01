import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import useStep from "@/hooks/useStep"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import ErrorAlert from "@/components/ErrorAlert"
import { InputField, OTPField } from "@/components/fields"

import { useRequestOtp, useResetPassword, useVerifyOtp } from "../hooks"
import {
  ForgotSchemaEmailStep,
  ForgotSchemaOtpStep,
  ForgotSchemaPasswordsStep,
  ForgotValuesEmailStep,
  ForgotValuesOtpStep,
  ForgotValuesPasswordsStep,
} from "../validators"

export default function ForgotForm() {
  const [currentStep, helpers] = useStep(3)
  const { goToNextStep } = helpers
  return (
    <>
      {currentStep === 1 ? <EmailStep goToNextStep={goToNextStep} /> : null}
      {currentStep === 2 ? <OTPStep goToNextStep={goToNextStep} /> : null}
      {currentStep === 3 ? <ResetPasswordStep /> : null}
    </>
  )
}

const EmailStep = ({ goToNextStep }: { goToNextStep: () => void }) => {
  const { mutateAsync, isPending, isError, error } = useRequestOtp()
  const form = useForm<ForgotValuesEmailStep>({
    resolver: zodResolver(ForgotSchemaEmailStep),
    defaultValues: {
      email: "",
    },
  })

  const handelSubmit = async (values: ForgotValuesEmailStep) => {
    await mutateAsync(values)
    sessionStorage.setItem("email", values.email)
    goToNextStep()
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
        <Button type="submit" className="w-full" disabled={isPending}>
          Send
        </Button>
      </form>
    </Form>
  )
}

const OTPStep = ({ goToNextStep }: { goToNextStep: () => void }) => {
  const { mutateAsync, isPending, isError, error } = useVerifyOtp()
  const form = useForm<ForgotValuesOtpStep>({
    resolver: zodResolver(ForgotSchemaOtpStep),
    defaultValues: {
      otp: "",
    },
  })

  const handelSubmit = async (values: ForgotValuesOtpStep) => {
    await mutateAsync({
      otp: values.otp,
      email: sessionStorage.getItem("email") || "",
    })
    goToNextStep()
  }
  return (
    <Form {...form}>
      {isError ? <ErrorAlert error={error} /> : null}
      <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-4">
        <OTPField label="OTP" name="otp" form={form} />
        <Button type="submit" className="w-full" disabled={isPending}>
          Send
        </Button>
      </form>
    </Form>
  )
}

const ResetPasswordStep = () => {
  const navigate = useNavigate()
  const { mutateAsync, isPending, isError, error } = useResetPassword()

  const form = useForm<ForgotValuesPasswordsStep>({
    resolver: zodResolver(ForgotSchemaPasswordsStep),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  const handelSubmit = async (values: ForgotValuesPasswordsStep) => {
    await mutateAsync({
      newPassword: values.newPassword,
      resetKey: "my-key",
      email: sessionStorage.getItem("email") || "",
    })
    sessionStorage.removeItem("email")
    navigate("/")
  }

  return (
    <Form {...form}>
      {isError ? <ErrorAlert error={error} /> : null}
      <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-4">
        <InputField
          label="New Password"
          name="newPassword"
          type="password"
          form={form}
          placeholder="********"
        />
        <InputField
          label="Confirm New Password"
          name="confirmNewPassword"
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
