import { Router } from "express";
import {
  test,
  updateUser,
  deleteAccount,
  signOutAccount,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../middlewares/verifyUser.js";

const router = Router();

router.get("/test", test);
router.put("/update/:userId", verifyUserToken, updateUser);
router.delete("/delete/:userId", verifyUserToken, deleteAccount);
router.post("/signout", signOutAccount);

export default router;
