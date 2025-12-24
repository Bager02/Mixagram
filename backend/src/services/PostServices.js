import prisma from '../prisma.js';

export const fetchPostsService = async (currentUserId) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { created_at: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        profile_image: true
                    }
                },
                likes: {
                    select: { user_id: true }
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }
            }
        });

        return posts.map(post => ({
            id: post.id,
            title: post.title,
            description: post.description,
            post_image_url: post.post_image_url,
            created_at: post.created_at,
            user: post.user,
            likesCount: post._count.likes,
            commentsCount: post._count.comments,
            isLiked: currentUserId
                ? post.likes.some(l => l.user_id === Number(currentUserId))
                : false
        }));

    } catch (err) {
        console.error("fetchPostsService error:", err);
        throw err;
    }
};

export const fetchPostsFromUserService = async (currentUserId) => {
    try {
        const posts = await prisma.post.findMany({
            where: { user_id: Number(currentUserId) },
            orderBy: { created_at: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        profile_image: true
                    }
                },
                likes: {
                    select: { user_id: true }
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }
            }
        });

        return posts.map(post => ({
            id: post.id,
            title: post.title,
            description: post.description,
            post_image_url: post.post_image_url,
            created_at: post.created_at,
            user: post.user,
            likesCount: post._count.likes,
            commentsCount: post._count.comments,
            isLiked: currentUserId
                ? post.likes.some(l => l.user_id === Number(currentUserId))
                : false
        }));

    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch posts");
    }
};

export const createPostService = async (userId, file, body) => {
    try {
        if (!file) {
            throw new Error("Image is required");
        }

        const { title, description } = body;

        return await prisma.post.create({
            data: {
                title,
                description,
                post_image_url: `/uploads/posts/${file.filename}`,
                user: {
                    connect: { id: Number(userId) }
                }
            }
        });

    } catch (err) {
        console.error("createPostService error:", err);
        throw err;
    }
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