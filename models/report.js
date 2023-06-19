//report schema

const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

    created_by:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    patient_id:{
        type: String,
        required: true
    }

})

const Report = mongoose.model("report", reportSchema);

module.exports = Report;