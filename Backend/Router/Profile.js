const express=require("express");
const router=express.Router();

const{updateProfile,getAllUserDetails,deleteAccount}=require("../Controller/Profile");

router.put("/updateProfile",updateProfile);
router.delete("/delete",deleteAccount);
router.get("/getAllUser",getAllUserDetails);

module.exports=router;
