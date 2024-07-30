import { Router } from "express";
import {
  test,
  updateUser,
  deleteAccount,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../middlewares/verifyUser.js";

const router = Router();

router.get("/test", test);
router.put("/update/:userId", verifyUserToken, updateUser);
router.delete("/delete/:userId", verifyUserToken, deleteAccount);

export default router;
