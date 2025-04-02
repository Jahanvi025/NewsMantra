import express from "express";
import { getArticles, createArticle, updateArticle, deleteArticle } from "../Controllers/articleController.js";
import authMiddleware from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/all", getArticles); // Public Route
router.post("/create", authMiddleware, createArticle); // Protected Route
router.put("/update/:id", authMiddleware, updateArticle); // Protected Route
router.delete("/delete/:id", authMiddleware, deleteArticle); // Protected Route

export default router;
