import { Router } from 'express';
import { emailMiddleware } from '../middlewares/emailMiddleware.js';
import { sendEmail } from '../controllers/emailController.js';

const router = Router();

router.post('/', [emailMiddleware], sendEmail);

export default router;