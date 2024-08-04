import { Router } from "express";
import { verifyUserToken } from "../middlewares/verifyUser.js";
import {
  createComment,
  getPostComments,
} from "../controllers/comment.controller.js";

const router = Router();

router.post("/create", verifyUserToken, createComment);
router.get("/getPostComments/:postId", getPostComments);

export default router;
