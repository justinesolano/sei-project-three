import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import Destination from '../models/destination.js'
import showData from '../db/data/destinations.js'

const seedDatabase = async () => {
  try {
    // * Connect to database
    await mongoose.connect(dbURI, { useNewURLParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('🛫 Database has connected successfully')

    // * Clear the database
    await mongoose.connection.db.dropDatabase()
    console.log('🛩 DB Dropped')

    // * Add destinations to the database
    const destinations = await Destination.create(showData)
    console.log(`🌱 DB seeded with ${destinations.length} destinations`)

    // * Close the connection
    await mongoose.connection.close()
    console.log('DB closed')
  } catch (err) {
    console.log(err)
    await mongoose.connection.close()
    console.log('DB closed')
  }
}

seedDatabase()