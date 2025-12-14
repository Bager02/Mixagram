import prisma from "../prisma.js";
import bcrypt from "bcrypt";

export const createUserService = async (data) => {
  if (!/[A-Z]/.test(data.password) || !/[0-9]/.test(data.password)) {
    throw new Error("Password must contain at least one capital letter and one number.");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username: data.username },
        { email: data.email },
      ],
    },
  });     

  if (existingUser) {
    if (existingUser.username === data.username) {
      throw new Error("Username already used.");
    }
    if (existingUser.email === data.email) {
      throw new Error("Email already used.");
    }
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      profile_image: data.profile_image,
      bio: data.bio,
    },
  });
};