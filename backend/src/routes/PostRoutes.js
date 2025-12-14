import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { fetchPosts, createPost } from "../controllers/PostControllers.js";

const router = Router();

router.get("/", fetchPosts);
router.post("/new-post", upload.single('post_image'), createPost);

export default router;