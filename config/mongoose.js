const mongoose = require("mongoose");

//setting up mongodb connection
mongoose.connect("mongodb+srv://Chandra:chandra123@chandra827.my7yoqa.mongodb.net/HospitalApi");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to Database"));

db.once("open", function(){
    console.log("Database connected");
})

module.exports = db;
