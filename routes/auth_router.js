const express = require('express');
const app = require('express')
const router = app.Router()


const auth_validation = require("../middleware/input_validation");
const auth_Controller = require("../controllers/authController");

router.post('/auth/register', auth_validation.register_input_validation, auth_Controller.authRegister);
router.post('/auth/login', auth_validation.login_input_validation, auth_Controller.authLogin);


module.exports = router