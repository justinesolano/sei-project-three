import express from 'express'
import { addRatingToDestination, getAllDestinations, showDestination } from '../controllers/destinations.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { getUserProfiles, getUserProfile, addPhotoToProfile, addCommentToPhoto, addLikeToPhoto, addToMyList, deletePhotoFromProfile, deleteCommentFromPhoto, deleteLikeFromPhoto } from '../controllers/users.js'
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
  // .get(getUserPhotos) ///

router.route('/profiles/:id/myList')
  .post(secureRoute, addToMyList)

router.route('/profiles/:id/photos/:photoId')
  .post(secureRoute, addCommentToPhoto)
  .delete(secureRoute, deletePhotoFromProfile)

router.route('/profiles/:id/photos/:photoId/likes')
  .post(secureRoute, addLikeToPhoto)

router.route('/profiles/:id/photos/:photoId/:commentId')
  .delete(secureRoute, deleteCommentFromPhoto)

router.route('/profiles/:id/photos/:photoId/likes/:likeId')
  .delete(secureRoute, deleteLikeFromPhoto)

  
export default router