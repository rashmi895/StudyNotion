// Import the required modules
const express = require("express")
const router = express.Router()

// import the required controller and middleware functions 
 const {sendOtp,signup,login,changePassword}=require("../Controller/Auth");
 