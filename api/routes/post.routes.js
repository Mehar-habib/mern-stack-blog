import { Router } from "express";
import { verifyUserToken } from "../middlewares/verifyUser.js";
import {
  createAdminPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.post("/create", verifyUserToken, createAdminPost);
router.get("/get-posts", getPosts);
router.delete("/delete-post/:postId/:userId", verifyUserToken, deletePost);
router.patch("/update-post/:postId/:userId", verifyUserToken, updatePost);

export default router;
