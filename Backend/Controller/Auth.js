const user=require("../Models/User");
const otp=require("../Models/OTP");
exports.sendotp=async(req,res)=>{
try{
  // fetch the email id from database
const {email}=req.body;
console.log("otp send ",email);

// check if user already exists
const existingUser=await user.findOne({email});
if(existingUser){
  return res.json(400).json({
success:true,
message:"user already exists "
  });
}
var otpGenerator = require('otp-generator');

otpGenerator.generate(4, { upperCase: false, specialChars: false });
  let result = await otp.findOne({otp:otp});

        while (result) {
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = otp.findOne({otp:otp});
        }
        console.log("OTP generated", otp);

        const createdOtp = await otp.create({
            email,
            otp
        })

        return res.status(200).json({
            success:true,
            message: "OTP created!",
            createdOtp
        })

}
catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
  }
  

  // signup funtion 
  const bcrypt = require("bcrypt");
const OTP = require("../Models/OTP");            // OTP model
const User = require("../Models/User");          // User model
const Profile = require("../Models/Profile");    // Profile model
const otpGenerator = require("otp-generator");   // For OTP creation
const nodemailer = require("nodemailer");        // For sending email

// ------------------------------
// 📩 SIGNUP CONTROLLER
// ------------------------------
exports.signup = async (req, res) => {
  try {
    // 1️⃣ Fetch details from the request body
    const { firstName, lastName, email, password, confirmPassword, accountType, otp } = req.body;

    // 2️⃣ Validate required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 3️⃣ Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // 4️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this email",
      });
    }

    // 5️⃣ Get the most recent OTP for this email
    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new one.",
      });
    }

    // 6️⃣ Verify the entered OTP
    if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    // 7️⃣ Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 8️⃣ Set approval based on account type
    const approved = accountType === "Instructor" ? false : true;

    // 9️⃣ Create an empty profile for the user
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // 🔟 Create the new user document in MongoDB
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      approved,
      additionalDetails: profileDetails._id, // Link to Profile
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, // Avatar
    });

    console.log("✅ User created successfully:", newUser.email);

    // 1️⃣1️⃣ Send success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        accountType: newUser.accountType,
      },
    });
  } 
  catch (error) {
    console.error("❌ Error during signup:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during signup",
      error: error.message,
    });
  }
};
  // login code 
  exports.login = async (req, res) => {
    try {
      // 1️⃣ Fetch email and password from request body
      const { email, password } = req.body;

      // 2️⃣ Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // 3️⃣ Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found. Please sign up first.",
        });
      }

      // 4️⃣ Compare passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }

      // 5️⃣ Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, accountType: user.accountType },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // 6️⃣ Create cookie and send response
      return res.cookie("token", token, { httpOnly: true, secure: true }).status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          accountType: user.accountType,
        },
      });
    } 
  }
    // Change Password 
    exports.changePassword = async (req, res) => {
      try {
        // 1️⃣ Fetch email, old password, and new password from request body
        const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

        // 2️⃣ Validate required fields
        if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
          return res.status(400).json({
            success: false,
            message: "All fields are required",
          });
        }

        // 3️⃣ Check if new passwords match
        if (newPassword !== confirmNewPassword) {
          return res.status(400).json({
            success: false,
            message: "New passwords do not match",
          });
        }

        // 4️⃣ Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        // 5️⃣ Verify old password
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
          return res.status(401).json({
            success: false,
            message: "Old password is incorrect",
          });
        }

        // 6️⃣ Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 7️⃣ Update password in database
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });

        // 8️⃣ Send confirmation email
        await nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        }).sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Password Changed Successfully",
          html: `<h2>Your password has been updated successfully!</h2>`,
        });

        return res.status(200).json({
          success: true,
          message: "Password updated successfully. Confirmation email sent.",
        });
      } catch (error) {
        console.error("❌ Error during password change:", error);
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: error.message,
        });
      }
    };
    catch (error) {
      console.error("❌ Error during login:", error);
      return res.status(500).json({
        success: false,
        message: "Server error during login",
        error: error.message,
      });
    };
  