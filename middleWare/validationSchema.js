const {body} = require('express-validator');
const validationSchema=() => {
    return [
        body("name")
            .notEmpty().withMessage("name is required")
            .isLength({ min: 3 }).withMessage("minimum length is 3"),
        body("price")
            .notEmpty().withMessage("price is required")
            .isLength({ min: 1 }).withMessage("minimum length is 1")
    ]
}
module.exports=validationSchema;