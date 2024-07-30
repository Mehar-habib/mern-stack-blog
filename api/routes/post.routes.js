import { Router } from "express";
import { verifyUserToken } from "../middlewares/verifyUser.js";
import { createAdminPost } from "../controllers/post.controller.js";

const router = Router();

router.post("/create", verifyUserToken, createAdminPost);

export default router;
