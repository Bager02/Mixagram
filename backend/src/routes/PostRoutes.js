import { Router } from "express";
import { uploadPost } from "../middleware/multer.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { 
    fetchPosts, 
    fetchPostsFromUser, 
    createPost, 
    deletePost,
    fetchFeedPostsPaginated
} from "../controllers/PostControllers.js";

const router = Router();

router.get("/", requireAuth, fetchPosts);
router.get("/user-posts", requireAuth, fetchPostsFromUser);
router.get('/feed', fetchFeedPostsPaginated);
router.post("/new-post", uploadPost.single('file'), requireAuth, createPost);
router.delete('/:postId', deletePost);

export default router;