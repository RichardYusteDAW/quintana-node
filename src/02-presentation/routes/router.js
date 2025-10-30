import { Router } from 'express';
const router = Router();

// Import routes
import authRoutes from './authRoutes.js';
import emailRoutes from './emailRoutes.js';
import imageRoutes from './imageRoutes.js';
import videoRoutes from './videoRoutes.js';

// Mount routes
router.use('/admin', authRoutes);
router.use('/email', emailRoutes);
router.use('/images', imageRoutes);
router.use('/videos', videoRoutes);

export default router;