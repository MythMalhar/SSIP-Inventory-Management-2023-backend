import { Router } from "express";
import { addItem, getItems } from "../controller/itemController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/", authMiddleware, addItem).get("/", authMiddleware, getItems);

export default router;
