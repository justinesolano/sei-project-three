import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import Destination from '../models/destination.js'
import User from '../models/user.js'
import destinationData from '../db/data/destinations.js'
import userData from '../db/data/users.js'

const seedDatabase = async () => {
  try {
    // * Connect to database
    await mongoose.connect(dbURI, { useNewURLParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('🛫 Database has connected successfully')

    // * Clear the database
    await mongoose.connection.db.dropDatabase()
    console.log('🛩 DB Dropped')

    // * Add users to the database
    const users = await User.create(userData)
    console.log(`🌱 DB seeded with ${users.length} users`)

    // * Add destinations to the database
    const destinations = await Destination.create(destinationData)
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