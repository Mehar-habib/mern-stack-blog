import { Router } from "express";
import { verifyUserToken } from "../middlewares/verifyUser.js";
import {
  createComment,
  getPostComments,
  likeComment,
  editComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.post("/create", verifyUserToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.patch("/likeComment/:commentId", verifyUserToken, likeComment);
router.patch("/editComment/:commentId", verifyUserToken, editComment);

export default router;
