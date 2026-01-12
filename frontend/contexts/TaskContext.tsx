'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Task } from '@/shared/types/types';

import { fetchTasks as fetchTasksService, createTask as createTaskService, updateTask as updateTaskService, deleteTask as deleteTaskService, toggleTaskCompletion as toggleTaskCompletionService } from '@/services/tasks/taskService';

// Define action types
type TaskAction =
  | { type: 'FETCH_TASKS_START' }
  | { type: 'FETCH_TASKS_SUCCESS'; payload: Task[] }
  | { type: 'FETCH_TASKS_ERROR'; payload: string }
  | { type: 'CREATE_TASK_START' }
  | { type: 'CREATE_TASK_SUCCESS'; payload: Task }
  | { type: 'CREATE_TASK_ERROR'; payload: string }
  | { type: 'UPDATE_TASK_START' }
  | { type: 'UPDATE_TASK_SUCCESS'; payload: Task }
  | { type: 'UPDATE_TASK_ERROR'; payload: string }
  | { type: 'TOGGLE_COMPLETION_START' }
  | { type: 'TOGGLE_COMPLETION_SUCCESS'; payload: Task }
  | { type: 'TOGGLE_COMPLETION_ERROR'; payload: string }
  | { type: 'DELETE_TASK_START' }
  | { type: 'DELETE_TASK_SUCCESS'; payload: string }
  | { type: 'DELETE_TASK_ERROR'; payload: string }
  | { type: 'SET_FILTER'; payload: { showCompleted: boolean } };

// Define context type
interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: { showCompleted: boolean };
  fetchTasks: () => void;
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  toggleTaskCompletion: (id: string, completed: boolean) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: { showCompleted: boolean }) => void;
}

// Initial state
const initialState: {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: { showCompleted: boolean };
} = {
  tasks: [],
  loading: false,
  error: null,
  filters: { showCompleted: false },
};

// Reducer function
const taskReducer = (state: typeof initialState, action: TaskAction): typeof initialState => {
  switch (action.type) {
    case 'FETCH_TASKS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case 'FETCH_TASKS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'CREATE_TASK_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'CREATE_TASK_SUCCESS':
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
      };
    case 'CREATE_TASK_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'UPDATE_TASK_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'UPDATE_TASK_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'TOGGLE_COMPLETION_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'TOGGLE_COMPLETION_SUCCESS':
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'TOGGLE_COMPLETION_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'DELETE_TASK_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'DELETE_TASK_SUCCESS':
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'DELETE_TASK_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider component
interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = async () => {
    dispatch({ type: 'FETCH_TASKS_START' });
    try {
      const result = await fetchTasksService();
      if (result.success && result.data) {
        dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: result.data });
      } else {
        dispatch({ type: 'FETCH_TASKS_ERROR', payload: result.error || 'Failed to fetch tasks' });
      }
    } catch (error) {
      dispatch({
        type: 'FETCH_TASKS_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to fetch tasks'
      });
    }
  };

  const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'CREATE_TASK_START' });
    try {
      const result = await createTaskService(task);
      if (result.success && result.data) {
        dispatch({ type: 'CREATE_TASK_SUCCESS', payload: result.data });
      } else {
        dispatch({ type: 'CREATE_TASK_ERROR', payload: result.error || 'Failed to create task' });
      }
    } catch (error) {
      dispatch({
        type: 'CREATE_TASK_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to create task'
      });
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    dispatch({ type: 'UPDATE_TASK_START' });
    try {
      const result = await updateTaskService(id, updates);
      if (result.success && result.data) {
        dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: result.data });
      } else {
        dispatch({ type: 'UPDATE_TASK_ERROR', payload: result.error || 'Failed to update task' });
      }
    } catch (error) {
      dispatch({
        type: 'UPDATE_TASK_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to update task'
      });
    }
  };

  const deleteTask = async (id: string) => {
    dispatch({ type: 'DELETE_TASK_START' });
    try {
      const result = await deleteTaskService(id);
      if (result.success) {
        dispatch({ type: 'DELETE_TASK_SUCCESS', payload: id });
      } else {
        dispatch({ type: 'DELETE_TASK_ERROR', payload: result.error || 'Failed to delete task' });
      }
    } catch (error) {
      dispatch({
        type: 'DELETE_TASK_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to delete task'
      });
    }
  };

  const toggleTaskCompletion = async (id: string, completed: boolean) => {
    dispatch({ type: 'TOGGLE_COMPLETION_START' });
    try {
      const result = await toggleTaskCompletionService(id, completed);
      if (result.success && result.data) {
        dispatch({ type: 'TOGGLE_COMPLETION_SUCCESS', payload: result.data });
      } else {
        dispatch({ type: 'TOGGLE_COMPLETION_ERROR', payload: result.error || 'Failed to toggle task completion' });
      }
    } catch (error) {
      dispatch({
        type: 'TOGGLE_COMPLETION_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to toggle task completion'
      });
    }
  };

  const setFilter = (filter: { showCompleted: boolean }) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        loading: state.loading,
        error: state.error,
        filters: state.filters,
        fetchTasks,
        createTask,
        updateTask,
        toggleTaskCompletion,
        deleteTask,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};