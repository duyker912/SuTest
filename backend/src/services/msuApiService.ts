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
        'x-nxopen-api-key': this.apiKey,
        'accept': 'application/json',
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
        const status = error.response?.status as number | undefined;
        const upstream = error.response?.data;
        const url = error.config?.url;
        const upstreamMessage = upstream?.error?.message || upstream?.message || error.message;
        const upstreamCode = upstream?.error?.name || upstream?.error?.code || 'MSU_API_ERROR';

        console.error('❌ MSU API Response Error:', { status, url, upstreamMessage, upstreamCode });

        if (status) {
          // Phản hồi nguyên trạng mã lỗi từ MSU để client thấy rõ lý do (ví dụ OPENAPI00005)
          throw new AppError(upstreamMessage || 'MSU API error', status, upstreamCode);
        }

        // Không có response (lỗi mạng/DNS/timeouts)
        throw new AppError('Lỗi kết nối đến MSU API', 502, 'MSU_API_ERROR');
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

  // v1rc1 Accounts endpoints
  async getAccountCharacters(
    walletAddress: string,
    options?: { isTradable?: boolean; pageNo?: number; pageSize?: number }
  ): Promise<any> {
    const params: any = {}
    if (typeof options?.isTradable === 'boolean') params.isTradable = options.isTradable
    if (options?.pageNo) params['paginationParam.pageNo'] = options.pageNo
    if (options?.pageSize) params['paginationParam.pageSize'] = options.pageSize

    const url = `/accounts/${walletAddress}/characters`
    const response = await this.api.get(url, { params })
    return response.data.data
  }

  async getAccountCurrencies(walletAddress: string): Promise<any> {
    const url = `/accounts/${walletAddress}/currencies`
    const response = await this.api.get(url)
    return response.data.data
  }

  async getAccountItems(
    walletAddress: string,
    options?: { categoryNo?: number; isOnSale?: boolean; tokenName?: string; tokenId?: string; pageNo?: number; pageSize?: number }
  ): Promise<any> {
    const params: any = {}
    if (options?.categoryNo !== undefined) params.categoryNo = options.categoryNo
    if (typeof options?.isOnSale === 'boolean') params.isOnSale = options.isOnSale
    if (options?.tokenName) params.tokenName = options.tokenName
    if (options?.tokenId) params.tokenId = options.tokenId
    if (options?.pageNo) params['paginationParam.pageNo'] = options.pageNo
    if (options?.pageSize) params['paginationParam.pageSize'] = options.pageSize

    const url = `/accounts/${walletAddress}/items`
    const response = await this.api.get(url, { params })
    return response.data.data
  }

  async getAccountNeso(walletAddress: string): Promise<any> {
    const url = `/accounts/${walletAddress}/neso`
    const response = await this.api.get(url)
    return response.data.data
  }
}

// Export singleton instance
export const msuApiService = new MSUApiService();
