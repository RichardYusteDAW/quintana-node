import { Router } from "express";
import { loginMiddleware } from "../middlewares/authMiddleware.js";
import { login, refreshToken } from "../controllers/authController.js";

const router = Router();

router.post('/login', [loginMiddleware], login);
router.post('/refresh-token', refreshToken);

export default router;