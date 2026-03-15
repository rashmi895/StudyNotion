const User = require("../Models/User");
const Course = require("../Models/Course");
const Category = require("../Models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// CREATE COURSE
exports.createCourse = async (req, res) => {
  try {
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

    const requiredFields = [
      ["courseName", courseName],
      ["description", description],
      ["whatWillYouLearn", whatWillYouLearn],
      ["category", category],
      ["price", price],
      ["tags", tags],
      ["status", status],
      ["instructions", instructions],
      ["thumbnail", thumbnail],
    ];

    const missingFields = requiredFields
      .filter(([_, value]) => {
        if (typeof value === "string") {
          return value.trim() === "";
        }

        return !value;
      })
      .map(([fieldName]) => fieldName);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const instructorId = req.user.id;

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

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

    console.log("NEW COURSE: ", newCourse);

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


// GET COURSE DETAILS  
  
  exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    const {courseId} = req.body;
    //find course details
    const courseDetails = await Course.findById(courseId)
                                .populate(
                                    {
                                        path:"instructor",
                                        populate:{
                                            path:"additionalDetails",
                                        },
                                    }
                                )
                                .populate("category")
                                .populate("ratingAndReviews")
                                .populate({
                                    path:"courseContent",
                                    populate:{
                                        path:"subSection",
                                        //select: "-videoUrl",
                                    },
                                })
                                .exec();

        //validation
        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            });
        }

        let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
        //return response
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:{courseDetails,
              totalDuration
            },
        })

  }
  catch(error) {
      console.log(error);
      return res.status(500).json({
          success:false,
          message:error.message,
      });
  }
}
