
const express = require('express');
const app = require('express')
const router = app.Router()

const {authorizeRole} = require('../middleware/authorize');
const { verifyToken } = require('../middleware/jwtAuthorize');
const adminController = require('../controllers/adminController');
const {validateRoleUpdate,emailValidator} = require("../middleware/admin_middleware")


// Get methods

// Get Users
router.get("/admin/getUsers", verifyToken,authorizeRole("admin"),adminController.getUsers);


// Post methods

// Update User Role
router.put("/admin/updateRole", verifyToken, authorizeRole('admin'), validateRoleUpdate, adminController.updateUserRole);

// Update User Status 
router.put("/admin/updateUserStatus/:email", verifyToken, authorizeRole("admin"), emailValidator, adminController.updateUserStatus);

// (Soft)Delete User
router.delete("/admin/deleteUser/:email", verifyToken, authorizeRole("admin"), emailValidator, adminController.deleteUser);

module.exports = router