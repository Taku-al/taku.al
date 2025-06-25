// Shared constants used across API, web, and mobile

export const API_BASE_URL = '/api/v1';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/users`,
  PROFILE: `${API_BASE_URL}/users/profile`,
  
  // Service endpoints
  SERVICES: `${API_BASE_URL}/service`,
  SERVICE_CATEGORIES: `${API_BASE_URL}/service/categories`,
  
  // Appointment endpoints
  APPOINTMENTS: `${API_BASE_URL}/appointment`,
  APPOINTMENT_STATUS: `${API_BASE_URL}/appointment/:id/status`,
  
  // Time slot endpoints
  TIME_SLOTS: `${API_BASE_URL}/timeslots`,
  AVAILABLE_SLOTS: `${API_BASE_URL}/timeslots/available`,
  
  // Admin endpoints
  ADMIN_USERS: `${API_BASE_URL}/admin/users`,
  ADMIN_SERVICES: `${API_BASE_URL}/admin/services`,
  ADMIN_APPOINTMENTS: `${API_BASE_URL}/admin/appointments`,
  
  // API Info
  API_INFO: '/api',
  HEALTH_CHECK: '/health',
  VERSION_INFO: `${API_BASE_URL}/version`
} as const;

export const APP_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  PROVIDER: 'provider',
} as const;

export const SERVICE_CATEGORIES = {
  HAIR_STYLING: 'hair-styling',
  NAIL_CARE: 'nail-care',
  MASSAGE: 'massage',
  FACIAL: 'facial',
  BEAUTY_TREATMENT: 'beauty-treatment',
  OTHER: 'other',
} as const;

export const TIME_SLOTS = {
  DURATION: 30, // minutes
  START_TIME: '09:00',
  END_TIME: '18:00',
  BREAK_TIME: 15, // minutes between appointments
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
  NOTES_MAX_LENGTH: 500,
} as const;

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  TIME: 'HH:mm',
  DATETIME: 'MMM dd, yyyy HH:mm',
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation failed',
  SERVER_ERROR: 'Internal server error',
  NETWORK_ERROR: 'Network error occurred',
} as const;

export const SUCCESS_MESSAGES = {
  APPOINTMENT_CREATED: 'Appointment created successfully',
  APPOINTMENT_UPDATED: 'Appointment updated successfully',
  APPOINTMENT_CANCELLED: 'Appointment cancelled successfully',
  SERVICE_CREATED: 'Service created successfully',
  SERVICE_UPDATED: 'Service updated successfully',
  USER_REGISTERED: 'User registered successfully',
  USER_LOGGED_IN: 'User logged in successfully',
} as const; 