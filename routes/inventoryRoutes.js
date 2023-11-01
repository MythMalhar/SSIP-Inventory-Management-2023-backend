import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addInventory,
  getInventory,
  updateInventory,
  deleteInventory
} from "../controller/inventoryController.js";

const router = Router();

router
  .post("/", authMiddleware, addInventory)
  .get("/", authMiddleware, getInventory)
  .put("/", authMiddleware, updateInventory)
  .delete("/",authMiddleware,deleteInventory);
export default router;
