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

export const createPostService = async (data) => {
    return prisma.post.create({
        data,
    });
}

