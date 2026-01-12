'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Task } from '@/shared/types/types';
import { formatDate } from '@/shared/utils/utils';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import { useTask } from '@/contexts/TaskContext';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteTask, updateTask } = useTask();

  const handleDelete = () => {
    deleteTask(task.id);
    setShowDeleteModal(false);
  };

  const handleToggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  return (
    <div className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 ${
      task.completed
        ? 'bg-green-50 border-green-200'
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
        />
        <div className="ml-3 flex-1 min-w-0">
          <Link href={`/tasks/${task.id}/edit`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className={`text-base font-medium ${
              task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </p>
            {task.description && (
              <p className={`text-sm ${
                task.completed ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {task.description}
              </p>
            )}
          </Link>
          <div className="mt-2 flex items-center justify-between">
            {task.dueDate && (
              <p className={`text-sm ${
                task.completed ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Due: {formatDate(task.dueDate)}
              </p>
            )}
            <div className="flex space-x-2">
              <Link
                href={`/tasks/${task.id}/edit`}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </Link>
              <button
                className="text-sm font-medium text-red-600 hover:text-red-900"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonType="danger"
      />
    </div>
  );
};

export default TaskCard;