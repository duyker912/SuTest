import axios, { AxiosInstance, AxiosResponse } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
        return config
      },
      (error) => {
        console.error('❌ API Request Error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`)
        return response
      },
      (error) => {
        console.error('❌ API Response Error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
        })

        if (error.response?.status === 401) {
          // Handle unauthorized
          console.error('Unauthorized access')
        } else if (error.response?.status === 429) {
          // Handle rate limit
          console.error('Rate limit exceeded')
        }

        return Promise.reject(error)
      }
    )
  }

  // Health check
  async healthCheck() {
    const response = await this.api.get('/health')
    return response.data
  }

  // MSU API endpoints
  async getServers() {
    const response = await this.api.get('/msu/servers')
    return response.data
  }

  async msuHealthCheck() {
    const response = await this.api.get('/msu/health')
    return response.data
  }

  // Character endpoints
  async getCharacters(server?: string, limit?: number) {
    const params: any = {}
    if (server) params.server = server
    if (limit) params.limit = limit

    const response = await this.api.get('/msu/characters', { params })
    return response.data
  }

  async getCharacter(characterId: string) {
    const response = await this.api.get(`/msu/characters/${characterId}`)
    return response.data
  }

  async searchCharacters(query: string, server?: string) {
    const params: any = { q: query }
    if (server) params.server = server

    const response = await this.api.get('/msu/characters/search', { params })
    return response.data
  }

  // Guild endpoints
  async getGuilds(server?: string, limit?: number) {
    const params: any = {}
    if (server) params.server = server
    if (limit) params.limit = limit

    const response = await this.api.get('/msu/guilds', { params })
    return response.data
  }

  async getGuild(guildId: string) {
    const response = await this.api.get(`/msu/guilds/${guildId}`)
    return response.data
  }

  async searchGuilds(query: string, server?: string) {
    const params: any = { q: query }
    if (server) params.server = server

    const response = await this.api.get('/msu/guilds/search', { params })
    return response.data
  }

  // Item endpoints
  async getItems(type?: string, rarity?: string, limit?: number) {
    const params: any = {}
    if (type) params.type = type
    if (rarity) params.rarity = rarity
    if (limit) params.limit = limit

    const response = await this.api.get('/msu/items', { params })
    return response.data
  }

  async getItem(itemId: string) {
    const response = await this.api.get(`/msu/items/${itemId}`)
    return response.data
  }

  async searchItems(query: string, type?: string) {
    const params: any = { q: query }
    if (type) params.type = type

    const response = await this.api.get('/msu/items/search', { params })
    return response.data
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.api.post('/auth/login', { email, password })
    return response.data
  }

  async getProfile() {
    const response = await this.api.get('/auth/profile')
    return response.data
  }
}

export const apiService = new ApiService()
