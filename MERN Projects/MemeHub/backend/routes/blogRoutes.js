import express from "express";
import {
  createBlog,
  getAllBlogs,
  deleteBlog,
  getBlogById,
  getBlogCategories,
  updateBlog,
} from "../controllers/blogController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

// Anyone can get all blogs
router.get("/all", isAuth, getAllBlogs);

router.get("/categories", isAuth, getBlogCategories);
// This is protected by your isAuth middleware
router.post("/create", isAuth, createBlog);

router.delete("/:id", isAuth, deleteBlog);

router.get("/:id", isAuth, getBlogById);

router.put('/:id', isAuth, updateBlog);

export default router;
