const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
exports.capturePayments=async(req,res)=>{
  try{

const {course_id}=req.body;
const userId=req.user.id;
// Validation
if(!course_id){
  return res.status(400).json({
    success:false,
    message:"please provide a vald course id "
   })
};

// find if course exists
let course;
    try {
        course = await Course.findById(course_id);
        if (!course) {
            return res.json({
                success: false,
                message: "Could not find the course",
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            message: "Error while finding course",
        });
    }
// check if the user has already purchased the course
const uid = new mongoose.Types.ObjectId(userId);
if (course.studentsEnrolled.includes(uid)) {
    return res.status(200).json({
        success: false,
        message: "Student is already enrolled",
    });
}

} catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        message: error.message,
    });
}

// oder create 
const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
        courseId: course_id,
        userId,
    },
};
  }
  catch(err){
    
  }
}