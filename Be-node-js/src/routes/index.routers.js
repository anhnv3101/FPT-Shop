import express from 'express';
const router = express.Router();

import uploadImage from './images.router.js';
import authRoutes from './authRoutes.js';

// Gán các router con vào router chính với tiền tố URL phù hợp

router.use('/upload', uploadImage);
router.use('/auth', authRoutes);

export default router;