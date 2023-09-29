const db = require("../db")

const lesson_list = async(req,res,next)=>{
    try{ 
        const uid = res.locals.jwt.userId
        console.log(uid,"uid");
        const course_id = req.body.course_id
    
        if (!course_id) return res.status(400).json({
            msg: "Please pass the course Id"
        })


        const sql = `select * from lesson where course_id = ? `
         const value = [course_id ]
        db.query(sql,value,(err,result)=>{
            console.log(err,"err");
            console.log(result,"result");
            if (err) {
                console.log(err);
                res.status(400).json({msg:"someting error"})                
            }else{
                return res.status(200).json({
                    status:true,
                    data:result,
                    msg:"this is lesson !"
                })
            }
        }) 
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {lesson_list}