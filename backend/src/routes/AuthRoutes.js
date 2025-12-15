import { Router } from "express";
import { createUser } from "../controllers/AuthControllers.js";

const router = Router();

router.post("/register", createUser);

export default router;
