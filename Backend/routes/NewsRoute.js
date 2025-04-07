import express, {Router} from "express";
import { fetchCurrentAffairs, fetchFamousHeadlines, fetchNewsByCategory, } from "../Controllers/NewsController.js";

const router = express.Router();

router.get("/current-affairs", fetchCurrentAffairs);
router.get("/famous-headlines", fetchFamousHeadlines);
router.get("/news-by-category", fetchNewsByCategory);

export default router;