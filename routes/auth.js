const express = require("express")

const coursename = express.Router();

const {postApi, loginApi} = require("../controllers/education")

let {addUserValidate, addLoginValidate} = require("../validation/user/user_validation")

coursename.post("/login", addLoginValidate, loginApi);

coursename.post("/signup", addUserValidate, postApi);


module.exports = coursename; 