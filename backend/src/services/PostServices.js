import prisma from '../prisma.js';

export const fetchPostsService = async () => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { created_at: "desc" },
            include: { user: true }
        });

        return posts;

    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch posts");
    }
};

export const fetchPostsFromUserService = async (userId) => {
    try {
        const posts = await prisma.post.findMany({
            where: { user_id: Number(userId) },
            orderBy: { created_at: 'desc' }, 
            select: {
                id: true,
                title: true,
                description: true,
                post_image_url: true,
                likes: true,
                created_at: true
            }
        });

        return posts;

    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch posts");
    }
};

export const createPostService = async (userId, file, body) => {
    if (!file) throw new Error("Image is required");

    const { title, description } = body;

    const postData = {
        title,
        description,
        post_image_url: `/uploads/posts/${file.filename}`,
        user: {
            connect: { id: userId }
        }
    };

    return prisma.post.create({
        data: postData
    });
};

export const deletePostService = async (userId, postId) => {
    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(postId) },
            select: {
                id: true,
                user_id: true,
                post_image_url: true
            }
        });

        if (!post) {
            throw new Error("Post not found");
        }

        if (post.user_id !== Number(userId)) {
            throw new Error("Unauthorized");
        }

        await prisma.post.delete({
            where: { id: Number(postId) }
        });

        return post;

    } catch (err) {
        console.error(err);
        throw new Error("Failed to delete post");
    }
};