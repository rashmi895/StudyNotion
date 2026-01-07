const express=require("express");
const router=express.Router();

const {capturePayments,verifyPayments}=require("../Controller/Payment");

module.exports = router;   
