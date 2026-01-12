'use client';

import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
}

const BasicLevel = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('basic-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('basic-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newTask.title.trim()) {
      setError('Task title is required');
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title.trim(),
      description: newTask.description.trim()
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '' });
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="bg-indigo-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
          <span className="bg-indigo-600 text-white p-2 rounded-lg">1</span>
          Basic Level Features
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <li className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-full">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <span>Add Task</span>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-full">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <span>View Tasks</span>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-full">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <span>Delete Task</span>
          </li>
        </ul>
      </div>

      {/* Add Task Form */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h3>
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="What needs to be done?"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Add details..."
              rows={2}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 font-medium"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks ({tasks.length})</h3>

        {tasks.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-gray-400 mb-4">No tasks yet. Add your first task!</div>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1 truncate">{task.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete task"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicLevel;