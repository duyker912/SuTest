import { Request, Response, NextFunction } from 'express';
import { msuApiService } from '../services/msuApiService';
import { asyncHandler } from '../middleware/errorHandler';

// Character controllers
export const getCharacter = asyncHandler(async (req: Request, res: Response) => {
  const { characterId } = req.params;
  
  if (!characterId) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_CHARACTER_ID',
        message: 'Character ID là bắt buộc'
      },
      timestamp: new Date().toISOString()
    });
  }
  
  const character = await msuApiService.getCharacter(characterId);
  
  return res.json({
    success: true,
    data: character,
    timestamp: new Date().toISOString()
  });
});

export const getCharacters = asyncHandler(async (req: Request, res: Response) => {
  const { server, limit } = req.query;
  
  const characters = await msuApiService.getCharacters(
    server as string | undefined,
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
  
  const characters = await msuApiService.searchCharacters(q as string, server as string | undefined);
  
  return res.json({
    success: true,
    data: characters,
    timestamp: new Date().toISOString()
  });
});

// Guild controllers
export const getGuild = asyncHandler(async (req: Request, res: Response) => {
  const { guildId } = req.params;
  
  if (!guildId) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_GUILD_ID',
        message: 'Guild ID là bắt buộc'
      },
      timestamp: new Date().toISOString()
    });
  }
  
  const guild = await msuApiService.getGuild(guildId);
  
  return res.json({
    success: true,
    data: guild,
    timestamp: new Date().toISOString()
  });
});

export const getGuilds = asyncHandler(async (req: Request, res: Response) => {
  const { server, limit } = req.query;
  
  const guilds = await msuApiService.getGuilds(
    server as string | undefined,
    limit ? parseInt(limit as string) : 50
  );
  
  return res.json({
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
  
  const guilds = await msuApiService.searchGuilds(q as string, server as string | undefined);
  
  return res.json({
    success: true,
    data: guilds,
    timestamp: new Date().toISOString()
  });
});

// Item controllers
export const getItem = asyncHandler(async (req: Request, res: Response) => {
  const { itemId } = req.params;
  
  if (!itemId) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_ITEM_ID',
        message: 'Item ID là bắt buộc'
      },
      timestamp: new Date().toISOString()
    });
  }
  
  const item = await msuApiService.getItem(itemId);
  
  return res.json({
    success: true,
    data: item,
    timestamp: new Date().toISOString()
  });
});

export const getItems = asyncHandler(async (req: Request, res: Response) => {
  const { type, rarity, limit } = req.query;
  
  const items = await msuApiService.getItems(
    type as string | undefined,
    rarity as string | undefined,
    limit ? parseInt(limit as string) : 50
  );
  
  return res.json({
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
  
  const items = await msuApiService.searchItems(q as string, type as string | undefined);
  
  return res.json({
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

// v1rc1 Accounts controllers
export const getAccountCharacters = asyncHandler(async (req: Request, res: Response) => {
  const { walletAddress } = req.params
  const { isTradable, pageNo, pageSize } = req.query

  if (!walletAddress) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_WALLET', message: 'walletAddress là bắt buộc' },
      timestamp: new Date().toISOString()
    })
  }

  const data = await msuApiService.getAccountCharacters(walletAddress, {
    isTradable: typeof isTradable === 'string' ? isTradable === 'true' : undefined,
    pageNo: pageNo ? parseInt(pageNo as string) : undefined,
    pageSize: pageSize ? parseInt(pageSize as string) : undefined,
  })

  return res.json({ success: true, data, timestamp: new Date().toISOString() })
})

export const getAccountCurrencies = asyncHandler(async (req: Request, res: Response) => {
  const { walletAddress } = req.params
  if (!walletAddress) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_WALLET', message: 'walletAddress là bắt buộc' },
      timestamp: new Date().toISOString()
    })
  }
  const data = await msuApiService.getAccountCurrencies(walletAddress)
  return res.json({ success: true, data, timestamp: new Date().toISOString() })
})

export const getAccountItems = asyncHandler(async (req: Request, res: Response) => {
  const { walletAddress } = req.params
  const { categoryNo, isOnSale, tokenName, tokenId, pageNo, pageSize } = req.query
  if (!walletAddress) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_WALLET', message: 'walletAddress là bắt buộc' },
      timestamp: new Date().toISOString()
    })
  }
  const data = await msuApiService.getAccountItems(walletAddress, {
    categoryNo: categoryNo ? parseInt(categoryNo as string) : undefined,
    isOnSale: typeof isOnSale === 'string' ? isOnSale === 'true' : undefined,
    tokenName: tokenName as string | undefined,
    tokenId: tokenId as string | undefined,
    pageNo: pageNo ? parseInt(pageNo as string) : undefined,
    pageSize: pageSize ? parseInt(pageSize as string) : undefined,
  })
  return res.json({ success: true, data, timestamp: new Date().toISOString() })
})

export const getAccountNeso = asyncHandler(async (req: Request, res: Response) => {
  const { walletAddress } = req.params
  if (!walletAddress) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_WALLET', message: 'walletAddress là bắt buộc' },
      timestamp: new Date().toISOString()
    })
  }
  const data = await msuApiService.getAccountNeso(walletAddress)
  return res.json({ success: true, data, timestamp: new Date().toISOString() })
})
