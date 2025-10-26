import { Router } from 'express';
const router = Router();

// Import routes
import emailRoutes from './emailRoutes.js';
import imageRoutes from './imageRoutes.js';

// Mount routes
router.use('/email', emailRoutes);
router.use('/images', imageRoutes);

export default router;