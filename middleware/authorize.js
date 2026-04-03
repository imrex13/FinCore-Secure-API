const User = require('../models/userModel');


const rolePermissions = {
    viewer:  ["read"],
    analyst: ["read", "summary"],
    admin:   ["read", "write", "delete", "manage_users"]
};

const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
module.exports = authorizeRole;
