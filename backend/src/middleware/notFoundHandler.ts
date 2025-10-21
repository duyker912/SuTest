import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Không tìm thấy endpoint ${req.method} ${req.path}`
    },
    timestamp: new Date().toISOString()
  });
};
