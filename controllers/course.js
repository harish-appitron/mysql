const { result }  = require("@hapi/joi/lib/base")
const db = require("../db")

const getAllCourse = async(req,res,next)=>{   
    try {
        
        const uid = res.locals.jwt.userId;
        const course_name = req.query.course_name;

         const search = `select * from course LIMIT 5`;
        //  const val = [course_name ];

         console.log("search", (search))

         db.query(search,(err,result)=>{
            console.log(err,"err");
            console.log(JSON.stringify(result),"result")
            if (err) {
                return res.status(400).send("something error")
              }
            const cartSql = `select course_id from add_cart where user_id = ?`
            const cartValue = [uid];


            db.query(cartSql, cartValue, (err1, userCartData)=>{
                console.log(err1,"err1")
                console.log(JSON.stringify(userCartData), "userCartData");
               if (err1) {
                 return res.status(400).send("something error")
               }
            // for (let index = 0; index < result.length; index++){ 
            //     for (let j =  0; j < userCartData.length ; j++) {
            //         console.log("result", result.id);
            //         console.log(result,"result");
            //         console.log("userCartData", userCartData.course_id);
            //         if (result[index].id == userCartData[j].course_id){

            //             console.log(result.id, userCartData.course_id);
            //             result[index].active = true;
            //             break;
            //         } else {
            //             result[index].active = false
            //         }
            //     }}
             

                   for (let index of result){
                    for(let j of userCartData){
                        console.log(j)
                        if(index.id == j.course_id){
                            index.active = true;
                            console.log(index.active,"index.active");
                            break;
                        }else{
                            index.active = false
                        }
                    }
                   }
                  
                    
                const savedsql = `select course_id from saved where user_id = ?`
                const savedvalue = [uid]

                db.query(savedsql,savedvalue,(err2,userSavedData)=>{
                    console.log(err2,"err2");
                    console.log(userSavedData,"userSavedData");
                    if (err2) {
                        return res.status(400).send("something error")
                    }
                      for (let index of result){
                        for(let k of userSavedData){
                            if(index.id == k.course_id){
                                index.active =  true;
                                console.log(index.active,"index.active");
                                break
                            }else{
                                index.active = false
                            }
                        }
                      }
                })
                
                return  res.status(200).json({
                    status:true,
                    data:result,
                    message:"this is a course"   
                }) 
            
            })

        }
            )
    } catch (error) {
        console.log(error);
    }}



// ======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//

module.exports = {getAllCourse}