import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { fetchPosts, createPost } from "../controllers/PostControllers.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", requireAuth, fetchPosts);
router.post("/new-post", upload.single('post_image'), requireAuth, createPost);

export default router;