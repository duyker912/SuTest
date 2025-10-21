import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/database';
import { authenticateToken } from './auth';

export const apiLogging = async (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  // Override res.end to capture response data
  const originalEnd = res.end;
  let statusCode = 200;
  let responseTime = 0;

  res.end = function(chunk?: any, encoding?: any) {
    responseTime = Date.now() - startTime;
    statusCode = res.statusCode;
    
    // Log API call asynchronously
    logApiCall(req, statusCode, responseTime).catch(console.error);
    
    // Call original end method
    return originalEnd.call(this, chunk, encoding);
  };

  next();
};

async function logApiCall(req: Request, statusCode: number, responseTime: number) {
  try {
    // Only log MSU API calls
    if (!req.path.startsWith('/api/msu')) {
      return;
    }

    // Get API key from request (if authenticated)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return;
    }

    // Find API key (simplified - in real app, you'd validate JWT and get user)
    const apiKey = await prisma.aPIKey.findFirst({
      where: {
        key: token,
        isActive: true
      }
    });

    if (!apiKey) {
      return;
    }

    // Log the API call
    await prisma.aPILog.create({
      data: {
        apiKeyId: apiKey.id,
        userId: apiKey.userId,
        endpoint: req.path,
        method: req.method,
        statusCode,
        responseTime,
        ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
        userAgent: req.get('User-Agent') || undefined
      }
    });

    // Update last used timestamp for API key
    await prisma.aPIKey.update({
      where: { id: apiKey.id },
      data: { lastUsed: new Date() }
    });

  } catch (error) {
    console.error('Error logging API call:', error);
  }
}
