import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./Config/db.js";
import authRouter from "./routes/authRouter.js";
import articleRouter from "./routes/articleRoute.js";
import newsRouter from "./routes/NewsRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://newsmantra-frontend.onrender.com"],
  credentials: true,
}));
app.use(express.json());

// ✅ Connect DB
connectDB();

// ✅ API Routes
app.use("/auth", authRouter);
app.use("/notes", articleRouter);
app.use("/api", newsRouter);

// ✅ Serve static files from dist/
app.use(express.static(path.join(__dirname, "dist")));

// ✅ Catch-all route for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
