import { createUserService } from "../services/AuthServices.js";

export const createUser = async (req, res) => {
    try {
        const user = await createUserService(req.body);

        req.session.userId = user.id;

        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email
        });
    } catch (err) {
        console.error(err);

        if (
            err.message.includes("Username already used") ||
            err.message.includes("Email already used") ||
            err.message.includes("Password must contain")
        ) {
            return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: "Failed to create user" });
    }
};