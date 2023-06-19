const Patient = require("../models/patient");
const Report = require("../models/report");


//registering the patient
module.exports.register = function(req, res){

    Patient.findOne({phone_no: req.body.phone}, function(err, patient){
        if(err){
            return res.json({"msg":err});
        }
        if(!patient){
            Patient.create(
                {
                phone_no: req.body.phone,
                name: req.body.name
                },
             function(err, patient){
                if(err){
                    return res.json({"msg": "Error in creating patient"});
                }
                return res.status(200).json({"msg": "Patient Created"});

            })
        }
        else{
            return res.status(200).json({"msg":"Patient already exist"});
        }
    })

}


//function to create report and store it in DB
module.exports.createReport = function(req, res){

    Report.create(
        {
            created_by: req.body.created_by,
            status: req.body.status,
            date: req.body.date,
            patient_id: req.params.id
        }, 
        
        function(err, report){
            if(err){
                return res.json({"msg":`Error in creating report ${err}`})
            }
            else{
                return res.status(200).json(
                    {"msg":"Report created",
                        "Report": report
                    })
            }
        })


}

//function to show all report of a perticular patient with its ID
module.exports.showReports = async function(req, res){

    try{
        let Reports = await Report.find({patient_id: req.params.id});
        
        if(Reports.length > 0)
        {

            return res.status(200).json({Reports})
        }
        else{
            return res.status(200).json({"msg":"No Report found"})
        }
    }catch(err){
        return res.status(200).json({"ERROR":err})
    }
   


}

//function to show all report of a perticular patient with its status as a filter
module.exports.showReports_With_Status = async function(req, res){

    try{

        let Reports =await Report.find({status: req.params.status})
        if(Reports.length > 0)
        {

            return res.status(200).json({Reports});
        }
        else{
            return res.json({"Msg":"No Report found"});
        }

    }catch(err){
        return res.json({"ERROR":err});
    }


}