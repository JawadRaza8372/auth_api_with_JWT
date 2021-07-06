const Joi=require('joi')
const RegisterValidationSchema=Joi.object({
    name:Joi.string().min(5).required(),
    email:Joi.string().min(6).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:Joi.string().min(6).required()

})
const LoginValidationSchema=Joi.object({
    email:Joi.string().min(6).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:Joi.string().min(6).required()

})

module.exports.RegisterValidationSchema=RegisterValidationSchema;
module.exports.LoginValidationSchema=LoginValidationSchema;