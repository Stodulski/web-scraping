import { Router } from 'express'
import {
  generateFile,
  downloadFile,
  getAllFiles,
  deleteFile
} from '../controllers/files.controllers.js'

const router = Router()

router.post('/csv', generateFile)
router.get('/csv', getAllFiles)
router.delete('/csv/:id', deleteFile)
router.get('/csv/:id', downloadFile)

export default router
