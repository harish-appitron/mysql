const { result } = require("@hapi/joi/lib/base")
const db = require("../db")

const GetTest = async(req,res,next)=>{
    try {
            const uid = res.locals.jwt.userId
            console.log(uid,"uid");
             const lid = req.body.lesson_id
             
        if (!lid) return res.status(400).json({
            msg: "Please pass the lesson_Id"
        })
            const sql = `select * from test where lesson_id = ? `
            const value = [lid]
            db.query(sql,value,(err,result)=>{
                console.log(err,"err");
                console.log(result,"result");
                if(err){
                    res.status(400).json({
                        status:false,
                        data:[],
                        msg:"something went wrong"
                    })
                }else{
                    return res.status(200).json({
                        status:true,
                      data:result,
                      msg:"this is quiz"
                    })
                }

            })
        
    } catch (error) {
        console.log(error);
    }
}



// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//

const GetQuiz = async(req,res,next)=>{
    try {
        const uid =  res.locals.jwt.userId
        console.log(uid);
        const sql = ` select question1, anwser1, anwser2, anwser3, right_anwser from test join quiz_list on test.id = quiz_list.quiz_id `

        const value = [uid]
        db.query(sql,value,(err,result1)=>{
            console.log(result1,"result1");
            if (err) {
                res.status(400).json({
                    status:false,
                    data:[],
                    msg:"something went wrong !"
                })
            }else{
                return res.status(200).json({
                    status:true,
                    data:result1,
                    msg:"this is a question"
                })
                
            }
        })

    } catch (error) {
        console.log(error);
    }
}




// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//




const checkanwser = async(req,res,next)=>{
 try {
    const uid = res.locals.jwt.userId
    console.log(uid,"uid");

    
    const id = req.body.id

    if(!id) return res.status(400).json({
        msg: "Please pass tha correct id "
    })

    const Anwser = req.body.right_anwser

    if (!Anwser) return res.status(400).json({
        msg: "Please pass the Anwser"
    })        
  

    const sql = `select * from quiz_list where id = ? AND right_anwser = ? `
    const value = [id,Anwser]
     
    db.query(sql,value,(err,result2)=>{
        console.log(err,"err");
        console.log(result2,"result2"); 
        if(err) {
            res.status(400).send("something went wrong")
        }
        if(!result2.length > 0){
            res.status(400).json({
                status:false,
                data:[],
                msg:" this is incorrect awnser "
            })
        }else{
        return res.status(200).json({
                status:true,
                data:result2,
                msg:" this is correct anwser"
            })
        }
    })
    
 } catch (error) {
   console.log(error);    
 }
}




module.exports =  {GetTest,GetQuiz,checkanwser}