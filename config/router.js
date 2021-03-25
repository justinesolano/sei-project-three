import express from 'express'
import { addRatingToDestination, getAllDestinations, showDestination } from '../controllers/destinations.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { getUserProfiles, getUserProfile, addPhotoToProfile, addCommentToPhoto } from '../controllers/users.js'
import { secureRoute } from '../config/secureRoute.js'

const router = express.Router()

router.route('/destinations')
  .get(getAllDestinations)

router.route('/destinations/:id')
  .get(showDestination)

router.route('/destinations/:id/ratings')
  .post(secureRoute, addRatingToDestination)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/profiles')
  .get(getUserProfiles)

router.route('/profiles/:id')
  .get(getUserProfile)

router.route('/profiles/:id/photos')
  .post(secureRoute, addPhotoToProfile)

router.route('/profiles/:id/photos/:photoId')
  .post(secureRoute, addCommentToPhoto)

export default router