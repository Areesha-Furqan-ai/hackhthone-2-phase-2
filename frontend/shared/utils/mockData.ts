// Mock data store for tasks
// In a real application, this would be a database
import { Task } from '@/shared/types/types';
import { generateId } from '@/shared/utils/utils';

// Using a getter/setter pattern to allow modification from different modules
let _tasks: Task[] = [
  {
    id: generateId(),
    title: 'Sample Task',
    description: 'This is a sample task to demonstrate the functionality',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  },
  {
    id: generateId(),
    title: 'Complete project',
    description: 'Finish the todo application project',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
  },
];

export const taskStore = {
  get: () => _tasks,
  set: (tasks: Task[]) => {
    _tasks = tasks;
  },
  reset: () => {
    _tasks = [
      {
        id: generateId(),
        title: 'Sample Task',
        description: 'This is a sample task to demonstrate the functionality',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      },
      {
        id: generateId(),
        title: 'Complete project',
        description: 'Finish the todo application project',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      },
    ];
  }
};