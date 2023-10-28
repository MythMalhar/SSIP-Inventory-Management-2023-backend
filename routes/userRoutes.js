import { Router } from "express";
import { registerUser, loginUser } from "../controller/userController.js";

const router = Router();

router.post("/register", registerUser).post("/login", loginUser);

export default router;
