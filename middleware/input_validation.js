const validator = require('validator');


const register_input_validation = async (req, res, next) => {
    const { name, email, password, confirm_password } = req.body;

    if (!name || !email || !password || !confirm_password) {
        return res.status(400).json({ message: "Kindly Provide all necessary fields" });
    }

    // To prevent Hackers from sending Arrays or Json data in these fields.
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: "Name must be a text string" });
    }
 
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" })
    };

    if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({ message: "Invalid credentials" })
    };

    if (password !== confirm_password) {
        return res.status(400).json({ message: "Password and confirm password does not match " })
    }

    next();
}

const login_input_validation = async(req, res, next) => {
    

    const { email, password } = req.body;

     if (!email || !password ) {
        return res.status(400).json({ message: "Kindly Provide all necessary fields" });
    }
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" })
    };
     if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({ message: "Password did not match" })
    };

    next();
}

const recordCreation_validation = async (req, res, next) => {
   
    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type || !category) {
         return res.status(400).json({ message: "Kindly Provide all necessary fields" });
    }
    if (typeof(amount) !== 'number') {
        return res.status(400).json({ message: "Amount must be a number" });
    }
    if (typeof(type) !== 'string') {
        return res.status(400).json({ message: "Input Input" });
    }
    if (type !== 'income' && type !== 'expense') {
        return res.status(400).json({ message: "Invalid Type" });
    }
    if (typeof(category) !== 'string') {
        return res.status(400).json({ message: "Input Input" });
    }
    if (!date || isNaN(new Date(date))) {
        return res.status(400).json({ message: "Invalid date format" });
    }
    if (notes !== undefined && typeof notes !== 'string') {
        return res.status(400).json({ message: "Notes must be text" });
    }

    next();

}

    const recordUpdation_validation = async (req, res, next) => {
    
        const { amount, type, category, date, notes } = req.body;

    if (amount !== undefined && typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount must be a number" });
        }

        if (type != undefined && type !== 'income' && type !== 'expense') {
            return res.status(400).json({ message: "Invalid Type" });
        }
        if (category !== undefined && typeof category !== 'string') {
            return res.status(400).json({ message: "Category must be a string" });
        }
        if (date !== undefined && isNaN(new Date(date))) {
            return res.status(400).json({ message: "Invalid date format" });
        }
        if (notes !== undefined && typeof notes !== 'string') {
            return res.status(400).json({ message: "Notes must be text" });
        }

        next();

}
    


module.exports = {register_input_validation,login_input_validation,recordCreation_validation,recordUpdation_validation}