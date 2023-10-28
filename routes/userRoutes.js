import { Router } from "express";
import {
  registerUser,
  loginUser,
  userUsers,
  getCurrentUser,
} from "../controller/userController.js";

const router = Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/users", userUsers)
  .get("/", getCurrentUser);

export default router;
