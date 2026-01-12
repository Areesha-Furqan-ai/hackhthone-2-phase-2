// TypeScript interfaces for the Todo application

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  dueDate?: string; // ISO date string, optional
}

export interface UserSession {
  token: string;
  userId: string;
  expiresAt: string; // ISO date string
  isLoggedIn: boolean;
}

export interface UIState {
  loading: boolean;
  error?: string;
  success?: string;
  currentView: string;
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
}

export interface FilterState {
  showCompleted: boolean;
  sortBy: 'createdAt' | 'dueDate' | 'title';
  sortDirection: 'asc' | 'desc';
  searchQuery?: string;
}