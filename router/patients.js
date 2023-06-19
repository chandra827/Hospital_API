const express = require("express");
const AUTH = require("../config/jwtAuth");
const PatientController = require("../controller/PatientController");

const router = express.Router();

//all Patient routers with jwt authentication middleware
router.post("/register", AUTH.authenticationToken, PatientController.register);
router.post("/:id/create_report", AUTH.authenticationToken, PatientController.createReport);
router.get("/:id/all_reports", AUTH.authenticationToken, PatientController.showReports);
router.get("/reports/:status", AUTH.authenticationToken, PatientController.showReports_With_Status);

module.exports = router;
