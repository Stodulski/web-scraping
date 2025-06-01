import express from 'express'

import cors from 'cors'
import helmet from 'helmet'
import authRouter from './router/auth.router.js'
import fileRouter from './router/files.router.js'
import verifyToken from './middlewares/verifyToken.js'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()

import 'dotenv/config'
import './db.js'

app.set('PORT', process.env.PORT || 3000)

app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT, credentials: true }))
app.use(helmet())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', authRouter)
app.use('/api/v1', verifyToken, fileRouter)
app.use(errorHandler)

export default app
