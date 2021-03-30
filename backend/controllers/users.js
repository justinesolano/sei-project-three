import User from '../models/user.js'

// * Users INDEX Route
export const getUserProfiles = async (_req, res) => {
  const userProfiles = await User.find()
  return res.status(200).json(userProfiles)
}

// * User SHOW Route
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('Your passport is not valid, continue to immigration!')
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

// * User POST image route
export const addPhotoToProfile = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('Cannot find user')
    if (!user._id.equals(req.currentUser._id)) throw new Error('Unauthorized')
    const newPhoto = { ...req.body }
    user.photos.push(newPhoto)
    await user.save()
    return res.status(200).json(newPhoto)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

// * User POST myList route
export const addToMyList = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('Cannot find user')
    if (!user._id.equals(req.currentUser._id)) throw new Error('Unauthorized')
    const newMyList = { ...req.body }
    user.myList.push(newMyList)
    await user.save()
    return res.status(200).json(newMyList)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

// * User DELETE Image Route
export const deletePhotoFromProfile = async (req, res) => {
  try {
    const { id, photoId } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('Cannot find user')
    const photoToDelete = user.photos.id(photoId)
    if (!photoToDelete) throw new Error('Photo not found')
    if (!user._id.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await photoToDelete.remove()
    await user.save()
    return res.status(204).json()
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

// * User POST comment on image route
export const addCommentToPhoto = async (req, res) => {
  try {
    const { id, photoId } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('Profile not found')
    const userPhoto = user.photos.id(photoId)
    if (!userPhoto) throw new Error('Photo not found')
    const newComment = { ...req.body, owner: req.currentUser._id }
    userPhoto.comments.push(newComment)
    await user.save()
    return res.status(200).json(userPhoto)
  } catch (err) {
    console.log(err)
  }
}

// * User DELETE comment on image route
export const deleteCommentFromPhoto = async (req, res) => {
  try {
    const { id, photoId, commentId } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('Profile not found')
    const userPhoto = user.photos.id(photoId)
    if (!userPhoto) throw new Error('Photo not found')
    const userComment = userPhoto.comments.id(commentId)
    if (!userComment) throw new Error('Comment not found')
    if (!userComment.owner.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await userComment.remove()
    await user.save()
    return res.status(200).json('deleted')
  } catch (err) {
    console.log(err)
  }
}

// * User POST like on image route
export const addLikeToPhoto = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('Profile not found')
    const { photoId } = req.params
    const userPhoto = user.photos.id(photoId)
    if (!userPhoto) throw new Error('Photo not found')
    const newLike = { ...req.body, owner: req.currentUser._id }
    userPhoto.likes.push(newLike)
    await user.save()
    return res.status(200).json(userPhoto)
  } catch (err) {
    console.log(err)
  }
}

// * User DELETE like on image route
export const deleteLikeFromPhoto = async (req, res) => {
  try {
    const { id, photoId, likeId } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('Profile not found')
    const userPhoto = user.photos.id(photoId)
    if (!userPhoto) throw new Error('Photo not found')
    const userLike = userPhoto.likes.id(likeId)
    if (!userLike) throw new Error('Like not found')
    if (!userLike.owner.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await userLike.remove()
    await user.save()
    return res.status(200).json()
  } catch (err) {
    console.log(err)
  }
}