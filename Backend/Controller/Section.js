const Category=require("../Models/Category");
const Course=require("../Models/Course");
exports.createSection=async(req,res)=>{
  try{
    // data fech from frontend 
const {name,course}=req.body;
// data validation 
  if(!name || !course){
    return res.status(400).json({
      success:false,
      message:"fill all the details"
    })
// section create
        const newSection = await Section.create({sectionName});
    // section id push in course id 
    const updatedCourse= await course.findByIdandUpdate(courseId,{
      $push:{
courseContent:newSection._id
      }
    },{new:true
    });

      return res.status(200).json({
            success:true,
            message:'Section created successfully',
            newSection,
            updatedCourse
        })   
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Section',
            error: error.message,
        })
  }
  }
 
  // UPDATE THE SECTION 
  exports.updateSection=async(req,res)=>{
    try{
const {courseid,sectionId,sectionName}=req.body;
if(!sectionName || !sectionId){
  res.status(400).json({
    status:false,
    message:"fill all the details "
  })
}

// cre
const updatedSection=await Section.findByIdandUpdate(sectionId,{sectionName},{new:true});
const updatedCourse= await Course.findById(courseid)
.populate({
    path:"courseContent",
              populate: {
                  path:"subSection"
}});
  return res.status(200).json({
            success:true,
            message:'Section updated successfully',
            updatedCourse
        })   
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to update Section',
            error: error.message,
        })
    }
}
  }

  // DELETE SECTION 
  exports.deleteSection = async (req,res) => {
    try {
        
        const {sectionId, courseId} = req.body;

        if (!sectionId) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        const sectionDetails = await Section.findById(sectionId);
        
        // //Section ke ander ke subsections delete kiye hai 
        sectionDetails.subSection.forEach( async (ssid)=>{
            await SubSection.findByIdAndDelete(ssid);
        })
        console.log('Subsections within the section deleted')
        //NOTE: Due to cascading deletion, Mongoose automatically triggers the built-in middleware to perform a cascading delete for all the referenced 
        //SubSection documents. DOUBTFUL!

        //From course, courseContent the section gets automatically deleted due to cascading delete feature
        await Section.findByIdAndDelete(sectionId);
        console.log('Section deleted')

        const updatedCourse = await Course.findById(courseId)
          .populate({
              path:"courseContent",
              populate: {
                  path:"subSection"
              }});
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully',
            updatedCourse
        })   
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to delete Section',
            error: error.message,
        })
    }
}
