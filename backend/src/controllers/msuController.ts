import { Request, Response, NextFunction } from 'express';
import { msuApiService } from '../services/msuApiService';
import { asyncHandler } from '../middleware/errorHandler';

// Character controllers
export const getCharacter = asyncHandler(async (req: Request, res: Response) => {
  const { characterId } = req.params;
  
  const character = await msuApiService.getCharacter(characterId);
  
  res.json({
    success: true,
    data: character,
    timestamp: new Date().toISOString()
  });
});

export const getCharacters = asyncHandler(async (req: Request, res: Response) => {
  const { server, limit } = req.query;
  
  const characters = await msuApiService.getCharacters(
    server as string,
    limit ? parseInt(limit as string) : 50
  );
  
  res.json({
    success: true,
    data: characters,
    timestamp: new Date().toISOString()
  });
});

export const searchCharacters = asyncHandler(async (req: Request, res: Response) => {
  const { q, server } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_QUERY',
        message: 'Tham số tìm kiếm (q) là bắt buộc'
      },
      timestamp: new Date().toISOString()
    });
  }
  
  const characters = await msuApiService.searchCharacters(q as string, server as string);
  
  res.json({
    success: true,
    data: characters,
    timestamp: new Date().toISOString()
  });
});

// Guild controllers
export const getGuild = asyncHandler(async (req: Request, res: Response) => {
  const { guildId } = req.params;
  
  const guild = await msuApiService.getGuild(guildId);
  
  res.json({
    success: true,
    data: guild,
    timestamp: new Date().toISOString()
  });
});

export const getGuilds = asyncHandler(async (req: Request, res: Response) => {
  const { server, limit } = req.query;
  
  const guilds = await msuApiService.getGuilds(
    server as string,
    limit ? parseInt(limit as string) : 50
  );
  
  res.json({
    success: true,
    data: guilds,
    timestamp: new Date().toISOString()
  });
});

export const searchGuilds = asyncHandler(async (req: Request, res: Response) => {
  const { q, server } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_QUERY',
        message: 'Tham số tìm kiếm (q) là bắt buộc'
      },
      timestamp: new Date().toISOString()
    });
  }
  
  const guilds = await msuApiService.searchGuilds(q as string, server as string);
  
  res.json({
    success: true,
    data: guilds,
    timestamp: new Date().toISOString()
  });
});

// Item controllers
export const getItem = asyncHandler(async (req: Request, res: Response) => {
  const { itemId } = req.params;
  
  const item = await msuApiService.getItem(itemId);
  
  res.json({
    success: true,
    data: item,
    timestamp: new Date().toISOString()
  });
});

export const getItems = asyncHandler(async (req: Request, res: Response) => {
  const { type, rarity, limit } = req.query;
  
  const items = await msuApiService.getItems(
    type as string,
    rarity as string,
    limit ? parseInt(limit as string) : 50
  );
  
  res.json({
    success: true,
    data: items,
    timestamp: new Date().toISOString()
  });
});

export const searchItems = asyncHandler(async (req: Request, res: Response) => {
  const { q, type } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_QUERY',
        message: 'Tham số tìm kiếm (q) là bắt buộc'
      },
      timestamp: new Date().toISOString()
    });
  }
  
  const items = await msuApiService.searchItems(q as string, type as string);
  
  res.json({
    success: true,
    data: items,
    timestamp: new Date().toISOString()
  });
});

// Server controllers
export const getServers = asyncHandler(async (req: Request, res: Response) => {
  const servers = await msuApiService.getServers();
  
  res.json({
    success: true,
    data: servers,
    timestamp: new Date().toISOString()
  });
});

// Health check controller
export const msuHealthCheck = asyncHandler(async (req: Request, res: Response) => {
  const isHealthy = await msuApiService.healthCheck();
  
  res.json({
    success: true,
    data: {
      healthy: isHealthy,
      service: 'MSU API'
    },
    timestamp: new Date().toISOString()
  });
});
