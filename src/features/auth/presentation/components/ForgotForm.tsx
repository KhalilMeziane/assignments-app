import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import useStep from "@/hooks/useStep"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputField, OTPField } from "@/components/fields"

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
  const form = useForm<ForgotValuesEmailStep>({
    resolver: zodResolver(ForgotSchemaEmailStep),
    defaultValues: {
      email: "",
    },
  })

  const handelSubmit = (values: ForgotValuesEmailStep) => {
    console.log(values)
    goToNextStep()
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
        <Button type="submit" className="w-full">
          Send
        </Button>
      </form>
    </Form>
  )
}

const OTPStep = ({ goToNextStep }: { goToNextStep: () => void }) => {
  const form = useForm<ForgotValuesOtpStep>({
    resolver: zodResolver(ForgotSchemaOtpStep),
    defaultValues: {
      otp: "",
    },
  })

  const handelSubmit = (values: ForgotValuesOtpStep) => {
    console.log(values)
    goToNextStep()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-4">
        <OTPField label="OTP" name="otp" form={form} />
        <Button type="submit" className="w-full">
          Send
        </Button>
      </form>
    </Form>
  )
}

const ResetPasswordStep = () => {
  const form = useForm<ForgotValuesPasswordsStep>({
    resolver: zodResolver(ForgotSchemaPasswordsStep),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  const handelSubmit = (values: ForgotValuesPasswordsStep) => {
    console.log(values)
  }
  return (
    <Form {...form}>
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
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
