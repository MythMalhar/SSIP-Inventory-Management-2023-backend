import { Router } from 'express';
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from '../controller/itemController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = Router();

router
  .post('/', authMiddleware, addItem)
  .post('/getitems', authMiddleware, getItems)
  .put('/:itemId', authMiddleware, updateItem)
  .delete('/:itemId', authMiddleware, deleteItem);

export default router;
