const mysql = require("mysql")
const boss = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "course_moblie_app"
});


boss.connect((err)=>{
    if(err){
     console.log(err);
    } 
    else{
        console.log("connect")
    }
})

 module.exports = boss; 