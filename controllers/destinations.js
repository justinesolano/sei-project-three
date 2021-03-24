import Destination from '../models/destination.js'

// * INDEX Route
export const getAllDestinations = async (_req, res) => {
  const destinations = await Destination.find()
  return res.status(200).json(destinations)
}

// * SHOW Route
export const showDestination = async (req, res) => {
  try {
    const { id } = req.params
    const destination = await Destination.findById(id)
    if (!destination) {
      throw new Error()
    }
    return res.status(200).json(destination)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'This flightpath does not exist' })
  }
}