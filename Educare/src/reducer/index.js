import {combineReducers } from "@reduxjs/toolkit";
import authReducers from "../slices/authSlice";
import profileReduces from "../slices/profileSlice"

import { Toaster } from "react-hot-toast";
import cartReducers from "../slices/cartSlice";

const rootReducer=combineReducers({

    auth:authReducers,
    cart:cartReducers,
  profile:profileReduces,
});

export default rootReducer;