import prisma from '../prisma.js';

export const updateUserProfileService = async (userId, data) => {
    try {
        const { username, bio } = data;

        if (!username && bio === undefined) {
            throw new Error("No data provided to update");
        }

        return await prisma.user.update({
            where: { id: Number(userId) },
            data: {
                ...(username && { username }),
                ...(bio !== undefined && { bio })
            },
            select: {
                id: true,
                username: true,
                bio: true,
                profile_image: true
            }
        });

    } catch (err) {
        console.error(err);

        if (err.code === "P2002") {
            throw new Error("Username already taken");
        }

        throw new Error("Failed to update profile");
    }
};

export const updateUserPfpService = async (userId, file) => {
    if (!file) throw new Error("Profile picture is required");

    try {
        const updatedUser = await prisma.user.update({
            where: { id: Number(userId) },
            data: {
                profile_image: `/uploads/profile-pictures/${file.filename}`
            },
            select: {
                id: true,
                username: true,
                bio: true,
                profile_image: true
            }
        });

        return updatedUser;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to update profile picture");
    }
};