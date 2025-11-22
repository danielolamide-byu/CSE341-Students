
const { configDotenv } = require('dotenv');
const Joi = require('joi');
// const joi = require('joi');

const courseValidator = data => {
    const schema = Joi.object({
        title: Joi.string()
            .required(),
        code: Joi.string()
            .alphanum()
            .required(),
        department: Joi.string()
            .required(),
        instructor: Joi.string()
            .required()
        
    })
    return schema.validate(data)
};

module.exports.courseValidator = courseValidator;