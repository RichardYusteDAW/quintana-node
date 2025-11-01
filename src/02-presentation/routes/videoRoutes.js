import { Router } from 'express';
import { getAll, update, deleteVideo } from '../controllers/videoController.js';
import { videoUpdateMiddleware, videoDeleteMiddleware } from '../middlewares/videoMiddleware.js';
import { jwtMiddleware } from '../middlewares/custom/jwtMiddleWare.js';

const router = Router();

router.get('/', getAll);
router.post('/', [jwtMiddleware, videoUpdateMiddleware], update);
router.delete('/:id', [jwtMiddleware, videoDeleteMiddleware], deleteVideo);

export default router;