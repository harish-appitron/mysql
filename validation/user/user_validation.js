const {signUpSchema,loginschema} = require("./user_schema");



  const addUserValidate = async(req,res,next)=>{
   console.log("signUpSchema", signUpSchema); 
       const value = await signUpSchema.validate(req.body);
        // console.log("value",value);
        if(value.error){
           return res.json({
                success: 0,
                massage: value.error.details[0].message
            })
        //    console.log(value.error,"err");
        }else{
            next();
        }
    
    }

        const addLoginValidate =  async(req,res,next)=>{
            const value = await loginschema.validate(req.body);
           //  console.log("value",value);
            if(value.error){
                return res.json({
                    success: 0,
                    message: value.error.details[0].message
                }) 
            }else {
            next();
        }
    }

    module.exports ={addLoginValidate, addUserValidate}