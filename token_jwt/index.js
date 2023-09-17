const express = require("express")
const jwt = require("jsonwebtoken")
const secretkey = "secretkey"

const authData = ((uid)=>{
    
    let token = jwt.sign({userId: uid},secretkey, {
        expiresIn: '30d'
    })
   // console.log("token", token);
    return token;
})

const verifyToken = (req, res, next) => {
    const BearerHeader = req.headers['authorization'];
    const token = BearerHeader?.split(" ")[1];

    if (!token || token === null || token === undefined) return res.status(400).json({status: false, data: null, message: "Unauthorized Access!"});


jwt.verify(token, secretkey,(err, authData) => {
        console.log(err);
        console.log(authData, "authData");
        if (err) {
            res.send({
                result: "invalid tokens"
            })
        } 
        res.locals.jwt = authData;
        next();
    })}



module.exports = {authData,verifyToken}