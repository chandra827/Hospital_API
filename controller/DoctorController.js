require("dotenv").config();

const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");


//getting user's data and storing in DB
module.exports.register = function(req, res){
    
    Doctor.findOne({username: req.body.username}, function(err, user){

        if(!user){
            Doctor.create(req.body, function(err, user){
                if(err){
                    return res.json({"msg": "Error in creating Doctor"});
                    
                }
                
                return res.status(200).json({"msg": "Doctor Created"});
            })
        }
        else{
            
             return res.status(200).json({"msg": "This doctor is already in database"});
        }

    })


}

//logging in the user
module.exports.login = function(req, res){

    Doctor.findOne({username: req.body.username}, function(err, Doc){
        if(err)
        {
            res.json({"msg": `Error : ${err}`})
        }
        if(!Doc || Doc.password != req.body.password) //authenticating user
        {
            res.json({"msg":"Invalid username or password"});
        }
        else{

            let token = jwt.sign({
                username: Doc.username,
                password: Doc.password
            }, process.env.SECRET_TOKEN, {expiresIn: "1h"});

            return res.json({"msg":"User logged in.", "Token":token})

        }
    })


}