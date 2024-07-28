let {Courses} =require('../courses');
const {validationResult } = require('express-validator');
const getAllCourses =  (req, res) => {
        res.json(Courses)
     }



const getSingleCourse = (req, res) => {
    const course =Courses.find(course => course.id === +req.params.id)
    
    if(!course){
        return res.status(404).json({message:"no course with that id found  "})
    }
    res.json(course)
 }

 const CreateNewCourse =
    (req, res) => {
    const reqBody=req.body;
    // if(!reqBody.title)
    //     return res.status(400).json({msg:"title is required"})
    // }
    // if(!reqBody.price){
    //     return res.status(400).json({msg:"price is required"})
    // }
    
    const valdiateErrors=validationResult(req);
    console.log(valdiateErrors);
    if(!valdiateErrors.isEmpty()){
        console.log("true");
        return res.status(400).json({msg:valdiateErrors.array()})
    }
    Courses.push({
        id:Courses.length +1,...reqBody
    })
    res.status(201).json(Courses)
 }
 const updateCourse=  (req, res) => {
    let course =Courses.find(course => course.id === +req.params.id)
    
    if(!course){
        return res.status(404).json({message:"no course with that id found  "})
    }
    course = {...course,...req.body}
    res.status(200).json(course)
}

const delteCourse = (req,res)=> {
    const courseId=+req.params.id;
    Courses=Courses.filter( item => item.id !== courseId)
    res.status(200).json({delete:"true"})
}

module.exports={
    getAllCourses,getSingleCourse,CreateNewCourse,updateCourse,delteCourse
}