'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiClient } from '@/shared/api/api';
import { useTask } from '@/contexts/TaskContext';
import InputField from '@/components/forms/InputField';
import TextAreaField from '@/components/forms/TextAreaField';

const EditTaskPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const taskId = params?.id as string;
  const { tasks, updateTask } = useTask();

  // Redirect if taskId is not available
  useEffect(() => {
    if (!taskId) {
      router.push('/dashboard');
    }
  }, [taskId, router]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Find the task to edit
  useEffect(() => {
    if (taskId && tasks.length > 0) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description || '');
        setDueDate(task.dueDate || '');
        setCompleted(task.completed);
      } else {
        // Handle case where task is not found
        router.push('/dashboard'); // Redirect if task doesn't exist
      }
    }
  }, [taskId, tasks, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiClient.updateTask(taskId, {
        title,
        description: description || undefined,
        dueDate: dueDate || undefined,
        completed
      });

      // Update the task in the context
      updateTask(taskId, {
        title,
        description: description || undefined,
        dueDate: dueDate || undefined,
        completed
      });

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Edit Task</h1>
        <p className="mt-2 text-gray-600">Update your task details</p>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

      <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            id="title"
            name="title"
            label="Task Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="What needs to be done?"
          />

          <TextAreaField
            id="description"
            name="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details about this task..."
            rows={4}
          />

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date (Optional)
            </label>
            <div className="mt-1">
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">
              Mark as completed
            </label>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskPage;