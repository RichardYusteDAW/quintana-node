import { Router } from 'express';
import { upload, getAll, updateName, deleteImage } from '../controllers/imageController.js';
import { imageUpdateMiddleware, imageDeleteMiddleware } from '../middlewares/imageMiddleware.js';
import { multerMiddleware } from '../middlewares/custom/multerMiddleware.js';
import { jwtMiddleware } from '../middlewares/custom/jwtMiddleWare.js';

const router = Router();

router.get('/', getAll);
router.post('/', [jwtMiddleware, multerMiddleware], upload);
router.put('/', [jwtMiddleware, imageUpdateMiddleware], updateName);
router.delete('/', [jwtMiddleware, imageDeleteMiddleware], deleteImage);

export default router;