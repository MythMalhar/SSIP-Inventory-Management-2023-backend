import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  createNotification,
  getNotifications,
  updateNotifications,
  deleteNotification,
} from '../controller/notificationController.js';

const router = Router();

router
  .post('/', authMiddleware, createNotification)
  .get('/', authMiddleware, getNotifications)
  .put('/', authMiddleware, updateNotifications)
  .delete('/:notificationId', authMiddleware, deleteNotification);

export default router;
