const Joi = require('joi');

const schemaCreate = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    phone: Joi.string().pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/).required(),
    email: Joi.string().email().required(),})

const schemaUpdate = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    phone: Joi.string().pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/).required(),
    email: Joi.string().email().required(),})

const validate = (schema, obj, next)=>{
const {error} = schema.validate(obj)
if(error){
    return next({
        status: 400,
        message: "missing fields", 
        data: 'Bad request'
    })
} next()
}

module.exports.create = (req, res, next)=>{
    return validate(schemaCreate, req.body, next)
}

module.exports.update = (req, res, next)=>{
    return validate(schemaUpdate, req.body, next)
}