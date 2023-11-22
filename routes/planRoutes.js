import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';

import { addPlan, getRecentPlan } from '../controller/planController.js';
const router = Router();

router
  .get('/', authMiddleware, getRecentPlan)
  .post('/', authMiddleware, addPlan);

export default router;
