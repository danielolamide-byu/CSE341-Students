


const { configDotenv } = require('dotenv');
const Joi = require('joi');


const personalInfoValidator = data => {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        age: Joi.number()
            .required(),
        level: Joi.string()
            // .alphanum()
            .required(),
        gender: Joi.string()
            .required(),
        major: Joi.string(),
        association: Joi.string(),
        GPA:Joi.number()

        
    })
    return schema.validate(data)
};

module.exports.personalInfoValidator = personalInfoValidator;