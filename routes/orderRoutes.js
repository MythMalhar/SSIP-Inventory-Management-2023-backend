import { Router } from "express";
import {
  authMiddleware,
  authMiddlewareHead,
} from "../middlewares/authMiddleware.js";
import {
  createOrder,
  fetchAllOrders,
  updateOrder,
} from "../controller/orderController.js";

const router = Router();

router
  .post("/", authMiddleware, createOrder)
  .get("/", authMiddleware, fetchAllOrders)
  .put("/", authMiddlewareHead, updateOrder);

export default router;
