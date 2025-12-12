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

// 
  }
  catch(err){
    
  }
}