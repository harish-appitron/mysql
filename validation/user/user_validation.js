const {signUpSchema,loginschema ,password_validation, payment_validation} = require("./user_schema");



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

    const addChangePassword =  async(req,res,next)=>{
        const value = await password_validation.validate(req.body);
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



    //  const payment = async(req,res,next)=>{
    //     const value = await payment_validation.validate(req.body);
    //     if(value.error){
    //         return res.json({
    //             success: 0,
    //             message: value.error.details[0].message
    //         })
    //     }
    //  }
    module.exports ={addLoginValidate, addUserValidate , addChangePassword}