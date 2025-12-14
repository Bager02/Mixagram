import { fetchPostsService, createPostService } from "../services/PostServices.js";

export const fetchPosts = async (req, res) => {
    try {
        const posts = await fetchPostsService();

        const mappedPosts = posts.map(post => ({
            ...post,
            post_image_url: post.post_image_url
                ? post.post_image_url.startsWith('http')
                    ? post.post_image_url
                    : `${req.protocol}://${req.get("host")}${post.post_image_url}`
                : null,
            user: {
                ...post.user,
                profile_image: post.user.profile_image
                    ? post.user.profile_image.startsWith('http')
                        ? post.user.profile_image
                        : `${req.protocol}://${req.get("host")}${post.user.profile_image}`
                    : '/default-avatar.jpg', // fallback
            },
        }));

        res.json(mappedPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, description, user_id } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const imagePath = `/uploads/posts/${req.file.filename}`;

        const postData = {
            title,
            description,
            post_image_url: imagePath,
            user: {
                connect: { id: parseInt(user_id) } // connect to existing user with id=1
            }
        };

        const post = await createPostService(postData);

        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create post' });
    }
};
