const express = require("express")

const coursename = express.Router();

let {addUserValidate, addLoginValidate, addChangePassword } = require("../validation/user/user_validation")

const {getsaved,addToSaved,deletetosaved} = require("../controllers/saved")

const {SignupApi, loginApi, updateProfile,change_password} = require("../controllers/education");

const {upload,upload_profile} = require("../controllers/image")

const {addToCart,cartDetails,deleteTocart} = require("../controllers/cart")

const {GetTest,GetQuiz,checkanwser} = require("../controllers/test")

const {lesson_list} = require("../controllers/lesson") 

const {getAllCourse} = require("../controllers/course")

const {addToPayment,GetPayment} =  require("../controllers/payment")

const {Call_api} = require("../controllers/Api")

const verifyToken = require("../token_jwt/index")

coursename.post("/login", addLoginValidate, loginApi);

coursename.post("/signup", addUserValidate, SignupApi);

coursename.patch("/changepassword", verifyToken.verifyToken, addChangePassword, change_password)

coursename.put("/updateProfile", verifyToken.verifyToken, updateProfile);

coursename.put("/uploadimage", verifyToken.verifyToken ,upload.single("image") ,upload_profile)

coursename.get("/show",verifyToken.verifyToken, getAllCourse)

coursename.get("/cart",verifyToken.verifyToken, cartDetails)

coursename.post("/addToCart",verifyToken.verifyToken, addToCart)

coursename.delete("/delete",verifyToken.verifyToken, deleteTocart)

coursename.get("/lesson",verifyToken.verifyToken, lesson_list)

coursename.get("/saved", verifyToken.verifyToken, getsaved)

coursename.post("/addtosaved", verifyToken.verifyToken, addToSaved)

coursename.delete("/deletetosaved",verifyToken.verifyToken, deletetosaved)

coursename.post("/addtopayment", verifyToken.verifyToken, addToPayment)

coursename.get("/getpayment",verifyToken.verifyToken,GetPayment)

coursename.get("/test",verifyToken.verifyToken,GetTest)

coursename.get("/getquiz",verifyToken.verifyToken,GetQuiz)

coursename.get("/anwser",verifyToken.verifyToken,checkanwser)

coursename.get("/url", Call_api)

module.exports = coursename; 










