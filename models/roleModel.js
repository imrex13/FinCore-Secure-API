const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // e.g., 'admin', 'viewer'
    permissions: [{ type: String }] // e.g., ['read', 'write', 'delete_user']
}, { timestamps: true } // We use timestamp to know when the role is created and when it is last updated
);

const Role = mongoose.model("Role", roleSchema);
module.exports = Role
