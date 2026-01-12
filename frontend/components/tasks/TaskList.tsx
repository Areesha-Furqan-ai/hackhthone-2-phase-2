'use client';

import React from 'react';
import { Task } from '@/shared/types/types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  // Separate completed and incomplete tasks for display
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-4">
      {incompleteTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Pending Tasks</h2>
          <div className="space-y-3">
            {incompleteTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Completed Tasks</h2>
          <div className="space-y-3">
            {completedTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;