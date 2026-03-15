const express=require("express");
const router=express.Router();

const {createCourse,showAllCourses}=require("../Controller/Course");
const {createCategory,showAllCategories,categoryPageDetails}=require("../Controller/Categories");
const { auth, isInstructor } = require("../Middleware/Auth");

// Courses API routes 
router.post("/createCourse",  createCourse);
router.get("/getAllCourses",showAllCourses);


// Categories API routes
router.post("/createCategory",createCategory);
router.get("/getAllCategories",showAllCategories);
router.get("/categoryPageDetails/:id",categoryPageDetails);

module.exports=router;
