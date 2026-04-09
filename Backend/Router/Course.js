const express=require("express");
const router=express.Router();

const {
  createCourse,
  deleteCourse,
  editCourse,
  getCourseDetails,
  getFullCourseDetails,
  getInstructorCourses,
  showAllCourses,
} = require("../Controller/Course");
const {createCategory,showAllCategories,categoryPageDetails}=require("../Controller/Categories");
const { auth, isInstructor } = require("../Middleware/Auth");
const { createSection,updateSection,deleteSection } = require("../Controller/Section");
const { createSubSection, updateSubSection, deleteSubSection } = require("../Controller/Sub-Section");

// Courses API routes 
router.post("/createCourse",auth, isInstructor,  createCourse);
router.get("/getAllCourses",auth,isInstructor, showAllCourses);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.post("/editCourse",auth,isInstructor,editCourse);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

// Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

// Sub-Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Categories API routes
router.post("/createCategory",auth, isInstructor, createCategory);
router.get("/getAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);
// router.get("/categoryPageDetails/:id", categoryPageDetails);

module.exports=router;
