import express, { Router } from "express";
import { loginValidation, registerValidation } from "../Middlewares/AuthValidation.js";
import { register, login, googleLogin } from "../Controllers/authController.js";


const router = express.Router();

router.post('/login',loginValidation, login);

router.post('/register', registerValidation, register);
router.get('/google', googleLogin )
export default router;