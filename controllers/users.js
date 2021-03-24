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
    console.log('REQ CURRENT USER >>>>', req)
    console.log('HEADERS', req.currentUser._id)
    if (!user) throw new Error('Cannot find user')
    if (!user._id.equals(req.currentUser._id)) throw new Error('Unauthorized')
    // ! if id of profile is same as id of logged in user
    const newPhoto = { ...req.body }
    user.photos.push(newPhoto)
    await user.save()
    return res.status(200).json(newPhoto)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

// 