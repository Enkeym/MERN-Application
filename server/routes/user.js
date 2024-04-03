import express from 'express'
import {
  authUser,
  logoutUser,
  registerUser,
  updateUserProfile,
  userProfile,
} from '../controllers/user.js'
import {protect} from '../middleware/auth.js'

const router = express.Router()

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router
  .route('/profile', logoutUser)
  .get(protect, userProfile)
  .put(protect, updateUserProfile)

export default router
