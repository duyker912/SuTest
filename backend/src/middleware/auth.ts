import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new AppError('Token truy cập không được cung cấp', 401, 'MISSING_TOKEN');
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError('JWT secret không được cấu hình', 500, 'CONFIG_ERROR');
    }

    const decoded = jwt.verify(token, secret) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Token không hợp lệ', 401, 'INVALID_TOKEN');
    } else if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Token đã hết hạn', 401, 'TOKEN_EXPIRED');
    }
    throw new AppError('Lỗi xác thực token', 401, 'AUTH_ERROR');
  }
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Chưa xác thực người dùng', 401, 'UNAUTHORIZED');
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('Không có quyền truy cập', 403, 'FORBIDDEN');
    }

    next();
  };
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      if (secret) {
        const decoded = jwt.verify(token, secret) as JWTPayload;
        req.user = decoded;
      }
    } catch (error) {
      // Ignore token errors for optional auth
    }
  }

  next();
};
