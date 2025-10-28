import { Router } from 'express';
import { getAll, update, deleteVideo } from '../controllers/videoController.js';
import { videoUpdateMiddleware, videoDeleteMiddleware } from '../middlewares/videoMiddleware.js';

const router = Router();

router.get('/', getAll);
router.post('/', [videoUpdateMiddleware, update]);
router.delete('/:id', [videoDeleteMiddleware, deleteVideo]);

export default router;