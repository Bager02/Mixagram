import { addCommentService, getPostCommentsService } from "../services/CommentServices.js";

export const addComment = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { postId } = req.params;
        const { content } = req.body;

        if (!userId) {
            return res.status(401).json({ error: "Not logged in" });
        }

        if (!postId || isNaN(postId)) {
            return res.status(400).json({ error: "Invalid post id" });
        }

        const comment = await addCommentService(userId, postId, content);
        res.status(201).json(comment);

    } catch (err) {
        if (err.message === "Post not found") {
            return res.status(404).json({ error: err.message });
        }

        res.status(500).json({ error: err.message });
    }
};

export const getPostComments = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId || isNaN(postId)) {
            return res.status(400).json({ error: "Invalid post id" });
        }

        const comments = await getPostCommentsService(postId);
        res.json(comments);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};