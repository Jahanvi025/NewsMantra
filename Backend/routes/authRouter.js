import express, { Router } from "express";
import { loginValidation, registerValidation } from "../Middlewares/AuthValidation.js";
import { register, login } from "../Controllers/authController.js";


const router = express.Router();

router.post('/login',loginValidation, login);

router.post('/register', registerValidation, register);

export default router;