const express=require("express");
const router=express.Router();

const{updateProfile,getAllUserDetails,deleteAccount,getEnrolledCourses, updateDisplayPicture}=require("../Controller/Profile");
const { auth } = require("../Middleware/Auth");

router.put("/updateProfile", auth, updateProfile);
router.delete("/delete", auth, deleteAccount);
router.get("/getAllUser", auth, getAllUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
module.exports=router;
