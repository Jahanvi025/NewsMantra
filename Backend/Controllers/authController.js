import UserModel from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
      
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists", success: false });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new UserModel({ username, email, password: hashedPassword });

        const data = await userModel.save();

        res.status(201).json({ message: "User created successfully", success: true , data : data});
    } catch (error) {
        console.error("Error in registration:", error); // Log error
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        //console.log("🚀 login route hit with body:", req.body);

        // Check user exists
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(403).json({ message: "Auth failed email or password is wrong", success: false });
        }

        const isPassCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPassCorrect) {
            return res.status(403).json({ message: "Auth failed email or password is wrong",success: false});
        }

        //jwt token
        const token = jwt.sign({email: existingUser.email, _id: existingUser._id}, process.env.SECRET_JWT, {expiresIn: '24h'});
        
        res.status(200).json({ message: "User Login successfully", success: true, token, email, username: existingUser.username });
    } catch (error) {
        console.error("Error in registration:", error); // Log error
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export { register, login };
