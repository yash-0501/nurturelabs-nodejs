//Validation
const Joi = require("@hapi/joi");

const registerValidation = (data)=>{
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
    };
    return Joi.validate(data,schema);
 }
const loginValidation = (data)=>{
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
    };
    return Joi.validate(data,schema);
 }

 const advisorValidation = (data)=>{
    const schema = {
        name: Joi.string().required(),
        profile_pic: Joi.string().required(),
    };
    return Joi.validate(data,schema);
 }

 module.exports.registerValidation = registerValidation;
 module.exports.loginValidation = loginValidation;
 module.exports.advisorValidation = advisorValidation;