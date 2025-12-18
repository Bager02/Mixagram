import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { fetchPosts, fetchPostsFromUser, createPost } from "../controllers/PostControllers.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", requireAuth, fetchPosts);
router.get("/user-posts", requireAuth, fetchPostsFromUser);
router.post("/new-post", upload.single('file'), requireAuth, createPost);

export default router;