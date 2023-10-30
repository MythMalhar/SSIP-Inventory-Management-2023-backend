import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getCurrentUser,
} from "../controller/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/users", getUsers)
  .get("/", authMiddleware, getCurrentUser);

export default router;
