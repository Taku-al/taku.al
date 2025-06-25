import { API_ENDPOINTS } from '../constants';
import { 
  Appointment, 
  CreateAppointmentRequest, 
  UpdateAppointmentRequest,
  Service,
  CreateServiceRequest,
  User,
  LoginRequest,
  RegisterRequest,
  ApiResponse
} from '../types';

export class BookingAPI {
  private baseURL: string;

  constructor(baseURL: string = 'http://localhost:3001') {
    this.baseURL = baseURL;
  }

  // Helper method to make API calls
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      
      return data;
    } catch (error) {
      throw new Error(`API Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Auth methods
  async login(credentials: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.data?.token) {
      this.setAuthToken(response.data.token);
    }
    
    return response;
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<User>> {
    return this.request<User>(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<void> {
    await this.request(API_ENDPOINTS.LOGOUT, { method: 'POST' });
    this.clearAuthToken();
  }

  // Appointment methods
  async getAppointments(): Promise<ApiResponse<Appointment[]>> {
    return this.request<Appointment[]>(API_ENDPOINTS.APPOINTMENTS);
  }

  async getAppointment(id: string): Promise<ApiResponse<Appointment>> {
    return this.request<Appointment>(`${API_ENDPOINTS.APPOINTMENTS}/${id}`);
  }

  async createAppointment(data: CreateAppointmentRequest): Promise<ApiResponse<Appointment>> {
    return this.request<Appointment>(API_ENDPOINTS.APPOINTMENTS, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAppointment(id: string, data: UpdateAppointmentRequest): Promise<ApiResponse<Appointment>> {
    return this.request<Appointment>(`${API_ENDPOINTS.APPOINTMENTS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async cancelAppointment(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`${API_ENDPOINTS.APPOINTMENTS}/${id}`, {
      method: 'DELETE',
    });
  }

  // Service methods
  async getServices(): Promise<ApiResponse<Service[]>> {
    return this.request<Service[]>(API_ENDPOINTS.SERVICES);
  }

  async getService(id: string): Promise<ApiResponse<Service>> {
    return this.request<Service>(`${API_ENDPOINTS.SERVICES}/${id}`);
  }

  async createService(data: CreateServiceRequest): Promise<ApiResponse<Service>> {
    return this.request<Service>(API_ENDPOINTS.SERVICES, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // User methods
  async getProfile(): Promise<ApiResponse<User>> {
    return this.request<User>(API_ENDPOINTS.PROFILE);
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(API_ENDPOINTS.PROFILE, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // API Info methods
  async getApiInfo(): Promise<any> {
    return this.request(API_ENDPOINTS.API_INFO);
  }

  async getHealthCheck(): Promise<any> {
    return this.request(API_ENDPOINTS.HEALTH_CHECK);
  }

  async getVersionInfo(): Promise<any> {
    return this.request(API_ENDPOINTS.VERSION_INFO);
  }

  // Utility methods
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  private clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }
}

// Export a default instance
export const bookingAPI = new BookingAPI();

// Export for custom instances
export default BookingAPI; 