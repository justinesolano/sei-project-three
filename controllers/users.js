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

// * User POST comment on image route
export const addCommentToPhoto = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('Profile not found')
    const { photoId } = req.params
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