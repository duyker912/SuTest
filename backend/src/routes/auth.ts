import { Router, Request, Response } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Mock auth controller for now
// In a real application, you would implement proper authentication
const mockLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Email và password là bắt buộc', 400, 'MISSING_CREDENTIALS');
  }

  // Mock authentication - replace with real implementation
  if (email === 'admin@maplestory.com' && password === 'admin123') {
    const token = 'mock-jwt-token';
    
    res.json({
      success: true,
      data: {
        token,
        user: {
          id: '1',
          email: 'admin@maplestory.com',
          username: 'admin',
          role: 'admin'
        }
      },
      timestamp: new Date().toISOString()
    });
  } else {
    throw new AppError('Thông tin đăng nhập không chính xác', 401, 'INVALID_CREDENTIALS');
  }
});

const getProfile = asyncHandler(async (req: Request, res: Response) => {
  // Mock user profile
  res.json({
    success: true,
    data: {
      id: req.user?.userId || '1',
      email: req.user?.email || 'admin@maplestory.com',
      username: 'admin',
      role: req.user?.role || 'admin'
    },
    timestamp: new Date().toISOString()
  });
});

// Routes
router.post('/login', mockLogin);
router.get('/profile', authenticateToken, getProfile);

export { router as authController };
