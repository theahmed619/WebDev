import express from "express";
import {
  adminLogin,
  verifyAdmin,
  myProfile
} from "../controllers/adminController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/verify", verifyAdmin);
router.get("/me", isAuth, myProfile);

export default router;