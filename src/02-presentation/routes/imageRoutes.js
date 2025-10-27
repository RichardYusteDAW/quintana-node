import { Router } from 'express';
import { upload, getAll } from '../controllers/imageController.js';
import { multerMiddleware } from '../middlewares/custom/multerMiddleware.js';

const router = Router();

router.get('/', getAll);
router.post('/', multerMiddleware, upload);

export default router;