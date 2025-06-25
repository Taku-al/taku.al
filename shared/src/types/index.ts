// Core domain types used across all applications

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'provider';
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  providerId: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  providerId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeSlot {
  id: string;
  serviceId: string;
  providerId: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  appointmentId?: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export type UserRole = 'user' | 'admin' | 'provider';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Request types
export interface CreateAppointmentRequest {
  serviceId: string;
  date: Date;
  startTime: string;
  notes?: string;
}

export interface UpdateAppointmentRequest {
  date?: Date;
  startTime?: string;
  status?: AppointmentStatus;
  notes?: string;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
} 