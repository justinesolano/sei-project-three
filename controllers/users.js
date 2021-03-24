import User from '../models/user.js'

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error('Your passport is not valid, continue to immigration!')
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}