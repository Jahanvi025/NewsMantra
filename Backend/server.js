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

const allowedOrigins = [
    'http://localhost:5173',                    // ← Local dev
    'https://newsmantra-frontend.onrender.com' // ← Deployed frontend
];

app.use(cors({
<<<<<<< HEAD
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
=======
    origin: "https://newsmantra-frontend.onrender.com", 
>>>>>>> ae919e61dcb48a6baaf56c2332b0cfb1be75a31e
    credentials: true
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
