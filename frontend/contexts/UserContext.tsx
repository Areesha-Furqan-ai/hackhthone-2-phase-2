'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { UserSession } from '@/shared/types/types';

// Define action types
type UserAction =
  | { type: 'LOGIN_SUCCESS'; payload: { token: string; user: any } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Define context type
interface UserContextType {
  userSession: UserSession | null;
  loading: boolean;
  error: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
}

// Initial state
const initialState: {
  userSession: UserSession | null;
  loading: boolean;
  error: string | null;
} = {
  userSession: null,
  loading: false,
  error: null,
};

// Reducer function
const userReducer = (state: typeof initialState, action: UserAction): typeof initialState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userSession: {
          token: action.payload.token,
          userId: action.payload.user.id,
          expiresAt: action.payload.user.expiresAt,
          isLoggedIn: true,
        },
        loading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        userSession: null,
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = (token: string, user: any) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <UserContext.Provider
      value={{
        userSession: state.userSession,
        loading: state.loading,
        error: state.error,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};