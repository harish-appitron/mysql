const express = require("express")
const jwt = require("jsonwebtoken")
const secretkey = "secretkey"

const authData = ((uid)=>{
    
    let token = jwt.sign({userId: uid},secretkey, {
        expiresIn: '30s'
    })
   // console.log("token", token);
    return token;
})

// const verifyToken = (req, res) => {
//     jwt.verify(req.token, secretkey,(err, authData) => {
//         console.log(err);
//         console.log(authData, "authData");
//         if (err) {
//             res.send({
//                 result: "invalid tokens"
//             })
//         } else {
//             res.json({
//                 massage: "profile sccused",
//                 authData
//             })
//         }
//     })}


// function verifyToken(req, res, next) {
//     const BearerHeader = req.headers['authorization']
//     console.log(BearerHeader);
//     if (typeof BearerHeader !== 'undefined') {
//         const bearer = BearerHeader.split(" ")
//         const token = bearer[1]
//         req.token = token
//         next();
//     } else {
//         res.send({
//             result: "invalid token"
//         })
//     }
// }

module.exports = {authData,verifyToken}