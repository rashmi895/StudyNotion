const User = require("../Models/User");
const Course = require("../Models/Course");
const Category = require("../Models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// CREATE COURSE
exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const {
      courseName,
      description,
      whatWillYouLearn,
      category,
      price,
      tags,
      status,
      instructions,
    } = req.body;

    const thumbnail = req.files?.thumbnail;

    // validation
    if (
      !courseName ||
      !description ||
      !whatWillYouLearn ||
      !category ||
      !price ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // instructor id from auth middleware
    const instructorId = req.user.id;

    // check category
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // upload thumbnail
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create course
    const newCourse = await Course.create({
      courseName,
      description,
      whatWillYouLearn,
      price,
      thumbnail: thumbnailImage.secure_url,
      category,
      instructor: instructorId,
      tags,
      status,
      instructions,
    });

    // add course to category
    await Category.findByIdAndUpdate(category, {
      $push: { courses: newCourse._id },
    });

    // add course to instructor
    await User.findByIdAndUpdate(instructorId, {
      $push: { courses: newCourse._id },
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// SHOW ALL COURSES
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

  
  
  