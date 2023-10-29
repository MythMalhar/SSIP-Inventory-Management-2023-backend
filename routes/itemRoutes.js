import { Router } from "express";
import { addItem, getItem } from "../controller/itemController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();

router
  .post("/", authMiddleware, addItem)
  .delete("/", authMiddleware)
  .get("/", authMiddleware, getItem)
  .put("/");

export default router;
