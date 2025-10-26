import { Router } from 'express';
import { upload } from '../controllers/imageController.js';
import { multerMiddleware } from '../middlewares/custom/multerMiddleware.js';

const router = Router();

router.post('/', multerMiddleware, upload);

export default router;