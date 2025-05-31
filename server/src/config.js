import express from 'express'

import cors from 'cors'
import helmet from 'helmet'
import authRouter from './router/auth.router.js'
import fileRouter from './router/files.router.js'
import verifyToken from './middlewares/verifyToken.js'
import cookieParser from 'cookie-parser'

const app = express()

import "dotenv/config"
import './db.js'

app.set('PORT', process.env.PORT || 3000)

app.use(cookieParser())
app.use(express.json())
app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(helmet())
app.use(express.urlencoded({ extended: true }))


app.use('/api/v1', authRouter)
app.use('/api/v1', fileRouter)
app.use(verifyToken)

export default app
