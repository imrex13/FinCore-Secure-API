const express = require('express');
const app = require('express')
const router = app.Router()
const jwtAuthorize = require("../middleware/jwtAuthorize");
const {authorizeRole} = require("../middleware/authorize");
const { recordCreation_validation, recordUpdation_validation} = require("../middleware/input_validation");
const recordController = require("../controllers/recordController");

// Get methods

// Get Record
router.get('/records/viewRecords', jwtAuthorize.verifyToken, authorizeRole('viewer', 'analyst', 'admin'), recordController.getRecords);


//Post Methods

// Create Record
router.post("/records/createRecord", jwtAuthorize.verifyToken,authorizeRole('analyst','admin'),recordCreation_validation, recordController.createRecord)


// Update record
 router.put('/records/updateRecord/:id', jwtAuthorize.verifyToken, authorizeRole('admin'), recordUpdation_validation,recordController.updateRecord);


// Delete record
router.delete('/records/deleteRecord/:id', jwtAuthorize.verifyToken, authorizeRole('admin'), recordController.deleteRecord);



module.exports = router