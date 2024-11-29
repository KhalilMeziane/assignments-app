import { useMutation } from "@tanstack/react-query";

import { LoginDTO, RegisterDTO, RequestOtpDTO, VerifyOtpDTO, ResetPasswordDTO } from "../domain/dtos/AuthDTO";
import { AuthHttpRepository } from "../infrastructure/http/AuthHttpRepository";

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['auth-login'],
    mutationFn: (body: LoginDTO) => {
      return new AuthHttpRepository().login(body);
    },
  });
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['auth-register'],
    mutationFn: (body: RegisterDTO) => {
      return new AuthHttpRepository().register(body);
    },
  });
}

export const useRequestOtpMutation = () => {
  return useMutation({
    mutationKey: ['auth-request-otp'],
    mutationFn: (body: RequestOtpDTO) => {
      return new AuthHttpRepository().requestOtp(body);
    },
  });
}

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationKey: ['auth-verify-otp'],
    mutationFn: (body: VerifyOtpDTO) => {
      return new AuthHttpRepository().verifyOtp(body);
    },
  });
}

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationKey: ['auth-reset-password'],
    mutationFn: (body: ResetPasswordDTO) => {
      return new AuthHttpRepository().resetPassword(body);
    },
  });
}