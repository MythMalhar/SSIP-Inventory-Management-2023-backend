import { Router } from "express";
import itemAdd  from "../controller/itemController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/add", authMiddleware, itemAdd);

export default router;
