const express = require('express');
const app = express();
const bcrypt = require("bcrypt")
const userModel = require("../models/userModel");
 const jwt = require('jsonwebtoken');


const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
const secretKey = process.env.JWT_SECRET;

exports.authRegister = async (req, res) => {
    
    try {

        const { name, email, password, confirm_passoword} = req.body;
        
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" })
        };
    
        const hash = await bcrypt.hash(password, saltRounds);

        const new_user = new userModel({
            name: name,
            email: email,
            password: hash
        })

        
        try {
            await new_user.save();  
            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: new_user._id,
                    name: new_user.name,
                    email: new_user.email,
                    role: new_user.role
                }
            });
            
        } catch (error) {
            return res.status(500).json({ message: "Database Error" });
        }  
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error",error: err });
    }
}


exports.authLogin = async (req, res) => {
   
    try {
        
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email, isdelete: false, isActive: true  });
        
          if (!user) {
            return res.status(401).json({ message: "Invalid credentials or Inactive account" });
        }
        
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, {
                expiresIn: '24h',
            });
            res.status(200).json({ token });


        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    }


