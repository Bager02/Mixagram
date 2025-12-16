import { createUserService, loginService, getUserById } from "../services/AuthServices.js";

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

        //Here, if they appear are stored in error var, and now if an error happens 
        // this var is sent to frontend NEEDS TO CHANGE

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

    res.clearCookie("connect.sid", { path: "/" }); // connect.sid is the name of session cookie, 
    // and { path: "/" } is the default path where the cookie was created. this is so the right cookie gets deleted.
    res.status(200).json({ message: "Logged out successfully" });
};

export const login = async (req, res) => {
    try {
        const user = await loginService(req.body)

        req.session.userId = user.id;

        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

export const me = async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    
    try {
        if (!req.session.userId) {
            res.clearCookie("connect.sid");
            return res.status(401).json({ error: "Not logged in" });
        }

        const user = await getUserById(req.session.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        //the "if" above checks if the id in the session is tied to an existing user. imagine they delete the 
        //account and SOMEHOW the session doesnt end (error case), you need something to see what happened.
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}