// API client for compositions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3900';
const API_PREFIX = '/api/v1';

// Auth interfaces
export interface User {
  id: number | string;
  email: string | null;
  provider: string;
  socialId?: string | null;
  firstName: string | null;
  lastName: string | null;
  photo?: any | null;
  role?: any | null;
  status?: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}

export interface RefreshResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
}

export interface BoardSize {
  rows: number;
  cols: number;
}

export interface Synergy {
  id: string;
  name: string;
  abbreviation: string;
  count: number;
  max: number;
  color: string;
}

export interface Position {
  row: number;
  col: number;
}

export interface Unit {
  championId: string;
  championKey: string;
  name: string;
  cost: number;
  star: number;
  carry?: boolean;
  need3Star?: boolean; // Cần lên 3 sao
  position: Position;
  image?: string;
  items?: string[]; // Array of item IDs
  itemsDetails?: Array<{ // Populated items
    id: string | number;
    apiName?: string | null;
    name: string;
    icon?: string | null;
    tag?: string | null;
    unique?: boolean | null;
  }>;
}

export interface CarryItem {
  championId: string;
  championKey: string;
  championName: string;
  role: string;
  image?: string;
  items: string[];
}

export interface Composition {
  id: string | number;
  compId: string;
  name: string;
  plan?: string;
  difficulty?: string;
  metaDescription?: string;
  isLateGame?: boolean;
  tier?: string; // S, A, B, C, D
  boardSize: BoardSize;
  synergies: Synergy[];
  units: Unit[];
  bench?: Unit[];
  carryItems?: CarryItem[];
  notes?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CreateCompositionDto {
  compId: string;
  name: string;
  plan?: string;
  difficulty?: string;
  metaDescription?: string;
  isLateGame?: boolean;
  tier?: string; // S, A, B, C, D
  boardSize: BoardSize;
  synergies: Synergy[];
  units: Unit[];
  bench?: Unit[];
  carryItems?: CarryItem[];
  notes?: string[];
}

export interface UpdateCompositionDto extends Partial<CreateCompositionDto> {}

export interface FilterCompositionDto {
  name?: string | null;
  compId?: string | null;
  difficulty?: string | null;
  tier?: string | null;
  isLateGame?: boolean | null;
}

export interface QueryCompositionDto {
  page?: number;
  limit?: number;
  filters?: FilterCompositionDto | null;
  sort?: Array<{ orderBy: string; order: string }> | null;
}

export interface PaginationResponse<T> {
  data: T[];
  hasNextPage: boolean;
}

export interface TftUnit {
  id: string | number;
  apiName: string;
  name: string;
  enName?: string | null;
  characterName?: string | null;
  cost?: number | null;
  icon?: string | null;
  squareIcon?: string | null;
  tileIcon?: string | null;
  role?: string | null;
  traits?: string[];
}

export interface TftTrait {
  id: string | number;
  apiName: string;
  name: string;
  enName?: string | null;
  desc?: string | null;
  icon?: string | null;
  effects?: Array<{
    maxUnits?: number;
    minUnits?: number;
    style?: number;
  }>;
}

export interface Item {
  id: string | number;
  apiName: string;
  name: string;
  icon?: string | null;
  tag?: string | null;
  unique?: boolean | null;
}

export interface TftAugment {
  id: string | number;
  apiName: string;
  name: string;
  enName?: string | null;
  desc?: string | null;
  icon?: string | null;
  tier?: number | null;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = `${API_BASE_URL}${API_PREFIX}`;
    // Load token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  setToken(token: string | null): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add Authorization header if token exists
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Handle empty responses (like DELETE)
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return {} as T;
      }

      return response.json();
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error(
          `Không thể kết nối đến API. Vui lòng kiểm tra:\n` +
          `1. API server có đang chạy tại ${this.baseUrl}?\n` +
          `2. CORS đã được cấu hình đúng chưa?\n` +
          `3. Kiểm tra console để xem chi tiết lỗi.`
        );
      }
      throw error;
    }
  }

  // Compositions API
  async getCompositions(query?: QueryCompositionDto): Promise<PaginationResponse<Composition>> {
    const params = new URLSearchParams();
    
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());
    if (query?.filters) {
      if (query.filters.name) params.append('filters[name]', query.filters.name);
      if (query.filters.compId) params.append('filters[compId]', query.filters.compId);
      if (query.filters.difficulty) params.append('filters[difficulty]', query.filters.difficulty);
      if (query.filters.tier) params.append('filters[tier]', query.filters.tier);
      if (query.filters.isLateGame !== undefined && query.filters.isLateGame !== null) {
        params.append('filters[isLateGame]', query.filters.isLateGame.toString());
      }
    }

    const queryString = params.toString();
    return this.request<PaginationResponse<Composition>>(
      `/compositions${queryString ? `?${queryString}` : ''}`
    );
  }

  async getComposition(id: string | number): Promise<Composition> {
    return this.request<Composition>(`/compositions/${id}`);
  }

  async getCompositionByCompId(compId: string): Promise<Composition> {
    return this.request<Composition>(`/compositions/compId/${compId}`);
  }

  async createComposition(data: CreateCompositionDto): Promise<Composition> {
    return this.request<Composition>('/compositions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateComposition(
    id: string | number,
    data: UpdateCompositionDto
  ): Promise<Composition> {
    return this.request<Composition>(`/compositions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteComposition(id: string | number): Promise<void> {
    return this.request<void>(`/compositions/${id}`, {
      method: 'DELETE',
    });
  }

  // Parse Mobalytics HTML
  async parseMobalyticsHTML(html: string): Promise<CreateCompositionDto> {
    return this.request<CreateCompositionDto>('/compositions/parse-mobalytics-html', {
      method: 'POST',
      body: JSON.stringify({ html }),
    });
  }

  // TFT Units API
  async getAllUnits(): Promise<TftUnit[]> {
    return this.request<TftUnit[]>('/tft-units/list-all');
  }

  // TFT Traits API
  async getAllTraits(): Promise<TftTrait[]> {
    // Lấy tất cả traits với limit lớn
    const response = await this.request<PaginationResponse<TftTrait>>(
      '/tft-traits?limit=1000&orderBy=name&order=asc'
    );
    return response.data;
  }

  // Items API
  async getAllItems(): Promise<Item[]> {
    // Lấy tất cả items với limit lớn
    const response = await this.request<PaginationResponse<Item>>(
      '/items?limit=1000&orderBy=name&order=asc'
    );
    return response.data;
  }

  // TFT Augments API
  async getAllAugments(): Promise<TftAugment[]> {
    // Lấy tất cả augments với limit lớn
    const response = await this.request<PaginationResponse<TftAugment>>(
      '/tft-augments?limit=1000&orderBy=name&order=asc'
    );
    return response.data;
  }

  // Auth API
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/auth/email/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    // Save tokens after successful login
    if (response.token) {
      this.setToken(response.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_refresh_token', response.refreshToken);
      }
    }
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.request<void>('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Ignore errors on logout
      console.error('Logout error:', error);
    } finally {
      // Always clear token locally
      this.setToken(null);
    }
  }

  async getMe(): Promise<User | null> {
    try {
      return await this.request<User>('/auth/me');
    } catch (error) {
      // If unauthorized, clear token
      if (error instanceof Error && error.message.includes('401')) {
        this.setToken(null);
      }
      return null;
    }
  }

  async refreshToken(): Promise<RefreshResponse> {
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem('auth_refresh_token') 
      : null;
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.request<RefreshResponse>('/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
      },
    });

    // Update tokens
    if (response.token) {
      this.setToken(response.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_refresh_token', response.refreshToken);
      }
    }

    return response;
  }
}

export const apiClient = new ApiClient();

