import express from "express";
import {
  createProject,
  getAllProjects,
  deleteProject,
  getProjectById,
  getProjectCategories,
  updateProject,
  getDownloadLink,
  getProjectsByTech, // NEW
} from "../controllers/projectController.js";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js"; // NEW

const router = express.Router();

// --- PUBLIC ROUTES (Anyone can access) ---
router.get("/all", getAllProjects);
router.get("/categories", getProjectCategories);

// A new route to handle the filter
router.get("/filter", getProjectsByTech);

router.get("/:id", getProjectById);

// --- USER-ONLY ROUTES (Must be logged in) ---
router.get("/download/:projectId", isAuth, getDownloadLink);


// --- ADMIN-ONLY ROUTES (Must be logged in AND be admin) ---
router.post("/create", isAuth, isAdmin, createProject);
router.put("/:id", isAuth, isAdmin, updateProject);
router.delete("/:id", isAuth, isAdmin, deleteProject);

export default router;