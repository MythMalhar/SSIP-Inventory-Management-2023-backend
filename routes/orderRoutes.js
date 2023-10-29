import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createOrder, fetchAllOrders } from "../controller/orderController.js";

const router = Router();

router
  .post("/", authMiddleware, createOrder)
  .get("/", authMiddleware, fetchAllOrders);

export default router;
