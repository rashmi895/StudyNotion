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

export const courseEndpoints = {
  CREATE_COURSE_API: "/api/v1/Course/createCourse",
  GET_ALL_COURSE_API: "/api/v1/Course/getAllCourses",
  GET_ALL_INSTRUCTOR_COURSES_API: "/api/v1/Course/getInstructorCourses",
  COURSE_CATEGORIES_API: "/api/v1/Course/getAllCategories",
  CREATE_SECTION_API: "/api/v1/Course/addSection",
  CREATE_SUBSECTION_API: "/api/v1/Course/addSubSection",
  UPDATE_SECTION_API: "/api/v1/Course/updateSection",
  UPDATE_SUBSECTION_API: "/api/v1/Course/updateSubSection",
  DELETE_SECTION_API: "/api/v1/Course/deleteSection",
  DELETE_SUBSECTION_API: "/api/v1/Course/deleteSubSection",
  EDIT_COURSE_API: "/api/v1/Course/editCourse",
  COURSE_DETAILS_API: "/api/v1/Course/getCourseDetails",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: "/api/v1/Course/getFullCourseDetails",
  DELETE_COURSE_API: "/api/v1/Course/deleteCourse",
}


// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: "/api/v1/Course/getCategoryPageDetails",
}


// CATAGORIES API
export const categories = {
  CATEGORIES_API: "/api/v1/Course/getAllCategories",
}
