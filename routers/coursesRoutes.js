const express =require('express')

const router =express.Router()

const courseControllers = require('../Controllers/courses.controller');
const validationSchema=require('../middleWare/validationSchema')
router.route('/')
.get(courseControllers.getAllCourses)
.post( validationSchema(), courseControllers.CreateNewCourse)




router.route('/:id')
.get( courseControllers.getSingleCourse)
.patch(courseControllers.updateCourse)
.delete( courseControllers.delteCourse);







module.exports=router