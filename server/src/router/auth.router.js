import{ Router } from 'express';
const router = Router();
import { login, checkSession, logout} from '../controllers/auth.controllers.js';
router.post('/session', login);
router.get('/session', checkSession);
router.delete('/session', logout)
export default router;  