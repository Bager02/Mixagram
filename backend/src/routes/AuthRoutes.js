import { Router } from "express";
import { register, logout, login, deleteUser, me } from "../controllers/AuthControllers.js";

const router = Router();

router.post("/register", register);
router.delete("/me", deleteUser);
router.post("/logout", logout);
router.post("/login", login);
router.get("/me", me);

export default router;
