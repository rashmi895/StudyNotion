const express=require("express");
const router=express.Router();

const {createCourse,showAllCourses}=require("../Controller/Course");

router.post("/createCourse",createCourse);
router.get("/getAllCourses",showAllCourses);

module.exports=router;