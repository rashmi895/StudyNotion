// Import the required modules
const express = require("express")
const router = express.Router()

// import the required controller and middleware functions 
 const {sendotp,signup,login,changePassword}=require("../Controller/Auth");
 
 const { resetPasswordToken,
  resetPassword } = require("../Controller/ResetPassword");


  // CONTROLLERS FOR RESET PASSWORD
  const {auth}=require("../Middleware/Auth");

  // ROUTES FOR AUTHICAION AND AUTHORISATION
  router.post("/login",login);
router.post("/signup",signup);
router.post("/sendotp",sendotp);
router.post("/changePassword",auth ,changePassword);

// ROUTES FOR RESET PASSWORD
router.post(
  "/resetPassword-token",
  resetPasswordToken
);

router.post(
  "/resetPassword",
  resetPassword
);


module.exports=router;