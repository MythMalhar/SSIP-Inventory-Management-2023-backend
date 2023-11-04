import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getCurrentUser,
  newPassword,
} from "../controller/userController.js";
import {
  authMiddleware,
  authMiddlewareAdmin,
} from "../middlewares/authMiddleware.js";

const router = Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/users", authMiddleware, getUsers)
  .post("/password", authMiddlewareAdmin, newPassword)
  .get("/", authMiddleware, getCurrentUser);

export default router;
