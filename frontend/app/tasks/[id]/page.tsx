'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTask } from '@/contexts/TaskContext';
import { formatDate } from '@/shared/utils/utils';

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { tasks, loading, error } = useTask();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    if (tasks.length > 0) {
      const foundTask = tasks.find((t: any) => t.id === id);
      setTask(foundTask || null);
    }
  }, [tasks, id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 px-4 py-3 rounded relative" role="alert">
          Task not found
        </div>
        <div className="mt-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Task Details</h1>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className={`text-lg leading-6 font-medium ${
            task.completed ? 'text-green-600 line-through' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {task.completed ? 'Completed' : 'Pending'} Task
          </p>
        </div>
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className={`mt-1 text-sm ${
                task.completed ? 'text-green-600' : 'text-gray-900'
              }`}>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  task.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Created</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(task.createdAt)}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Updated</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(task.updatedAt)}</dd>
            </div>
            {task.dueDate && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(task.dueDate)}</dd>
              </div>
            )}
          </dl>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-gray-700">
              {task.description || 'No description provided.'}
            </p>
          </div>

          <div className="flex space-x-4">
            <Link
              href={`/tasks/${task.id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Task
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}