import prisma from '../prisma.js';

export const toggleLikeService = async (userId, postId) => {
    try {
        const postIdNumber = Number(postId);
        const userIdNumber = Number(userId);

        if (isNaN(postIdNumber)) {
            throw new Error("Invalid post id");
        }

        const post = await prisma.post.findUnique({
            where: { id: postIdNumber },
            select: { id: true }
        });

        if (!post) {
            throw new Error("Post not found");
        }

        const key = {
            user_id: userIdNumber,
            post_id: postIdNumber
        };

        const existingLike = await prisma.like.findUnique({
            where: { user_id_post_id: key }
        });

        if (existingLike) {
            await prisma.like.delete({
                where: { user_id_post_id: key }
            });

            return { liked: false };
        }

        await prisma.like.create({
            data: key
        });

        return { liked: true };

    } catch (err) {
        console.error("toggleLikeService error:", err);
        throw err;
    }
};

export const getLikedPostsService = async (userId) => {
    try {
        const likes = await prisma.like.findMany({
            where: { user_id: Number(userId) },
            include: {
                post: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        post_image_url: true,
                        user: {
                            select: {
                                id: true,
                                username: true,
                                profile_image: true
                            }
                        },
                        _count: { select: { likes: true } }
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        });

        return likes.map(like => ({
            ...like.post,
            likesCount: like.post._count.likes,
            isLiked: true
        }));
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch liked posts");
    }
};