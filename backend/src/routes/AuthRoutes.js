import { Router } from "express";
import { createUser } from "../controllers/AuthControllers.js";

const router = Router();

router.post("/", createUser);

export default router;
