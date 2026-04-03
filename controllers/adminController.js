const User = require('../models/userModel');
const Role = require('../models/roleModel');
// controllers/adminController.js
const User = require('../models/userModel');
const Role = require('../models/roleModel');

exports.updateUserRole = async (req, res) => {
    try {
        const { email, newRoleName } = req.body;

        // 1. Find the Role ID for the name provided (e.g., 'analyst')
        const roleDoc = await Role.findOne({ name: newRoleName.toLowerCase() });
        
        if (!roleDoc) {
            return res.status(404).json({ message: "That role does not exist in our system." });
        }

        // 2. Update the User's role ID (The "Link")
        const updatedUser = await User.findOneAndUpdate(
            { email: String(email) }, // Prevent NoSQL injection with casting
            { role: roleDoc._id },    // We swap the ID here
            { new: true }             // Returns the updated document
        ).populate('role');           // Show the new role in the response

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // 3. Simple, non-repetitive Success Log Will change to Proper Log 
        console.log(`[AUDIT] User ${email} role updated to ${newRoleName}`);

        res.status(200).json({
            message: "User role updated successfully",
            user: {
                email: updatedUser.email,
                newRole: updatedUser.role.name
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
