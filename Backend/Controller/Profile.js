const User = require("../Models/User");
const Profile = require("../Models/Profile");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
// const CourseProgress = require("../models/CourseProgress");
const Course = require("../Models/Course");
// const { convertSecondsToDuration } = require("../utils/secToDuration");


exports.updateProfile = async (req,res) =>{
    try {
        
        const {dateOfBirth="", gender, about="", contactNumber } = req.body;
        
        const userId = req.user.id;

        if(!contactNumber || !gender ) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        } ``

        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;

        const updatedProfile = await Profile.findByIdAndUpdate(profileId, {dateOfBirth, gender, about, contactNumber}, {new:true});
        const updatedUserDetails = await User.findById(userId).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:'Profile updated successfully',
            updatedUserDetails
        })   
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to update profile',
            error: error.message,
        })
    }
}


exports.deleteAccount = async (req,res) =>{
    try {
        const {user} = req.body
        const userId = req.user.id

        //vallidation not neccessary but still doing
        const userDetails = await User.findById(userId);
        // if(!userDetails) {
        //     return res.status(404).json({
        //         success:false,
        //         message:'User not found',
        //     });
        // }         

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //TOOD: HW unenroll user form all enrolled courses
        //delete user
        await User.findByIdAndDelete({_id:userId});

        return res.status(200).json({
            success:true,
            message:'User deleted successfully',
        })   
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to delete User',
            error: error.message,
        })
    }
}

exports.getAllUserDetails = async (req, res) => {

    try {
        //get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:'User Data Fetched Successfully',
            userDetails
        });
       
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

// exports.updateDisplayPicture = async (req, res) => {
//     try {
//       const displayPicture = req.files?.displayPicture   //get the image from the request
//       if (!displayPicture) {
//         return res.status(400).json({
//           success: false,
//           message: "Display picture file is required",
//         })
//       }

//       const userId = req.user.id  //get user ID from the request
//       const image = await uploadImageToCloudinary(  // uploading the image to cloudinary and getting the url
//         displayPicture,
//         process.env.FOLDER_NAME,
//         1000,
//         1000
//       )
//       console.log(image)
//       const updatedProfile = await User.findByIdAndUpdate(
//         { _id: userId },
//         { image: image.secure_url },
//         { new: true }
//       )
//       res.send({
//         success: true,
//         message: `Image Updated successfully`,
//         data: updatedProfile,
//       })
//     } catch (error) {
//       console.error(error)
//       return res.status(500).json({
//         success: false,
//         message: "Image upload failed",
//         error: error.message,
//       })
//     }
// };

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files?.displayPicture   //get the image from the request
      if (!displayPicture) {
        return res.status(400).json({
          success: false,
          message: "Display picture file is required",
        })
      }

      const userId = req.user.id  //get user ID from the request
      const image = await uploadImageToCloudinary(  // uploading the image to cloudinary and getting the url
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
        error: error.message,
      })
    }
};