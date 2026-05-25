const express=require("express");
const router=express.Router();

const {
    capturePayments,
    verifyPayment,
    sendPaymentSuccessEmail,
} = require("../Controller/Payment");
const { auth,isStudent } = require("../Middleware/Auth");
router.post("/capturePayment", auth, isStudent, capturePayments);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router; 
