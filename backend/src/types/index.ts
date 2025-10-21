// MSU API Types
export interface MSUCharacter {
  id: string;
  name: string;
  level: number;
  job: string;
  server: string;
  guild?: string;
  lastLogin?: string;
  created?: string;
}

export interface MSUGuild {
  id: string;
  name: string;
  server: string;
  level: number;
  members: number;
  leader: string;
  created?: string;
}

export interface MSUItem {
  id: string;
  name: string;
  type: string;
  rarity: string;
  level?: number;
  stats?: Record<string, number>;
  description?: string;
}

export interface MSUAPIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// Database Types
export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface APIKey {
  id: string;
  key: string;
  name: string;
  userId: string;
  isActive: boolean;
  lastUsed?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface APILog {
  id: string;
  apiKeyId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  ipAddress: string;
  userAgent?: string;
  createdAt: Date;
}

// Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface APIKeyRequest {
  name: string;
}

export interface APIKeyResponse {
  id: string;
  key: string;
  name: string;
  createdAt: Date;
}

// Error Types
export interface APIError {
  code: string;
  message: string;
  details?: any;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
