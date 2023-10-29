import { Router } from "express";
import { addItem, getItems } from "../controller/itemController.js";
import {
  authMiddleware,
  authMiddlewareAdmin,
} from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/", authMiddlewareAdmin, addItem).get("/", authMiddleware, getItems);

export default router;
