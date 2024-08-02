import { Router } from "express";
import { verifyUserToken } from "../middlewares/verifyUser.js";
import { createComment } from "../controllers/comment.controller.js";

const router = Router();

router.post("/create", verifyUserToken, createComment);

export default router;
