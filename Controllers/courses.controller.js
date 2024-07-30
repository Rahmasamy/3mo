// let {Courses} =require('../courses');
const Course = require('../models/course.model'); // Ensure correct path to your model
const { validationResult } = require('express-validator');
const getAllCourses = async (req, res) => {
    console.log("Fetching all courses");
    try {
      const courses = await Course.find(); 
     
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


const getSingleCourse = async(req, res) => {
  
    try{
        const course=await Course.findById(req.params.id)
        if(!course){
            return res.status(404).json({message:"no course with that id found  "})
        }
        return  res.json(course)
    }
    catch(error) {
        return res.status(400).json({message:"invalid object id"})
    }
  
 }

 const CreateNewCourse = async (req, res) => {
    try {
        
        const reqBody = req.body;
        
        const validateErrors = validationResult(req.body); // Corrected typo here

        if (!validateErrors.isEmpty()) {
            return res.status(400).json({ errors: validateErrors.array() }); // Changed msg to errors
        }

        const newCourse = new Course(reqBody);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
const updateCourse = async (req, res) => {
    try {
        const courseUpdated = await Course.updateOne({ _id: req.params.id }, { $set: { ...req.body } });

        if (courseUpdated.matchedCount === 0) {
            return res.status(404).json({ message: "No course with that ID found" });
        }

        if (courseUpdated.modifiedCount === 0) {
            return res.status(400).json({ message: "No changes made to the course" });
        }

        res.status(200).json({ message: "Course updated successfully" });
    } catch (err) {
        return res.status(400).json({ message: `Not valid update ${err}` });
    }
};

const delteCourse = async(req,res)=> {
    const resp=await Course.deleteOne({_id:req.params.id})
    res.status(200).json({delete:"true",msg:resp})
}

module.exports={
    getAllCourses,getSingleCourse,CreateNewCourse,updateCourse,delteCourse
}