import http from 'http'
import express from 'express'
import cors from 'cors'
import { Server } from 'colyseus'
import { monitor } from '@colyseus/monitor'
const path = require('path')

// import socialRoutes from "@colyseus/social/express"

import { SkyOffice } from './rooms/SkyOffice'

const port = Number(process.env.PORT || 2567)
const app = express()

// app.use(express.static(path.join(__dirname, '/../client/build'), { maxAge: 86400000 }))
app.use(express.static('public'))

app.use(cors())
app.use(express.json())


const server = http.createServer(app)
const gameServer = new Server({
  server,
})

// register your room handlers
gameServer.define('skyoffice', SkyOffice)

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/server/authentication/)
 * - also uncomment the import statement
 */
// app.use("/", socialRoutes);

// register colyseus monitor AFTER registering your room handlers
app.use('/colyseus', monitor())

gameServer.listen(port)
console.log(`Listening on ws://localhost:${port}`)
