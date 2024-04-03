import express from 'express'
import { protect } from '../middleware/auth.js'
import {
  addProducts,
  allProducts,
  editProducts,
  productId,
  removeProducts,
  searchProduct
} from '../controllers/product.js'

const router = express.Router()

router.get('/', allProducts)
router.get('/:id', productId)
router.post('/add', protect, addProducts)
router.post('/remove/:id', protect, removeProducts)
router.put('/edit/:id', protect, editProducts)
router.get('/search/:title', searchProduct)

export default router
