import prisma from '../prisma.js';

export const addCommentService = async (userId, postId, content) => {
    try {
        const postIdNumber = Number(postId);
        const userIdNumber = Number(userId);

        if (!content || !content.trim()) {
            throw new Error("Comment cannot be empty");
        }

        const post = await prisma.post.findUnique({
            where: { id: postIdNumber },
            select: { id: true }
        });

        if (!post) {
            throw new Error("Post not found");
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                user_id: userIdNumber,
                post_id: postIdNumber
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        profile_image: true
                    }
                }
            }
        });

        return comment;
    } catch (err) {
        console.error("addCommentService error:", err);
        throw err;
    }
};

export const getPostCommentsService = async (postId) => {
    try {
        const postIdNumber = Number(postId);

        return await prisma.comment.findMany({
            where: { post_id: postIdNumber },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        profile_image: true
                    }
                }
            },
            orderBy: { created_at: 'asc' }
        });
    } catch (err) {
        console.error("getPostCommentsService error:", err);
        throw new Error("Failed to fetch comments");
    }
};