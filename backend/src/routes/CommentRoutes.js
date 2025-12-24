import express from 'express';
import { addComment, getPostComments } from '../controllers/CommentControllers.js';
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/:postId/comments', requireAuth, addComment);
router.get('/:postId/comments', requireAuth, getPostComments);

export default router;