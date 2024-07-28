import { Router } from "express";
import { signIn, signUp, googleAuth } from "../controllers/auth.controller.js";

const router = Router();
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", googleAuth);

export default router;
