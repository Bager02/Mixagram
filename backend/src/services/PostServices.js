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

export const createPostService = async (data) => {
    return prisma.post.create({
        data,
    });
}

