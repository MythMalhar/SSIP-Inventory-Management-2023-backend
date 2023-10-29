import { Router } from "express";
import {
  registerUser,
  loginUser,
  userUsers,
  getCurrentUser,
} from "../controller/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/users", userUsers)
  .get("/", authMiddleware, getCurrentUser);

export default router;
