import mongoose from 'mongoose'

const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  continent: { type: String, required: true },
  language: { type: String, required: true },
  currency: { type: String, required: true },
  highlights: { type: Array, required: true },
  suitableFor: { type: Array, required: true },
  tags: { type: Array, required: true },
  image: { type: String, required: true },
  ratings: [ratingSchema],
})

// * Average Rating
destinationSchema
  .virtual('avgRating')
  .get(function() {
    if (!this.ratings.length) return 'Not yet rated'
    const sum = this.ratings.reduce((acc, curr) => {
      return acc + curr.rating
    }, 0)
    return sum / this.ratings.length
  })

destinationSchema.set('toJSON', { virtuals: true })

export default mongoose.model('Destination', destinationSchema)