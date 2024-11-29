import { useLoginMutation, useRequestOtpMutation, useVerifyOtpMutation, useRegisterMutation, useResetPasswordMutation } from "@/features/auth/application/authMutations"

export const useLogin = () => {
  return useLoginMutation()
}

export const useRegister = () => {
  return useRegisterMutation()
}

export const useRequestOtp = () => {
  return useRequestOtpMutation()
}

export const useVerifyOtp = () => {
  return useVerifyOtpMutation()
}

export const useResetPassword = () => {
  return useResetPasswordMutation()
}