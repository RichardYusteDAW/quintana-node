import { Router } from 'express';
const router = Router();

// Import routes
import emailRoutes from './emailRoutes.js';
import imageRoutes from './imageRoutes.js';
import videoRoutes from './videoRoutes.js';

// Mount routes
router.use('/email', emailRoutes);
router.use('/images', imageRoutes);
router.use('/videos', videoRoutes);

export default router;