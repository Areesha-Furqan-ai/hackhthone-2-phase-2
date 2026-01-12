import { Task } from '@/shared/types/types';

// Define additional types that match the backend API
interface BackendTask {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to create request headers
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Convert backend task to frontend task
const convertBackendTaskToFrontendTask = (backendTask: BackendTask): Task => {
  return {
    id: backendTask._id,
    title: backendTask.title,
    description: backendTask.description,
    completed: backendTask.completed,
    createdAt: backendTask.createdAt,
    updatedAt: backendTask.updatedAt,
    dueDate: undefined, // Backend doesn't have dueDate, set to undefined
  };
};

// Fetch all tasks
export const fetchTasks = async (): Promise<{ success: boolean; data?: Task[]; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || `Failed to fetch tasks: ${response.statusText}` };
    }

    const data = await response.json();
    const backendTasks: BackendTask[] = data.todos || [];

    // Convert backend tasks to frontend tasks
    const tasks = backendTasks.map(convertBackendTaskToFrontendTask);
    return { success: true, data: tasks };
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

// Create a new task
export const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data?: Task; error?: string }> => {
  try {
    // Prepare task data for the backend API
    const backendTaskData = {
      title: taskData.title,
      description: taskData.description,
      completed: taskData.completed,
    };

    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(backendTaskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || `Failed to create task: ${response.statusText}` };
    }

    const responseData = await response.json();
    const backendTask: BackendTask = responseData;

    // Convert the response to frontend Task format
    const task = convertBackendTaskToFrontendTask(backendTask);
    return { success: true, data: task };
  } catch (error) {
    console.error('Error creating task:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

// Update a task
export const updateTask = async (taskId: string, taskData: Partial<Task>): Promise<{ success: boolean; data?: Task; error?: string }> => {
  try {
    // Prepare task data for the backend API
    const backendTaskData = {
      title: taskData.title,
      description: taskData.description,
      completed: taskData.completed,
    };

    const response = await fetch(`${API_BASE_URL}/todos/${taskId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(backendTaskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || `Failed to update task: ${response.statusText}` };
    }

    const responseData = await response.json();
    const backendTask: BackendTask = responseData;

    // Convert the response to frontend Task format
    const task = convertBackendTaskToFrontendTask(backendTask);
    return { success: true, data: task };
  } catch (error) {
    console.error('Error updating task:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${taskId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || `Failed to delete task: ${response.statusText}` };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

// Toggle task completion status
export const toggleTaskCompletion = async (taskId: string, completed?: boolean): Promise<{ success: boolean; data?: Task; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${taskId}/toggle`, {
      method: 'PATCH',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || `Failed to toggle task completion: ${response.statusText}` };
    }

    const responseData = await response.json();
    const backendTask: BackendTask = responseData;

    // Convert the response to frontend Task format
    const task = convertBackendTaskToFrontendTask(backendTask);
    return { success: true, data: task };
  } catch (error) {
    console.error('Error toggling task completion:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};