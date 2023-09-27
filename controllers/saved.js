const { result } = require("@hapi/joi/lib/base");
const db = require("../db")
const moment = require("moment")


const getsaved = async(req,res,next)=>{
    try {
 const uid = res.locals.jwt.userId
 console.log(uid,"uid");

   const sql = `select course_name,category,page_image,details,about_course,duration from saved join course on saved.course_id = course.id where saved.user_id = ?` 

const value = [uid]
db.query(sql,value,(err,result)=>{
    console.log(err,"err");
    console.log(result,"result");
    if(err){
        res.status(400).json({
            status:false,
            data:[],
            msg:"something error"
        })
    }else{
        return res.status(200).json({
            status:true,
            data:[],
            msg: " this is list "
        })
    }
})      
    } catch (error) {
        console.log(error);
    }
}


// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//


const addToSaved = async(req,res,next)=>{
    try {
        const uid = res.locals.jwt.userId
        const course_id = req.body.course_id

        if (!course_id) return res.status(400).json({
            msg: "Please pass the course Id"
        })
         
        const currentDate = moment().format('YYYY-MM-DD');
        console.log(currentDate, "currentdate");
        const  Sql = `select * from course where id = ?`
        let values = [course_id]
        db.query(Sql,values,(err,result)=>{
            if(err) {
            console.log(err,"err");
            console.log(result,"result")}
            console.log(result.length,"result.length");
            if(result.length===0){
                return res.status(400).json({
                    status:false,
                    data:[],
                    msg:"this course_id is not exist"
                })}
                else{
                let sql = `select * from saved where user_id = ? AND course_id = ?`
                let value = [uid,course_id]
                db.query(sql,value,(err,result1)=>{
                    console.log(err,"err");
                    console.log(result1,"result1");
                    if(err) throw err
                    if(result1.length>0){
                        return res.status(400).json({
                            status:true,
                            data:[],
                            msg:"this course_id is already saved"
                        })
                    }else{
                        const sql = `INSERT into saved (user_id, course_id, create_at, updated_at, status) values (?, ?, ?, ?, ?)`
                        const value = [uid, course_id, currentDate, currentDate,"1"]
                        db.query(sql,value,(err,coursesaved)=>{
                            console.log(coursesaved,"coursesaved");
                            console.log(err,"err");
                            if(err){
                                res.status(400).json({
                                    status:false,
                                    data:[],
                                    msg:"something error"
                                })
                            }else {
                                return res.status(200).json({
                                    status: true,
                                    data:[],
                                    msg: "Course saved !"
                                })
                            }
                        })   
     } })}})
            }catch(error){
      console.log(error);
    }}




// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
 

const deletetosaved = async(req,res,next)=>{
    try {
        const uid = res.locals.jwt.userId
        const savedId = req.body.id
        const sql = `delete from saved where user_id = ? and id = ?`
        value = [uid,savedId]
        db.query(sql,value,(err,result)=>{
            console.log(err,"err");
            console.log(result,"result");
            if(err){
                res.status(400).json({
                    status:false,
                    data:[],
                    msg:"something error"
                })
            }else{
                return res.status(200).json({
                    status:true,
                    data:[],
                    msg:"course remove"
                })
            }

        })
    } catch (error) {
        console.log(error);
    }
}




module.exports = {getsaved,addToSaved,deletetosaved}




