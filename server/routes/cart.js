import express from 'express'
import {
  addToCart,
  editCartQuantity,
  getCart,
  removeFromCart
} from '../controllers/cartController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect)

router.get('/', getCart)
router.post('/add', addToCart)
router.post('/remove/:productId', removeFromCart)
router.post('/edit/:productId', editCartQuantity)

export default router
