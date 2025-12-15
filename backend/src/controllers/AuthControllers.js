import { createUserService } from "../services/AuthServices.js";

export const register = async (req, res) => {
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

export const logout = async (req, res) => {
    if (!req.session)
        return res.status(200).json({ message: "No session to destroy" });

    req.session.destroy(err => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: "Failed to log out" });
        }
    })

    res.clearCookie("connect.sid", { path: "/" }); // connect.sid is the name of session cookie, and { path: "/" } is the default path where the cookie was created. this is so the right cookie gets deleted.
    res.status(200).json({ message: "Logged out successfully" });
};