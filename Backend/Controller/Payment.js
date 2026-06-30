const crypto = require("crypto");
const mongoose = require("mongoose");
const { instance } = require("../config/Razorpay");
const Course = require("../Models/Course");
const CourseProgress = require("../Models/CourseProgress");
const User = require("../Models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../Mail/CourseEnrollrement");
const { paymentSuccessEmail } = require("../Mail/PaymentSuccessful");

const enrollStudents = async (courses, userId) => {
  for (const courseId of courses) {
    const enrolledCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $addToSet: {
          studentsEnrolled: userId,
        },
      },
      { new: true }
    );

    if (!enrolledCourse) {
      throw new Error("Course not found");
    }

    const courseProgress = await CourseProgress.create({
      courseID: courseId,
      userId,
      completedVideos: [],
    });

    const enrolledStudent = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          courses: courseId,
          courseProgress: courseProgress._id,
        },
      },
      { new: true }
    );

    if (enrolledStudent?.email) {
      await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );
    }
  }
};

exports.capturePayments = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one course",
      });
    }

    let totalAmount = 0;

    for (const courseId of courses) {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid course id",
        });
      }

      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Could not find the course",
        });
      }

      const alreadyEnrolled = course.studentsEnrolled.some(
        (studentId) => studentId.toString() === userId.toString()
      );

      if (alreadyEnrolled) {
        return res.status(400).json({
          success: false,
          message: "Student is already enrolled",
        });
      }

      totalAmount += Number(course.price);
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const paymentResponse = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !Array.isArray(courses) ||
      courses.length === 0 ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }

    await enrollStudents(courses, userId);

    return res.status(200).json({
      success: true,
      message: "Payment verified",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not verify payment",
    });
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await mailSender(
      user.email,
      "Payment Received",
      paymentSuccessEmail(
        `${user.firstName} ${user.lastName}`,
        Number(amount) / 100,
        orderId,
        paymentId
      )
    );

    return res.status(200).json({
      success: true,
      message: "Payment success email sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not send payment success email",
    });
  }
};
