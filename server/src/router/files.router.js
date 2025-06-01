import { Router } from 'express'
import {
  generateFile,
  downloadFile,
  getAllFiles,
  deleteFile
} from '../controllers/files.controllers.js'

import { validateBody } from '../middlewares/validateBody.js'
import { urlSchema } from '../schemas/url.schema.js'

const router = Router()

router.post('/csv', validateBody(urlSchema), generateFile)
router.get('/csv', getAllFiles)
router.delete('/csv/:id', deleteFile)
router.get('/csv/:id', downloadFile)

export default router
