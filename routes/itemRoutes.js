import { Router } from "express";
import { addItem } from "../controller/itemController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/", authMiddleware, addItem);

export default router;
