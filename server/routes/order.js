import express from 'express'
import {
  addOrder,
  allOrders,
  orderId,
  removeOrder
} from '../controllers/order.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/', protect, allOrders)
router.get('/:id', protect, orderId)
router.post('/', protect, addOrder)
router.post('/:id', protect, removeOrder)

export default router
