import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  fetchAllOrders,
  updateAllOrders,
  updateBulkOrder,
  updateSingleOrder,
} from "../controller/orderController.js";

const router = Router();

router
  .post("/", authMiddleware, createOrder)
  .get("/", authMiddleware, fetchAllOrders)
  .put("/", authMiddleware, updateAllOrders)
  .put("/:bulkOrderId", authMiddleware, updateBulkOrder)
  .put("/:bulkOrderId/:orderId", authMiddleware, updateSingleOrder);

export default router;
