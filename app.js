const express = require("express")
const app = express();  
const bodyparser = require("body-parser")


app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

const apiRoute = require('./routes/index');

app.use("/api", apiRoute);

app.listen(3000,()=>{
    console.log("listing of port 3000");
})   