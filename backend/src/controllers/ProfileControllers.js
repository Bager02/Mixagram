import { updateUserProfileService, updateUserPfpService } from "../services/ProfileServices.js";

export const updateProfile = async (req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const updatedUser = await updateUserProfileService(userId, req.body);

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateProfilePicture = async (req, res) => {
    try {
        if (!req.session.userId) return res.status(401).json({ error: "Not logged in" });

        const updatedUser = await updateUserPfpService(req.session.userId, req.file);
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message || "Failed to update profile picture" });
    }
};