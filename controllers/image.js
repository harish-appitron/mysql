const multer = require("multer")
const db = require("../db");

const fileStroage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, "./images");
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + "--" + file.originalname);
    }
})
//hey

const upload = multer({storage: fileStroage})

const upload_profile = async(req,res,next)=>{
    try { 
        console.log(req.file.path);
        let id = res.locals.jwt.userId
        let image = req.file.path
        const sql = `update login_profile SET image = ? where id = ?`
        const value =[image,id]
        db.query(sql,value,(err,result)=>{
            if(err){
                res.status(400).send("Not upload image")
            }if(result.affectedRows >0){
                return res.status(200).json({
                    status:true,
                    data:[],
                    msg:"image upload successfull"
                })
            }
        }) 
    } catch(error){
     console.log(error);   
    }
}

module.exports = {upload,upload_profile}