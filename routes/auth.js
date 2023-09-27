const express = require("express")

const coursename = express.Router();

const {getsaved,addToSaved,deletetosaved} = require("../controllers/saved")

const {postApi, loginApi, updateProfile,change_password} = require("../controllers/education");

const {upload,upload_profile} = require("../controllers/image")

const {addToCart,cartDetails,deleteTocart} = require("../controllers/cart")

const {lesson_list} = require("../controllers/lesson") 

const {getAllCourse} = require("../controllers/course")

const {addToPayment,GetPayment} =  require("../controllers/payment")

const verifyToken = require("../token_jwt/index")

let {addUserValidate, addLoginValidate, addChangePassword } = require("../validation/user/user_validation")

coursename.post("/login", addLoginValidate, loginApi);

coursename.post("/signup", addUserValidate, postApi);

coursename.patch("/changepassword", verifyToken.verifyToken, addChangePassword, change_password)

coursename.put("/updateProfile", verifyToken.verifyToken, updateProfile);

coursename.put("/uploadimage", verifyToken.verifyToken ,upload.single("image") ,upload_profile)

coursename.get("/show",verifyToken.verifyToken, getAllCourse)

coursename.get("/cart",verifyToken.verifyToken, cartDetails)

coursename.post("/addToCart",verifyToken.verifyToken, addToCart)

coursename.delete("/delete",verifyToken.verifyToken, deleteTocart)

coursename.get("/lesson", lesson_list)

coursename.get("/saved", verifyToken.verifyToken, getsaved)

coursename.post("/addtosaved", verifyToken.verifyToken, addToSaved)

coursename.delete("/deletetosaved",verifyToken.verifyToken, deletetosaved)

coursename.post("/addtopayment", verifyToken.verifyToken, addToPayment)

coursename.get("/getpayment",verifyToken.verifyToken,GetPayment)

module.exports = coursename; 










