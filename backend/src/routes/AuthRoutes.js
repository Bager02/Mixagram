import { Router } from "express";
import { register, logout } from "../controllers/AuthControllers.js";

const router = Router();

router.post("/register", register);
router.post("/logout", logout);

export default router;
