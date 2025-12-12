const User = require('../models/User');
exports.createCourse=(req,res)=>{
  try{
    // fetch all the details from the frontend 
const {courseName, description,whatWillYouLearn,courseContent}=req.body;

// basic validation
if (!courseName || !description || !whatWillYouLearn || !courseContent){
  return res.status(400).json({
    success:false,
    message:"All fields are required"
  })
}
   const instructorId = req.user.id;

        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:'Category Details not found',
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            description:courseDescription,
            whatWillYouLearn,
            price,
            thumbnail:thumbnailImage.secure_url,
            category,
            instructor:instructorId,
            tags,
            status,
            instructions
        })

        await Category.findByIdAndUpdate(category,
            {
                $push: {
                    course: newCourse._id
                }
            })

        await User.findByIdAndUpdate(instructorId, {
            $push: {
                courses: newCourse._id
            }})
            
        return res.status(200).json({
            success:true,
            message:'Course created successfully',
            newCourse
        })    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        })
    }
}

exports.showAllCourses = async (req,res) => {
    try {
        const allCourses = Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnroled: true,
        }).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:'Data for all courses fetched successfully',
            data:allCourses,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to show all Courses',
            error: error.message,
        })
    }
}
  
  
  