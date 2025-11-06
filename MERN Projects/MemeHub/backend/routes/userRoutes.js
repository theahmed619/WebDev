import express from "express";
import {
  registration, // NEW
  login,        // NEW
  googleLogin,  // NEW
  myProfile,
} from "../controllers/userController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

// --- NEW V3 USER AUTH ROUTES ---
router.post("/registration", registration);
router.post("/login", login);
router.post("/googleLogin", googleLogin);

// --- OLD V2 OTP ROUTES (REMOVED) ---
// router.post("/login", loginUser);
// router.post("/verify", verifyUser);

// --- PROTECTED PROFILE ROUTE (REMAINS THE SAME) ---
router.get("/me", isAuth, myProfile);

export default router;