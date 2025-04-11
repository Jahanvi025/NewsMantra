import UserModel from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import {oauth2client} from "../utils/google.Config.js"

dotenv.config();

const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "Email already exists", success: false });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ username, email, password: hashedPassword });
      const savedUser = await newUser.save();
  
      res.status(201).json({
        message: "User registered successfully",
        success: true,
        data: savedUser,
      });
    } catch (error) {
      console.error("Error in registration:", error);
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };
  
  // LOGIN
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
        return res
          .status(403)
          .json({ message: "Auth failed: email or password incorrect", success: false });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordCorrect) {
        return res
          .status(403)
          .json({ message: "Auth failed: email or password incorrect", success: false });
      }
  
      const token = jwt.sign(
        { email: existingUser.email, _id: existingUser._id },
        process.env.SECRET_JWT,
        { expiresIn: "24h" }
      );
  
      res.status(200).json({
        message: "Login successful",
        success: true,
        token,
        user: {
          email: existingUser.email,
          username: existingUser.username,
          _id: existingUser._id,
        },
      });
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };
  
  // GOOGLE LOGIN
  const googleLogin = async (req, res) => {
    try {
      const { code } = req.query;
  
      const { tokens } = await oauth2client.getToken(code);
      oauth2client.setCredentials(tokens);
  
      const googleUser = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
      );
  
      const { email, name } = googleUser.data;
  
      if (!email) {
        return res.status(400).json({ message: "Google account email not found", success: false });
      }
  
      let user = await UserModel.findOne({ email });
  
      if (!user) {
        user = await UserModel.create({ email, username: name });
      }
  
      const token = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.SECRET_JWT,
        { expiresIn: "24h" }
      );
  
      res.status(200).json({
        message: "Google login successful",
        success: true,
        token,
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
        },
      });
  
    } catch (error) {
      console.error("Google login error:", error);
      res.status(500).json({ message: "Google login failed", success: false });
    }
  };
  
  export { register, login, googleLogin };