const db = require("../db")

const lesson_list = async(req,res,next)=>{
    try{
        const sql = `select * from lesson`
        db.query(sql,(err,result)=>{
            console.log(err,"err");
            console.log(result,"result");
            if (err) {
                console.log(err);
                res.status(400).json({msg:"someting error"})                
            }else{
                return res.status(200).json({
                    status:true,
                    data:[],
                    msg:"this is lesson !"
                })
            }
        }) 
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {lesson_list}