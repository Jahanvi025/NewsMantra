import express, {Router} from "express";
import { currentAffairs } from "../Controllers/NewsController.js";

const router = express.Router();

router.get("/current-affairs", currentAffairs);

export default router;