import { Router } from 'express';
import { msuController } from './msu';
import { authController } from './auth';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API đang hoạt động bình thường',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Authentication routes
router.use('/auth', authController);

// MSU API routes
router.use('/msu', msuController);

export default router;
