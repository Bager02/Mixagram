import { fetchPostsService, fetchPostsFromUserService, createPostService } from "../services/PostServices.js";

const mapImageUrl = (req, url, fallback = null) => {
    if (!url) return fallback;
    return url.startsWith('http') ? url : `${req.protocol}://${req.get('host')}${url}`;
};

export const fetchPosts = async (req, res) => {
    try {
        const posts = await fetchPostsService();

        const mappedPosts = posts.map(post => ({
            ...post,
            post_image_url: mapImageUrl(req, post.post_image_url),
            user: {
                ...post.user,
                profile_image: mapImageUrl(req, post.user.profile_image, '/default-avatar.jpg')
            }
        }));

        res.json(mappedPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

export const fetchPostsFromUser = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Not logged in' });
        }

        const posts = await fetchPostsFromUserService(req.session.userId);

        const mappedPosts = posts.map(post => ({
            ...post,
            post_image_url: mapImageUrl(req, post.post_image_url)
        }));

        res.json(mappedPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

export const createPost = async (req, res) => {
    try {
        const post = await createPostService(req.session.userId, req.file, req.body);
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message || 'Failed to create post' });
    }
};
