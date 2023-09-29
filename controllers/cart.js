const { response } = require("express")
const db = require("../db")
const { date } = require("joi")
const moment = require("moment")
const { result } = require("@hapi/joi/lib/base")


// 
const cartDetails = async (req, res, next) => {

      const id = res.locals.jwt.userId;

        console.log(id);
        
        const sql = `SELECT course_name,category,page_image,details,about_course,duration from add_cart join course on add_cart.course_id = course.id WHERE add_cart.user_id = ?`
        const value = [id]
        db.query(sql, value, (err, result) => {
            console.log(err,"err");
            console.log(result,"result");
            try{
                if (err) {
                    console.log(err, "error");
                   return res.status(400).json({
                        status: false,
                        data: null,
                        msg: "somthing error"
                    })
    
                } else {
    
                 //    console.log(result.hellowlrd.use);
    
                    return res.json({
                        status: true,
                        data: [],
                        message: "list of course"
                    })
                }

            }catch(e){
                console.log(e);
                return res.status(400).json({
                    status: false,
                    data: null,
                    msg: "somthing error"
                })
            }
        })       
    }



// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//



const addToCart = async (req, res, next) => {

    try {   
        const id = res.locals.jwt.userId
        console.log(id, "id");
        const course_id = req.body.course_id;

            if (!course_id) return res.status(400).json({
                msg: "Please pass the course Id"
            })

        const currentDate = moment().format('YYYY-MM-DD');
        console.log(currentDate, "currentdate");
        console.log(course_id);

        let sql = `select * from add_Cart where user_id = ? AND course_id = ?`
        let value = [id, course_id]
        db.query(sql,value,(err,result)=>{
            console.log(result,"result");
            if (err) throw err;
            if(result.length>0){
                return res.status(400).json({
                    status:true,
                    data:[],
                    msg:"this course_id already purchased"
                })
            }else{
                 const sql = `INSERT into add_cart (user_id, course_id, status, create_at, update_at) values (?, ?, ?, ?, ?)`
        const value = [id,  course_id, "1", currentDate, currentDate]

        db.query(sql, value, (err, result) => {
           if (err) {
            console.log(err);
            console.log(result,"result");
             res.status(400).json({
                msg:"somthing error"
            })
           }
            else {
                return res.status(200).json({
                    status: true,
                    data: result,
                    msg: "Course added in cart !"
                })
            }
        })}})
    }catch (error) {
        console.log(error);
    }
}




// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//

const deleteTocart = async (req, res, next) => {
    
        const userId = res.locals.jwt.userId
        const cartId = req.body.id
        const sql = `delete from add_cart where user_id = ? and id = ?`
        const value = [userId,cartId]
        db.query(sql,value,(err,result)=>{
            console.log(err,"err");
            console.log(result,"result");
            try {
                if(err){
                    res.status(400).json({
                        status:false,
                        data:[],
                        msg:"somthing error"
                    })
                }else{
                    return res.status(200).json({
                        status:true,
                        data:[],
                        msg:'this cart id deleted'
                    })
                }
            } catch (error) {
                console.log(error);
            }
        })
}





module.exports = { addToCart, cartDetails, deleteTocart }