import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";


const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Enable CORS for frontend communication
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

//database connection
connectDB();

// 🏠 Home route
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

// 🚀 Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
