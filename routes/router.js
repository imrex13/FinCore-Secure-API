const express = require('express');
const app = require('express')
const router = app.Router()
const jwtAuthorize = require("../middleware/jwtAuthorize");
const roleAuthorisation = require("../middleware/authorize");


router.get('/records', verifyToken, authorizeRole('viewer', 'analyst', 'admin'), getRecords);


module.exports = router