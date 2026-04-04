const User = require("../models/userModel");

// Need to do pagination or enforce limit like get the first 10 records
exports.getUsers = async (req, res) => {
    try {
           const filter = { isdelete: false, isActive: true, role: {$ne : 'admin'}};
            try {
                
                let  userDetails = await User.find(filter).select({ name: 1, email: 1, role: 1, createdAt: 1, updatedAt: 1 }).sort({ createdAt: -1 });
                
                if(!userDetails) {res.status(404).json({message:"Records not found"})}
                const formattedUserDetails = userDetails.map(user => ({
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }));
                
                return res.status(200).json({ message: "Records Found", records: formattedUserDetails });
            
            } catch (error) {
              return res.status(500).json({message:"DataBase Error when Retrieving Users"})    
            }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });    
    }
}


exports.updateUserRole = async (req, res) => {
    try {
        const { email, newRoleName } = req.body;


        const user = await User.findOne({ email, isActive: true, isdelete: false });
        if (!user) return res.status(404).json({ message: "User not found" });

        
        user.role = newRoleName;
        await user.save();

        return res.status(200).json({
            message: "Role updated successfully",
            user: { email: user.email, role: user.role }
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



exports.updateUserStatus = async (req, res) => {
    try {
        let email = req.params.email;
       
        try {

            const targetUser = await User.findOne({ email });
            
            if (!targetUser) return res.status(404).json({ message: "User not found" });
            
            if (targetUser.role === 'admin')  return res.status(403).json({ message: "Cannot modify admin users" });


            const deactivateUser = await User.findOneAndUpdate({
                email: email, isActive: true, isDelete: false, role: { $ne: 'admin' }}, { $set: { isActive: false } }, { new: true }
            );

            if (!deactivateUser) {
                return res.status(404).json({ message: "User not found or Already Deactivated" })
            }

            else {
                return res.status(200).json({ message: "User is Deactivated" })
            };
        
        }
        catch (error) {
         return res.status(500).json({message:"Database Error while Deactivating User"})    
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server Error" });
    }
}

exports.deleteUser = async (req, res) => {
    try {
            let email = req.params.email;
           
        try {
                
            const targetUser = await User.findOne({ email });

            if (!targetUser) return res.status(404).json({ message: "User not found" });
            if (targetUser.role === 'admin') return res.status(403).json({ message: "Cannot modify admin users" });

            const deletedUser = await User.findOneAndUpdate({
            email: email, isActive: true, isDelete: false, role: { $ne: 'admin' }}, { $set: { isDelete: true } }, { new: true }
            );


            if (!deletedUser) {
                return res.status(404).json({ message: "User not found or Already Deleted " })
            }
            else {
                return res.status(200).json({ message: "User is Deleted" })
            };
        
        }
        catch (error) {
         return res.status(500).json({message:"Database Error while Deleting User"})    
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server Error" });
    }

}