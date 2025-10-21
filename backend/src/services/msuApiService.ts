import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { MSUAPIResponse, MSUCharacter, MSUGuild, MSUItem } from '../types';
import { AppError } from '../middleware/errorHandler';

export class MSUApiService {
  private api: AxiosInstance;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.MSU_API_KEY || '';
    
    if (!this.apiKey) {
      throw new AppError('MSU API key không được cấu hình', 500, 'CONFIG_ERROR');
    }

    this.api = axios.create({
      baseURL: process.env.MSU_API_BASE_URL || 'https://openapi.msu.io/v1rc1',
      timeout: 30000,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'MapleStory-N-API/1.0.0'
      }
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`🚀 MSU API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ MSU API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ MSU API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('❌ MSU API Response Error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message
        });

        if (error.response?.status === 429) {
          throw new AppError('Đã vượt quá giới hạn API requests', 429, 'RATE_LIMIT_EXCEEDED');
        } else if (error.response?.status === 401) {
          throw new AppError('API key không hợp lệ hoặc đã hết hạn', 401, 'INVALID_API_KEY');
        } else if (error.response?.status === 403) {
          throw new AppError('Không có quyền truy cập API', 403, 'API_FORBIDDEN');
        } else if (error.response?.status >= 500) {
          throw new AppError('Lỗi server từ MSU API', 502, 'MSU_API_ERROR');
        }

        throw new AppError(
          error.response?.data?.message || 'Lỗi kết nối đến MSU API',
          502,
          'MSU_API_ERROR'
        );
      }
    );
  }

  // Character endpoints
  async getCharacter(characterId: string): Promise<MSUCharacter> {
    try {
      const response = await this.api.get<MSUAPIResponse<MSUCharacter>>(`/characters/${characterId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async getCharacters(server?: string, limit: number = 50): Promise<MSUCharacter[]> {
    try {
      const params: any = { limit };
      if (server) params.server = server;

      const response = await this.api.get<MSUAPIResponse<MSUCharacter[]>>('/characters', { params });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async searchCharacters(query: string, server?: string): Promise<MSUCharacter[]> {
    try {
      const params: any = { q: query };
      if (server) params.server = server;

      const response = await this.api.get<MSUAPIResponse<MSUCharacter[]>>('/characters/search', { params });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  // Guild endpoints
  async getGuild(guildId: string): Promise<MSUGuild> {
    try {
      const response = await this.api.get<MSUAPIResponse<MSUGuild>>(`/guilds/${guildId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async getGuilds(server?: string, limit: number = 50): Promise<MSUGuild[]> {
    try {
      const params: any = { limit };
      if (server) params.server = server;

      const response = await this.api.get<MSUAPIResponse<MSUGuild[]>>('/guilds', { params });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async searchGuilds(query: string, server?: string): Promise<MSUGuild[]> {
    try {
      const params: any = { q: query };
      if (server) params.server = server;

      const response = await this.api.get<MSUAPIResponse<MSUGuild[]>>('/guilds/search', { params });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  // Item endpoints
  async getItem(itemId: string): Promise<MSUItem> {
    try {
      const response = await this.api.get<MSUAPIResponse<MSUItem>>(`/items/${itemId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async getItems(type?: string, rarity?: string, limit: number = 50): Promise<MSUItem[]> {
    try {
      const params: any = { limit };
      if (type) params.type = type;
      if (rarity) params.rarity = rarity;

      const response = await this.api.get<MSUAPIResponse<MSUItem[]>>('/items', { params });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async searchItems(query: string, type?: string): Promise<MSUItem[]> {
    try {
      const params: any = { q: query };
      if (type) params.type = type;

      const response = await this.api.get<MSUAPIResponse<MSUItem[]>>('/items/search', { params });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  // Server info
  async getServers(): Promise<string[]> {
    try {
      const response = await this.api.get<MSUAPIResponse<string[]>>('/servers');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.api.get('/health');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const msuApiService = new MSUApiService();
