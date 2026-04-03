const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    "name": { type: String, required: true },
    "email": { type: String, required: true, unique: true },
    "password": { type: String, required: true },
    "role": { type: String, enum: ["viewer", "analyst", "admin"], default: "viewer" },
    "isActive": { type: Boolean, default: true },
    "isdelete": {type: Boolean, default:false},
},
    { timestamps: true } // We use timestamp to know when the role is created and when it is last updated
);

const User = mongoose.model("User", userSchema);

module.exports = User;