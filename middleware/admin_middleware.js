const ALLOWED_ROLES = ['analyst', 'viewer'];
 const validator = require('validator');

const validateRoleUpdate = (req, res, next) => {
    const { email, newRoleName } = req.body;

    if (!email || !newRoleName) {
        return res.status(400).json({ message: "Email and role are required" });
    }

    if (!ALLOWED_ROLES.includes(newRoleName)) {
        return res.status(400).json({ message: "Invalid role. Allowed: analyst, viewer" });
    }

    next();
};

const emailValidator = (req, res, next) => {

    let email = req.params.email;
   
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }
    next();
}

module.exports = {validateRoleUpdate,emailValidator}