import { User } from "../models/Auth";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  message: string
  data: User
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponseDTO {
  message: string
  data: User
}

export interface RequestOtpDTO {
  email: string;
}

export interface RequestOtpResponseDTO {
  message: string
}

export interface VerifyOtpDTO {
  email: string;
  otp: string;
}

export interface VerifyOtpResponseDTO {
  message: string
  token: string
}

export interface ResetPasswordDTO {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponseDTO {
  message: string;
}
