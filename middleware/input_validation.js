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


module.exports = {register_input_validation,login_input_validation}