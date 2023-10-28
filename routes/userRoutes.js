import { Router } from "express";
import {
  registerUser,
  loginUser,
  userUsers,
} from "../controller/userController.js";

const router = Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/users", userUsers);

export default router;
