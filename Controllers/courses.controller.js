// let {Courses} =require('../courses');
const Course = require('../models/course.model'); // Ensure correct path to your model
const { validationResult } = require('express-validator');
const HttpStatus=require('../utils/httpStatusText');
const asyncWrapper=require('../middleWare/asyncWrapper');
const AppError=require('../utils/appError');
const getAllCourses = asyncWrapper(async (req, res) => {
    const limit=req.query.limit || 10;
    const page= req.query.page || 1;
    const skip=(page-1)*limit;
    console.log("Fetching all courses");

      const courses = await Course.find({},{"__v":false}).limit(limit).skip(skip); 
        res.json({status:HttpStatus.SUCESS,data:{courses}});
  }
  );


const getSingleCourse =asyncWrapper(async(req, res,next) => {
  
   
        const course=await Course.findById(req.params.id)
        console.log(!course);
        if(!course){
           const error = AppError.createError("course Not fOUND",404,HttpStatus.FAIL);
           return next(error);
   
        }
        return  res.json({status:HttpStatus.SUCESS,data:{course}})
    
    
 }
)


module.exports = { getSingleCourse };

 const CreateNewCourse =asyncWrapper(async (req, res,next) => {
   
        const reqBody = req.body;
        
        const validateErrors = validationResult(req.body); // Corrected typo here

        if (!validateErrors.isEmpty()) {
            const error = AppError.createError("course is empty",404,HttpStatus.FAIL);
            return next(error)
          
        }

        const newCourse = new Course(reqBody);
        await newCourse.save();
        res.status(201).json({status:HttpStatus.SUCESS,data:{newCourse}});
    
});
const updateCourse = asyncWrapper (async (req, res) => {
  
        const courseUpdated = await Course.updateOne({ _id: req.params.id }, { $set: { ...req.body } });

        if (courseUpdated.matchedCount === 0) {
            
            const error = AppError.createError("No course with that ID found",404,HttpStatus.FAIL);
            return next(error)
        }

        if (courseUpdated.modifiedCount === 0) {
            const error = AppError.createError("No changes made to the course",400,HttpStatus.FAIL);
            return next(error)
        }

        res.status(200).json({status:HttpStatus.SUCESS,data: {coureupdata:courseUpdated}, message: "Course updated successfully" });

} );

const delteCourse = asyncWrapper (async(req,res)=> {

    await Course.deleteOne({_id:req.params.id})
    res.status(200).json({status:HttpStatus.SUCESS,data:null})


}
)
module.exports={
    getAllCourses,getSingleCourse,CreateNewCourse,updateCourse,delteCourse
}