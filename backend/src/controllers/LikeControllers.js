import { toggleLikeService, getLikedPostsService  } from "../services/LikeServices.js";

export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ error: "Not logged in" });
        }

        if (!postId || isNaN(postId)) {
            return res.status(400).json({ error: "Invalid post id" });
        }

        const result = await toggleLikeService(userId, postId);

        res.status(200).json(result);

    } catch (err) {
        if (err.message === "Post not found") {
            return res.status(404).json({ error: err.message });
        }

        console.error("toggleLike controller error:", err);
        res.status(500).json({ error: "Failed to toggle like" });
    }
};

export const getLikedPosts = async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) return res.status(401).json({ error: 'Not logged in' });

        const likedPosts = await getLikedPostsService(userId);
        res.json(likedPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};