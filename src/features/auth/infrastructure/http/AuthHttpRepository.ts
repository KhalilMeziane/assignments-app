import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { HttpClient } from "@/lib/httpClient";
import { LoginDTO, LoginResponseDTO, RequestOtpResponseDTO, RequestOtpDTO, VerifyOtpResponseDTO, VerifyOtpDTO, RegisterDTO, RegisterResponseDTO, ResetPasswordDTO, ResetPasswordResponseDTO } from "../../domain/dtos/AuthDTO";

export class AuthHttpRepository implements AuthRepository {
  async login(loginDTO: LoginDTO): Promise<LoginResponseDTO | null> {
    try {
      const response = await HttpClient().post('/auth/login', loginDTO)
      const data = response.data as LoginResponseDTO
      return data
    } catch (error) {
      throw error
    }
  }
  async register(registerDTO: RegisterDTO): Promise<RegisterResponseDTO | null> {
    try {
      const response = await HttpClient().post('/auth/register', registerDTO)
      const data = response.data as RegisterResponseDTO
      return data
    } catch (error) {
      throw error
    }
  }
  async requestOtp(requestOtpDTO: RequestOtpDTO): Promise<RequestOtpResponseDTO | null> {
    try {
      const response = await HttpClient().post('/auth/requestOtp', requestOtpDTO)
      const data = response.data as RequestOtpResponseDTO
      return data
    } catch (error) {
      throw error
    }
  }
  async verifyOtp(verifyOtpDTO: VerifyOtpDTO): Promise<VerifyOtpResponseDTO | null> {
    try {
      const response = await HttpClient().post('/auth/verifyOtp', verifyOtpDTO)
      const data = response.data as VerifyOtpResponseDTO
      return data
    } catch (error) {
      throw error
    }
  }
  async resetPassword(resetPasswordDTO: ResetPasswordDTO): Promise<ResetPasswordResponseDTO | null> {
    try {
      const response = await HttpClient().post('/auth/verifyOtp', resetPasswordDTO)
      const data = response.data as ResetPasswordResponseDTO
      return data
    } catch (error) {
      throw error
    }
  }
}