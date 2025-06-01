import { Router } from 'express'
const router = Router()
import { login, checkSession, logout } from '../controllers/auth.controllers.js'
import { validateBody } from '../middlewares/validateBody.js'
import { authSchema } from '../schemas/auth.schema.js'
router.post('/session', validateBody(authSchema), login)
router.get('/session', checkSession)
router.delete('/session', logout)
export default router
