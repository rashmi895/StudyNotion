const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  // fetch all the details from the form 
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body;
  console.log(req.body)
  try {
    // user e mail send krna hai
    const emailRes = await mailSender(
      // user maid id 
      email,
      // message 
      "Your Data send successfully",
      // template
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    // response
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}