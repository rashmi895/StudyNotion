import {combineReducers } from "@reduxjs/toolkit";
import authReducers from "../slices/authSlice";
import profileReduces from "../slices/profileSlice"
import courseReducer from "../slices/courseSlice"
import { Toaster } from "react-hot-toast";
import cartReducers from "../slices/cartSlice";
import viewCourseReducer from "../slices/viewCourseSlice";

const rootReducer=combineReducers({

    auth:authReducers,
    cart:cartReducers,
  profile:profileReduces,
  course: courseReducer,
  viewCourse: viewCourseReducer,
});

export default rootReducer;
