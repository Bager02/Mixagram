import { Router } from "express";
import { updateProfile, updateProfilePicture } from "../controllers/ProfileControllers.js";
import { uploadProfilePfp } from "../middleware/multer.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.patch("/me", requireAuth, updateProfile);
router.patch("/profile-picture", requireAuth, uploadProfilePfp.single("profile_picture"), updateProfilePicture);

export default router;