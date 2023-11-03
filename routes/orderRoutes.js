import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  fetchAllOrders,
  updateOrder,
} from "../controller/orderController.js";

const router = Router();

router
  .post("/", authMiddleware, createOrder)
  .get("/", authMiddleware, fetchAllOrders)
  .put("/", authMiddleware, updateOrder);

export default router;
