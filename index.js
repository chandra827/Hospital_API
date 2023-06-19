const express = require("express");
const db = require("./config/mongoose");


const port = 8000;

const app = express();


//use the body
app.use(express.urlencoded({extended:true}));


app.use("/", require("./router/index.js"));

app.listen(port, function(err){

    if(err){
        console.log("Error in starting the server", err)
        return;
    }

    return console.log("Server is up and running : http://localhost:8000");

})
