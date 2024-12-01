import { LoginDTO, LoginResponseDTO, RegisterDTO, RegisterResponseDTO, RequestOtpDTO, RequestOtpResponseDTO, VerifyOtpDTO, VerifyOtpResponseDTO, ResetPasswordDTO, ResetPasswordResponseDTO, LogoutResponseDTO } from "../dtos/AuthDTO";

export interface AuthRepository {
  login(loginDTO: LoginDTO): Promise<LoginResponseDTO | null>;
  register(registerDTO: RegisterDTO): Promise<RegisterResponseDTO | null>;
  requestOtp(requestOtpDTO: RequestOtpDTO): Promise<RequestOtpResponseDTO | null>;
  verifyOtp(verifyOtpDTO: VerifyOtpDTO): Promise<VerifyOtpResponseDTO | null>;
  resetPassword(resetPasswordDTO: ResetPasswordDTO): Promise<ResetPasswordResponseDTO | null>;
  logout(): Promise<LogoutResponseDTO | null>;
}
