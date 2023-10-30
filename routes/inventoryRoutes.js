import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addInventory, getInventory } from "../controller/inventoryController.js";

const router = Router();

router
  .post("/", authMiddleware, addInventory)
  .get("/", authMiddleware, getInventory);

export default router;
