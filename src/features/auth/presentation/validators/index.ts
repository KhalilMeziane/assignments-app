import { z } from "zod"

const emailSchema = z.string().email("Invalid email address")

export const LoginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
})

export type LoginValues = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long"),
}).and(LoginSchema)

export type SignupValues = z.infer<typeof SignupSchema>;

export const ForgotSchemaEmailStep = z.object({
  email: emailSchema,
})

export type ForgotValuesEmailStep = z.infer<typeof ForgotSchemaEmailStep>;

export const ForgotSchemaOtpStep = z.object({
  otp: z.string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numeric characters"),
})

export type ForgotValuesOtpStep = z.infer<typeof ForgotSchemaOtpStep>;

export const ForgotSchemaPasswordsStep = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must be at most 20 characters long"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ForgotValuesPasswordsStep = z.infer<typeof ForgotSchemaPasswordsStep>;

