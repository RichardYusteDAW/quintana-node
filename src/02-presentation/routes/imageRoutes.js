import { Router } from 'express';
import { upload, getAll, updateName, deleteImage } from '../controllers/imageController.js';
import { multerMiddleware } from '../middlewares/custom/multerMiddleware.js';
import { imageUpdateMiddleware, imageDeleteMiddleware } from '../middlewares/imageMiddleware.js';

const router = Router();

router.get('/', getAll);
router.post('/', multerMiddleware, upload);
router.put('/', imageUpdateMiddleware, updateName);
router.delete('/', imageDeleteMiddleware, deleteImage);

export default router;