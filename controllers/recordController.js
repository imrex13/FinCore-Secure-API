const Record = require("../models/recordModel");
const mongoose = require('mongoose');



// Get methods

exports.getRecords = async (req, res) => {
    
    try {
        
            // This is the filter section.
            const filter = { isdelete: false };

            if (req.query.type) {
                if (!['income', 'expense'].includes(req.query.type)) {
                    return res.status(400).json({ message: "Invalid type filter" });
                }
                filter.type = req.query.type;
            }
            if (req.query.category) filter.category = req.query.category.trim().toLowerCase();
            if (req.query.date) filter.date = new Date(req.query.date);
          
            
            try {
                
                let records = await Record.find(filter).select({ amount: 1, type: 1, category: 1, date: 1, notes: 1 }).sort({ date: -1 });
                
                if(!records) {res.status(404).json({message:"Records not found"})}
                const formattedRecords = records.map(record => ({
                    id: record._id,
                    amount: record.amount / 100,
                    type: record.type,
                    category: record.category,
                    date: record.date,
                    notes: record.notes
                }));
                
                return res.status(200).json({ message: "Records Found", records: formattedRecords });
            
            } catch (error) {
              return res.status(500).json({message:"DataBase Error when Retrieving Records"})    
            }
                
            }
            catch(error){
        res.status(500).json({message:"Internal server error", Error: error})
    }
}

// Post Methods
// Creating a Record
exports.createRecord = async (req, res) => {
    try {

        let { amount, type, category, date, notes } = req.body;

        amount = Math.round(amount * 100);
        category = category.trim().toLowerCase()
        console.log("jeeeeeeeeeeeeeeee",req.user);
        const record = new Record({
            amount, 
            type,
            category,
            date,
            notes,
            createdBy: req.user._id
        })
        console.log("record", record);
        try {
            
            let createdRecord = await record.save();
            return res.status(201).json({
                message: "Record Created Successfully",
                Amount: createdRecord.amount,
                type : createdRecord.type,
                category: createdRecord.category,
                date: createdRecord.date,
                notes: createdRecord.notes
            });
        } catch (error) {
            res.status(500).json({ message: "Database Error while Creating Record",Error: error });
        }
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.updateRecord = async (req, res) => {
    try {
        let { amount, type, category, date, notes } = req.body;
        const id = req.params.id;
        
        // If the ID is not a mongoose Id it will return a 400 
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid record ID" });
        }

        const record = await Record.findById(id);
        if (!record || record.isDelete === true) {
            return res.status(404).json({ message: "Record not found" });
        }

        if (amount) record.amount = Math.round(amount * 100);
        if (type) record.type = type;
        if (category) record.category = category.trim().toLowerCase();
        if (date) record.date = date;
        if (notes) record.notes = notes;
        record.updatedBy = req.user._id;

        try {

            await record.save();
            
            return res.status(200).json({
                message: "Record Updated Successfully",
                record: {
                    id: record._id,
                    amount: record.amount / 100,
                    type: record.type,
                    category: record.category,
                    date: record.date,
                    notes: record.notes
                }
            });
            
        } catch (error) {
            return res.status(500).json({ message: "Database Error while Updating Record" });
        }
    
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// (Soft)Deleting a record
exports.deleteRecord = async (req, res) => {
    try {
        const id  = req.params.id;
        try {
     
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid record ID" });
            }
        
            const updatedRecord = await Record.findOneAndUpdate({ _id: id, isDelete: false }, { $set: { isDelete: true } },{ new: true });


            if (!updatedRecord) { return res.status(404).json({ message: "Record not found or Already Deleted " }) }
            else { return res.status(200).json({ message: "Record is Deleted" }) };
        
        }
        catch (error) {
         return res.status(500).json({message:"Database Error while Deleting Record"})    
        }
    
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}