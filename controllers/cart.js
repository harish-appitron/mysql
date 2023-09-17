const db = require("../db")
const addToCart = async(req,res,next)=>{
    try { 
        const id = res.locals.jwt.userid
        const sql = `SELECT course_name,category,page_image,details,about_course,duration from add_cart join course on add_cart.course_id = course.id WHERE add_cart.user_id = ${id}`
        db.query(sql,(err,result)=>{
            console.log(result);
            if(err){
                res.status(400).json({
                    status:false,
                    data:null,
                    msg:"somthing error"
                })
            }else{
                return res.json({
                    status:true,
                    data:[],
                    message:"course is avilable"   
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addToCart}