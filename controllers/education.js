const boss = require ("../db")
const { authData } = require("../token_jwt/index");
const bcrypt = require("bcryptjs")

const salt = 10;

const postApi = async(req,res,next)=>{

let name = req.body.name
let email = req.body.email
const emailcheck = `select * from login_profile where email = ?`
const value = [email]
boss.query(emailcheck,value,(error,result)=>{
    if (error) error;                           
    // res.send(result);
    if(result.length > 0){ 
        return res.status(400).json({
            status: false,
            data: null,
            message: "email is duplicate"
        })
    }else {

        bcrypt.hash(req.body.password,salt,(err,hash)=>{
            if(err){
                console.log(err);
            }
            let sql = `insert into login_profile (name, email, password) VALUES ("${name}","${email}","${hash}")`
            boss.query(sql, (err,result)=>{
                if(err){
                    res.status(500).send({massage:"somthing error"})    
                }else{
                    let token = authData(result.inserId);
                    res.json({
                        status:true,
                        token,
                        data: null,
                        message: "Success"
                    })    
                }
            })
    
        });

    }})}


// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//


const loginApi = async(req,res,next)=>{
    let email = req.body.email
    let password = req.body.password
    let logincheck = `select * from login_profile where email = ?`;
    let value = [email,password]
    boss.query(logincheck,value,(error,result,)=>{
        if (error) {
            console.log(error);
            return res.status(400).send({
              msg: error
            });
          }
          if (!result.length) {
            return res.status(401).send({
              msg: 'Email or password is incorrect!'
            });
          }
          var hash = req.body.password
          bcrypt.compare(req.body.password,result[0].password,(err, isMatch)=>{
            if(err){
                res.status(500).send({massage:"somthing error"})    
            }
            if (isMatch){
                const token = authData(result.inserId);
                 res.json({
                    status:true,
                    token,
                    data: null,
                    message: "Successfull login"
                })    
            } else {
                return res.json({
                    status:true,
                    data: null,
                    message: "Password not match"
                })    
            }
          })
    })
}


module.exports = {postApi,loginApi}