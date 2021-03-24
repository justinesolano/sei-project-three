import express from 'express'
import mongoose from 'mongoose'
import router from './config/router.js'
import { dbURI, port } from './config/environment.js'

const app = express()

const startServer = async() => {
  try {
    // Connect for mongodb
    await mongoose.connect(dbURI, { useNewURLParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('🛫 Database has connected successfully')

    // Body parser
    app.use(express.json())

    // Logger middleware 
    app.use((req, _res, next) => {
      console.log(`🐶 Incoming pupdate: ${req.method} - ${req.url}`)
      next()
    })

    // Run the router
    app.use('/api', router)

    // Server
    app.listen(port, () => console.log(`🛫 Express is up and running on port ${port}`))
  } catch (err) {
    console.log('🛩 The plane crashed while starting the app')
    console.log(err)
  }
}

startServer()