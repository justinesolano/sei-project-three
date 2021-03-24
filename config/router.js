import express from 'express'
import { getAllDestinations, showDestination } from '../controllers/destinations.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { getUserProfile } from '../controllers/users.js'
import { secureRoute } from '../config/secureRoute.js'

const router = express.Router()

router.route('/destinations')
  .get(getAllDestinations)

router.route('/destinations/:id')
  .get(showDestination)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/profile')
  .get(secureRoute, getUserProfile)

export default router