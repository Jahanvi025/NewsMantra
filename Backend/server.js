import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import authRouter from "./routes/authRouter.js"
import articleRouter from "./routes/articleRoute.js"
import newsRouter from "./routes/NewsRoute.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://newsmantra-frontend.onrender.com", // ✅ Specific origin, not '*'
  credentials: true // ✅ Required if you're using cookies or auth headers
}));
// Middleware to parse JSON requests
app.use(express.json());

//database connection
connectDB();

// 🏠 Home route
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

app.use('/auth', authRouter);
app.use('/notes', articleRouter);
app.use("/api", newsRouter);

// 🚀 Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
