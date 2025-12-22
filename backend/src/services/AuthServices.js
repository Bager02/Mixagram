import prisma from "../prisma.js";
import bcrypt from "bcrypt";

export const createUserService = async (data) => {
    try {
        if (!/[A-Z]/.test(data.password) || !/[0-9]/.test(data.password)) {
            throw new Error(
                "Password must contain at least one capital letter and one number."
            );
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        return await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword,
                profile_image: data.profile_image,
                bio: data.bio,
            },
        });

    } catch (err) {
        if (err.code === 'P2002') {
            if (err.meta?.target?.includes('username')) {
                throw new Error("Username already used.");
            }
            if (err.meta?.target?.includes('email')) {
                throw new Error("Email already used.");
            }
        }

        console.error("createUserService error:", err);
        throw err;
    }
};

export const loginService = async (data) => {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: data.username },
                    { email: data.email },
                ],
            },
        });

        if (!existingUser) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
            data.password,
            existingUser.password
        );

        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }

        return {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
        };

    } catch (err) {
        console.error("loginService error:", err);
        throw err;
    }
};

export const getUserById = async (id) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                username: true,
                email: true,
                profile_image: true,
                bio: true,
                _count: {
                    select: { posts: true }
                }
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            profileImage: user.profile_image,
            bio: user.bio,
            postCount: user._count.posts
        };

    } catch (err) {
        console.error("getUserById error:", err);
        throw err;
    }
};

export const deleteUserService = async (userId) => {
    try {
        const id = Number(userId);

        const existingUser = await prisma.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            throw new Error("User not found");
        }

        return await prisma.user.delete({
            where: { id },
        });

    } catch (err) {
        console.error("deleteUserService error:", err);
        throw err;
    }
};
