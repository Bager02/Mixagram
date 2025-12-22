import express from 'express';
import { likePost, getLikedPosts } from '../controllers/LikeControllers.js';
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/:postId/like', requireAuth, likePost);
router.get('/me/liked-posts', requireAuth, getLikedPosts);

export default router;