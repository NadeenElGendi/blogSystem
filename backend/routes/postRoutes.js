import { Router } from "express";
import auth from "../middlewares/auth.js";
import {upload} from "../config/cloudinary.js"

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} from "../controllers/postController.js";

const router = Router();

// Routes
router.get("/", getPosts);
router.get("/:id", getPostById);

// ✅ لرفع صورة واحدة في حقل "image"
router.post("/", auth, upload.single("image"), createPost);

// ✅ ممكن تضيف upload برضو للتحديث لو حابب رفع صورة جديدة
router.put("/:id", auth, upload.single("image"), updatePost);

router.delete("/:id", auth, deletePost);

export default router;
