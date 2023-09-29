const { result } = require("@hapi/joi/lib/base");
const axios = require("axios");
const { authData } = require("../token_jwt");

const Call_api = async(req,res, next)=>{
    try {   
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaWF0IjoxNjk1OTYxMTcwLCJleHAiOjE2OTg1NTMxNzB9.XjSMiuCSE2L52tZSTPUlpigtX48uxCxIf0ZSrpSG0Ss'
        console.log(token,"token");
        const config = {
            method: 'get',
            url: 'http://localhost:3000/api/auth/getpayment',
            headers: { 
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + `${token}`
           }
        }
    
        let Res = await axios(config)
    
        console.log(Res.request.header);
        res.send("this is list ")
    }
   
     catch (error) {
        console.log(error);
    }
}

module.exports =  {Call_api}