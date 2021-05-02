
import express from 'express'
import mongoose from 'mongoose'
import router from './config/router.js'
import { dbURI, port } from './config/environment.js'
// require('dotenv').config()

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
    app.listen(process.env.PORT || 4000, () => console.log(`🛫 Express is up and running on port ${port}`))
  } catch (err) {
    console.log('🛩 The plane crashed while starting the app')
    console.log(err)
  }
}

startServer()


// const express = require('express')
// const mongoose = require('mongoose')
// const app = express()
// const logger = require('./lib/logger')
// const router = require('./config/routes')
// const errorHandler = require('./lib/errorHandler')
// const { dbURI, port } = require('./config/environment')

// mongoose.connect(
//   dbURI,
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  },
//   (err) => {
//     if (err) return console.log(err)
//     console.log('Mongo is Connected!')
//   })

// app.use(express.static(`${__dirname}/client/build`)) // <-- This line has been added before the express json middleware, it will allow the app to respond to a request with contents of this directory "build", which will contain our React App code.

// app.use(express.json())

// app.use(logger)

// app.use('/api', router)

// app.use('/*', (_, res) => res.sendFile(`${__dirname}/client/build/index.html`)) // <-- This additional route handler has been added between the router and error handler middleware it means that any incoming request that does not match a route in router should respond back with our frontend.

// app.use(errorHandler)

// app.listen(port, () => console.log(`Express is listening on port ${port}`))