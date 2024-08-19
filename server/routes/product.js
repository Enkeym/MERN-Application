import express from 'express'
import { protect } from '../middleware/auth.js'
import {
  addProducts,
  allProducts,
  editProducts,
  myProducts,
  productId,
  removeProducts
} from '../controllers/productController.js'

const router = express.Router()

router.get('/', allProducts)
router.get('/:id', productId)
router.get('/my/:userId', protect, myProducts)
router.post('/add', protect, addProducts)
router.post('/remove/:id', protect, removeProducts)
router.put('/edit/:id', protect, editProducts)

export default router
