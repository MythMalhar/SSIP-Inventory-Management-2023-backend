import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  createPlanningOrder,
  deletePlanningOrder,
  fetchAllPlanningOrders,
  updatePlanningOrder,
} from '../controller/planningOrderController.js';

const router = Router();

router
  .post('/', authMiddleware, createPlanningOrder)
  .get('/', authMiddleware, fetchAllPlanningOrders)
  .put('/', authMiddleware, updatePlanningOrder)
  .delete('/:planningOrderId', authMiddleware, deletePlanningOrder);

export default router;
