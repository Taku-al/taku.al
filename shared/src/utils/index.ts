import { format, parseISO, isValid } from 'date-fns';
import { DATE_FORMATS, VALIDATION } from '../constants';

// Date utilities
export function formatDate(date: Date | string, formatString: string = DATE_FORMATS.DISPLAY): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatString);
}

export function formatDateTime(date: Date | string): string {
  return formatDate(date, DATE_FORMATS.DATETIME);
}

export function formatTime(time: string): string {
  return format(parseISO(`2000-01-01T${time}`), DATE_FORMATS.TIME);
}

export function isValidDate(date: any): boolean {
  if (!date) return false;
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isValid(dateObj);
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= VALIDATION.EMAIL_MAX_LENGTH;
}

export function validatePassword(password: string): boolean {
  return password.length >= VALIDATION.PASSWORD_MIN_LENGTH;
}

export function validateName(name: string): boolean {
  return name.length >= VALIDATION.NAME_MIN_LENGTH && 
         name.length <= VALIDATION.NAME_MAX_LENGTH;
}

// Time utilities
export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hours, minutes] = startTime.split(':').map(Number);
  const startDate = new Date(2000, 0, 1, hours, minutes);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
  return format(endDate, 'HH:mm');
}

export function isTimeSlotAvailable(
  startTime: string, 
  endTime: string, 
  existingAppointments: Array<{ startTime: string; endTime: string }>
): boolean {
  return !existingAppointments.some(appointment => {
    return (startTime < appointment.endTime && endTime > appointment.startTime);
  });
}

// String utilities
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Array utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

// Error handling utilities
export function isApiError(error: any): boolean {
  return error && (error.response || error.status);
}

export function getErrorMessage(error: any): string {
  if (isApiError(error)) {
    return error.response?.data?.message || error.message || 'An error occurred';
  }
  return error.message || 'An error occurred';
}

// Local storage utilities (for web/mobile)
export function setLocalStorage(key: string, value: any): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getLocalStorage<T>(key: string, defaultValue?: T): T | null {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue || null;
  }
  return defaultValue || null;
}

export function removeLocalStorage(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
} 