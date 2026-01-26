
const BASE_URL = import.meta.env.VITE_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: "/api/v1/User/sendotp",
  SIGNUP_API:  "/api/v1/User/signup",
  LOGIN_API:  "/api/v1/User/login",
  RESETPASSTOKEN_API:  "/api/v1/User/resetPassword-token",
  RESETPASSWORD_API: "/api/v1/User/resetPassword",
}
