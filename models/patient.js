//patient schema


const  mongoose  = require("mongoose");

const patientSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    phone_no:{
        type: Number,
        required: true,
        unique: true
    }


},
{
    timestamps: true
})

const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;