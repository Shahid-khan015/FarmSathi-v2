import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '../config';

const API_BASE = config.apiUrl;

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: 'owner' | 'operator' | 'farmer';
  phone: string | null;
  isActive: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Tractor {
  id: string;
  ownerId: string;
  manufacturerName: string;
  model: string;
  registrationNumber: string;
  specifications: Record<string, any> | null;
  isActive: boolean;
}

export interface Implement {
  id: string;
  ownerId: string;
  operationType: string;
  name: string;
  brandName: string;
  workingWidth: number;
  specifications: Record<string, any> | null;
  isActive: boolean;
}

export interface Operation {
  id: string;
  tractorId: string;
  implementId: string;
  operatorId: string;
  operationType: string;
  status: 'active' | 'completed' | 'cancelled';
  startTime: string;
  endTime: string | null;
  notes: string | null;
  tractor?: { id: string; manufacturerName: string; model: string };
  implement?: { id: string; name: string };
  operator?: { fullName: string };
}

export interface DashboardStats {
  tractorsCount: number;
  implementsCount: number;
  activeOperations: number;
  todayFuelUsage: number;
  unresolvedAlerts: number;
  recentOperations: any[];
}

export interface Alert {
  id: string;
  tractorId: string;
  operationId: string | null;
  timestamp: string;
  alertType: string;
  message: string;
  isResolved: boolean;
}

export interface FuelLog {
  id: string;
  tractorId: string;
  operatorId: string;
  operationId: string | null;
  timestamp: string;
  quantity: number;
  notes: string | null;
}

export interface Telemetry {
  id: string;
  operationId: string;
  tractorId: string;
  timestamp: string;
  engineOn: boolean;
  latitude: number | null;
  longitude: number | null;
  isMoving: boolean;
  ptoOn: boolean;
  speed: number | null;
  implementData: Record<string, any> | null;
}

class ApiService {
  private token: string | null = null;
  private initialized: boolean = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;
    this.token = await AsyncStorage.getItem('auth_token');
    this.initialized = true;
  }

  async setToken(token: string | null): Promise<void> {
    this.token = token;
    if (token) {
      await AsyncStorage.setItem('auth_token', token);
    } else {
      await AsyncStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    await this.initialize();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      throw new Error(error.detail || 'Request failed');
    }

    return response.json();
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    const result = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    await this.setToken(result.token);
    await AsyncStorage.setItem('current_user', JSON.stringify(result.user));
    return result;
  }

  async register(data: {
    username: string;
    password: string;
    fullName: string;
    role: string;
    phone?: string;
  }): Promise<AuthResponse> {
    const result = await this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    await this.setToken(result.token);
    await AsyncStorage.setItem('current_user', JSON.stringify(result.user));
    return result;
  }

  async logout(): Promise<void> {
    await this.setToken(null);
    await AsyncStorage.removeItem('current_user');
  }

  async getCurrentUser(): Promise<User | null> {
    await this.initialize();
    const userStr = await AsyncStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return this.request<DashboardStats>('/api/dashboard/stats');
  }

  async getTractors(): Promise<Tractor[]> {
    return this.request<Tractor[]>('/api/tractors');
  }

  async createTractor(data: {
    manufacturerName: string;
    model: string;
    registrationNumber: string;
    specifications?: Record<string, any>;
    isActive?: boolean;
  }): Promise<Tractor> {
    return this.request<Tractor>('/api/tractors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTractor(id: string, data: Partial<{
    manufacturerName: string;
    model: string;
    registrationNumber: string;
    specifications: Record<string, any>;
    isActive: boolean;
  }>): Promise<Tractor> {
    return this.request<Tractor>(`/api/tractors/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteTractor(id: string): Promise<void> {
    await this.request(`/api/tractors/${id}`, { method: 'DELETE' });
  }

  async getImplements(): Promise<Implement[]> {
    return this.request<Implement[]>('/api/implements');
  }

  async createImplement(data: {
    operationType: string;
    name: string;
    brandName: string;
    workingWidth: number;
    specifications?: Record<string, any>;
    isActive?: boolean;
  }): Promise<Implement> {
    return this.request<Implement>('/api/implements', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateImplement(id: string, data: Partial<{
    operationType: string;
    name: string;
    brandName: string;
    workingWidth: number;
    specifications: Record<string, any>;
    isActive: boolean;
  }>): Promise<Implement> {
    return this.request<Implement>(`/api/implements/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteImplement(id: string): Promise<void> {
    await this.request(`/api/implements/${id}`, { method: 'DELETE' });
  }

  async getOperations(): Promise<Operation[]> {
    return this.request<Operation[]>('/api/operations');
  }

  async createOperation(data: {
    tractorId: string;
    implementId: string;
    operationType: string;
    notes?: string;
  }): Promise<Operation> {
    return this.request<Operation>('/api/operations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async stopOperation(operationId: string): Promise<Operation> {
    return this.request<Operation>(`/api/operations/${operationId}/stop`, {
      method: 'POST',
    });
  }

  async getTelemetry(operationId: string): Promise<Telemetry[]> {
    return this.request<Telemetry[]>(`/api/telemetry/${operationId}`);
  }

  async createTelemetry(data: {
    operationId: string;
    tractorId: string;
    engineOn: boolean;
    latitude?: number;
    longitude?: number;
    isMoving?: boolean;
    ptoOn?: boolean;
    speed?: number;
    implementData?: Record<string, any>;
  }): Promise<Telemetry> {
    return this.request<Telemetry>('/api/telemetry', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getFuelLogs(): Promise<FuelLog[]> {
    return this.request<FuelLog[]>('/api/fuel-logs');
  }

  async createFuelLog(data: {
    tractorId: string;
    operationId?: string;
    quantity: number;
    notes?: string;
  }): Promise<FuelLog> {
    return this.request<FuelLog>('/api/fuel-logs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAlerts(): Promise<Alert[]> {
    return this.request<Alert[]>('/api/alerts');
  }

  async createAlert(data: {
    tractorId: string;
    operationId?: string;
    alertType: string;
    message: string;
  }): Promise<Alert> {
    return this.request<Alert>('/api/alerts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resolveAlert(alertId: string): Promise<Alert> {
    return this.request<Alert>(`/api/alerts/${alertId}/resolve`, {
      method: 'POST',
    });
  }

  async getReports(params?: {
    startDate?: string;
    endDate?: string;
    tractorId?: string;
  }): Promise<any> {
    const searchParams = new URLSearchParams();
    if (params?.startDate) searchParams.append('start_date', params.startDate);
    if (params?.endDate) searchParams.append('end_date', params.endDate);
    if (params?.tractorId) searchParams.append('tractor_id', params.tractorId);
    
    const query = searchParams.toString();
    return this.request(`/api/reports${query ? `?${query}` : ''}`);
  }
}

export const api = new ApiService();
