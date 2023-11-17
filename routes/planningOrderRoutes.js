import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  createPlanningOrder,
  fetchAllPlanningOrders,
} from '../controller/planningOrderController.js';

const router = Router();

router
  .post('/', authMiddleware, createPlanningOrder)
  .get('/', authMiddleware, fetchAllPlanningOrders);

export default router;
