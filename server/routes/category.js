import express from 'express'
import { protect } from '../middleware/auth.js'
import {
  addCategory,
  allCategory,
  removeCategory,
  singleCategory
} from '../controllers/categoryController.js'

const router = express.Router()

router.get('/', allCategory)
router.get('/:slug', singleCategory)
router.post('/add', protect, addCategory)
router.post('/remove/:id', removeCategory, protect)

export default router
