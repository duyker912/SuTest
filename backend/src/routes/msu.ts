import { Router } from 'express';
import { authenticateToken, optionalAuth } from '../middleware/auth';
import {
  getCharacter,
  getCharacters,
  searchCharacters,
  getGuild,
  getGuilds,
  searchGuilds,
  getItem,
  getItems,
  searchItems,
  getServers,
  msuHealthCheck,
  getAccountCharacters,
  getAccountCurrencies,
  getAccountItems,
  getAccountNeso
} from '../controllers/msuController';

const router = Router();

// Health check for MSU API
router.get('/health', msuHealthCheck);

// Server info (public)
router.get('/servers', getServers);

// Character routes (public with optional auth)
router.get('/characters', optionalAuth, getCharacters);
router.get('/characters/search', optionalAuth, searchCharacters);
router.get('/characters/:characterId', optionalAuth, getCharacter);

// Guild routes (public with optional auth)
router.get('/guilds', optionalAuth, getGuilds);
router.get('/guilds/search', optionalAuth, searchGuilds);
router.get('/guilds/:guildId', optionalAuth, getGuild);

// Item routes (public with optional auth)
router.get('/items', optionalAuth, getItems);
router.get('/items/search', optionalAuth, searchItems);
router.get('/items/:itemId', optionalAuth, getItem);

// v1rc1 Accounts routes
router.get('/accounts/:walletAddress/characters', optionalAuth, getAccountCharacters)
router.get('/accounts/:walletAddress/currencies', optionalAuth, getAccountCurrencies)
router.get('/accounts/:walletAddress/items', optionalAuth, getAccountItems)
router.get('/accounts/:walletAddress/neso', optionalAuth, getAccountNeso)

export { router as msuController };
