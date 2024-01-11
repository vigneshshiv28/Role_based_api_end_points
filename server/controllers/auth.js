const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });

const signUp = async (req, res) => {
    const { email, phoneNumber, firstName,lastName, profileImage, password, role } = req.body;

    if(!email && !phoneNumber){
        return res.status(400).json({ message: "Email or phone number is required" });
    }

    try {
        
        const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).json({ message: "Account already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            phoneNumber,
            firstName,
            lastName,
            profileImage,
            password: hashedPassword,
            role,
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

const login = async (req, res, next) => {
    const { email, phoneNumber, password } = req.body;
    
    console.log(req.body);

    if(!email && !phoneNumber){
        return res.status(400).json({ message: "Email or phone number is required" });
    }

    

    try {
        const user = await User.findOne({ $or: [{ email }, { phoneNumber }] });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
};

module.exports = { signUp, login };
