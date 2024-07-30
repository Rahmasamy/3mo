
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const HttpStatus=require('./utils/httpStatusText');
const cors=require('cors');
const url=process.env.MONGO_URL;
mongoose.connect(url).then(() => {
    console.log("mongoose connect succesfuly");
})

const app = express();

app.use(cors())
const port = process.env.PORT || 6000;

// // Middleware
// app.use(morgan('dev'));
app.use(express.json());

const courseRouter=require('./routers/coursesRoutes');
app.use('/api/courses',courseRouter);

app.all('*',(req,res,next) => {
    return res.status(404).json({status:HttpStatus.ERROR,data:{course:"not valid url"}})

})
app.use((error, req, res, next) => {
    res.status(error.statusCode || 400).json({
        status: error.statusText || 'error',
        message: error.errorMessage || 'An error occurred',
        code: error.statusCode || 400,
        data: null
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
