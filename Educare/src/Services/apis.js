
const BASE_URL = import.meta.env.VITE_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: "/api/v1/User/sendotp",
  SIGNUP_API:  "/api/v1/User/signup",
  LOGIN_API:  "/api/v1/User/login",
  RESETPASSTOKEN_API:  "/api/v1/User/resetPassword-token",
  RESETPASSWORD_API: "/api/v1/User/resetPassword",
}

export const settingsEndpoints = {
  // GET_USER_DETAILS_API:"/api/v1/Profile/getAllUser",
  CHANGE_PASSWORD_API:"/api/v1/Profile/changePassword",
  UPDATE_PROFILE_API:"/api/v1/Profile/updateProfile",
  UPDATE_DISPLAY_PICTURE_API:"/api/v1/Profile/updateDisplayPicture",
  DELETE_ACCOUNT_API:"/api/v1/Profile/delete",
}

export const profileEndpoints = {
  GET_USER_DETAILS_API:"/api/v1/Profile/getAllUser",
  GET_USER_ENROLLED_COURSES_API:"/api/v1/Profile/enrolledCourses",
  //  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}