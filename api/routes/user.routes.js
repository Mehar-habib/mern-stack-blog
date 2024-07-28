import { Router } from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = Router();

router.get("/test", test);
router.patch("/update/:userId", verifyUser, updateUser);

export default router;
