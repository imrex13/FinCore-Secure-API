const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    "amount": { type: Number, required: true },
    "type": { type: String, enum: ["income", "expense"],required:true },
    "category": { type: String, required: true },
    "date": { type: Date, required: true },
    "notes": { type: String, default: "" },
    "createdBy": { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    "updatedBy": { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    "isDelete":{type: Boolean,default: false}
}, { timestamps: true } // We use timestamp to know when the role is created and when it is last updated
) 

const recordModel = mongoose.model("Record", recordSchema);

module.exports = recordModel;