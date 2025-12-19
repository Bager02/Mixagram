import { Router } from "express";
import { updateProfile } from "../controllers/ProfileControllers.js";

const router = Router();

router.patch("/me", updateProfile);

export default router;