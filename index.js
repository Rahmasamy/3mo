
// const { argv }=require('node:process');

// const [,,action,note,time]=argv

// console.log(note);
// console.log(time);
// const notes= fs.readFileSync('./todo.txt',{encoding:'utf-8'});
// console.log(notes);

// if(action==='add'){
//     const res= JSON.parse(notes || '[]')
//     console.log(res);
//     res.push({id :Date.now(),note,time});

//     fs.writeFileSync('./todo.txt',JSON.stringify(res));
// }
// if (action === 'list'){

//    console.log(`notes reading successfult ${notes}`);
// }
// console.log("file added");


// const http = require('node:http');
// const fs=require('node:fs');

// const hostname = '127.0.0.1';
// const port = 3001;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   const reqUrl=req.url;
// //   res.setHeader('Content-Type', 'text/plain');
// if(reqUrl === '/'){
//    res.write(homePage);
// }
// else {
//     res.statusCode=404
// }

//   // to make the server respond
//   res.end('');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// const homePage=fs.readFileSync('./index.html','utf-8');
// const fs = require('fs');

// const express = require('express');
// const morgan = require('morgan');
// const {body,validationResult }=require('express-validator');
// const courseControllers=require('./Controllers/courses.controller')
// const app = express()
// const port = 5001;

// app.use(express.static('./views'));
// midleware 
// app.use('/products',(req,res,next) => {
//      console.log(req.url);
//      console.log(req.method);
//      next();
// }

// )

// app.use(morgan('dev'));
// 
// app.get('/', (req, res) => {
//     res.send("hello")
// })
// // read courses
// app.get('/api/courses', courseControllers.getAllCourses)
// // read single course
// app.get('/api/courses/:id',courseControllers.getSingleCourse )
// // create course
//  app.post('/api/courses',
//     [body("name").notEmpty().withMessage("title is required") .isLength({min:3}).withMessage("minum length is 3")
//         ,body("price").notEmpty().withMessage("price is required") .isLength({min:1}).withMessage("minum length is 1")]  ,
//         courseControllers.CreateNewCourse
// )
// // update course 
// app.patch('/api/courses/:id',courseControllers.updateCourse)
// app.delete('/api/courses/:id',courseControllers.delteCourse)


// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
const express = require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const url="mongodb+srv://rahmasamy949:0xF2tUzB5CIe1Xoh@mongodb-nodejs.tjctvx3.mongodb.net/crs";
mongoose.connect(url).then(() => {
    console.log("mongoose connect succesfuly");
})

const app = express();
const port = 5001;

// // Middleware
// app.use(morgan('dev'));
app.use(express.json());

const courseRouter=require('./routers/coursesRoutes');
app.use('/api/courses',courseRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
