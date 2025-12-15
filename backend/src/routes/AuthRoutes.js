import { Router } from "express";
import { register, logout, login } from "../controllers/AuthControllers.js";

const router = Router();

router.post("/register", register);
router.post("/logout", logout);
router.post("/login", login);

export default router;
