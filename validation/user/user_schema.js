const Joi = require("joi")
// import Joi from "joi"

const signUpSchema = Joi.object({
    name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
   //  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
 })

let loginschema =  Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
   })


let password_validation = Joi.object({
   old_password: Joi.string().required(),
   new_password: Joi.string().required()
})
module.exports = {signUpSchema,loginschema , password_validation}