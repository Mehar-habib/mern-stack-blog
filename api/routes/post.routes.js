import { Router } from "express";
import { verifyUserToken } from "../middlewares/verifyUser.js";
import { createAdminPost, getPosts } from "../controllers/post.controller.js";

const router = Router();

router.post("/create", verifyUserToken, createAdminPost);
router.get("/get-posts", getPosts);

export default router;
