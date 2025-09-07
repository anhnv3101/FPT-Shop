import express from 'express';
const router = express.Router();

import uploadImage from './images.router.js';
import authRoutes from './authRouter.js';
import category from "./category.router.js"


// Gán các router con vào router chính với tiền tố URL phù hợp

router.use('/upload', uploadImage);
router.use('/auth', authRoutes);
router.use('/categories', category);

export default router;