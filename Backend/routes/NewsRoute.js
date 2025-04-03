import express, {Router} from "express";
import { fetchCurrentAffairs, fetchFamousHeadlines } from "../Controllers/NewsController.js";

const router = express.Router();

router.get("/current-affairs", fetchCurrentAffairs);
router.get("/famous-headlines", fetchFamousHeadlines);

export default router;