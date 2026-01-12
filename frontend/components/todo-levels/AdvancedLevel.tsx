'use client';

import React, { useState, useEffect } from 'react';
import { Edit3, Trash2, CheckCircle, Circle, Calendar, Clock, Repeat, BarChart3, Search, Filter, SortAsc, SortDesc } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  dueTime?: string;
  recurring: 'none' | 'daily' | 'weekly';
}

const AdvancedLevel = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Personal',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: '',
    dueTime: '',
    recurring: 'none' as 'none' | 'daily' | 'weekly'
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'createdAt'>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('advanced-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('advanced-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Handle adding a new task
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
      description: newTask.description.trim(),
      category: newTask.category,
      priority: newTask.priority,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: newTask.dueDate || undefined,
      dueTime: newTask.dueTime || undefined,
      recurring: newTask.recurring
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      category: 'Personal',
      priority: 'medium',
      dueDate: '',
      dueTime: '',
      recurring: 'none'
    });
  };

  // Handle updating a task
  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!editingTask?.title.trim()) {
      setError('Task title is required');
      return;
    }

    setTasks(tasks.map(task =>
      task.id === editingTask.id ? editingTask : task
    ));
    setEditingTask(null);
  };

  // Delete a task
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle task completion
  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Start editing a task
  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTask(null);
  };

  // Filter tasks based on selected filter and search query
  const filteredAndSearchedTasks = tasks.filter(task => {
    // Apply filter
    let passesFilter = true;
    if (filter === 'completed') passesFilter = task.completed;
    else if (filter === 'pending') passesFilter = !task.completed;

    // Apply search
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase());

    return passesFilter && matchesSearch;
  });

  // Sort tasks
  const sortedTasks = [...filteredAndSearchedTasks].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sortBy === 'dueDate') {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      comparison = dateA - dateB;
    } else if (sortBy === 'createdAt') {
      comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Priority badge color mapping
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Recurring badge color mapping
  const getRecurringColor = (recurring: string) => {
    switch (recurring) {
      case 'daily': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'weekly': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Format date and time
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const formatTime = (timeStr: string) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-8">
      <div className="bg-indigo-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
          <span className="bg-indigo-600 text-white p-2 rounded-lg">3</span>
          Advanced Level Features
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <li className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-full">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <span>Due Dates</span>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-full">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <span>Recurring</span>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-full">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <span>Search</span>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-full">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <span>Sort</span>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-full">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <span>Stats</span>
          </li>
        </ul>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Tasks</p>
              <p className="text-3xl font-bold">{totalTasks}</p>
            </div>
            <BarChart3 size={40} className="opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Completed</p>
              <p className="text-3xl font-bold">{completedTasks}</p>
            </div>
            <CheckCircle size={40} className="opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Pending</p>
              <p className="text-3xl font-bold">{pendingTasks}</p>
            </div>
            <Clock size={40} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h3>

        {(editingTask ? (
          <form onSubmit={handleUpdateTask} className="space-y-4">
            <div>
              <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                type="text"
                id="edit-title"
                value={editingTask.title}
                onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="What needs to be done?"
              />
            </div>
            <div>
              <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                id="edit-description"
                value={editingTask.description || ''}
                onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Add details..."
                rows={2}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="edit-category"
                  value={editingTask.category}
                  onChange={(e) => setEditingTask({...editingTask, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                >
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div>
                <label htmlFor="edit-priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="edit-priority"
                  value={editingTask.priority}
                  onChange={(e) => setEditingTask({...editingTask, priority: e.target.value as 'low' | 'medium' | 'high'})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label htmlFor="edit-due-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  id="edit-due-date"
                  value={editingTask.dueDate || ''}
                  onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label htmlFor="edit-due-time" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Time
                </label>
                <input
                  type="time"
                  id="edit-due-time"
                  value={editingTask.dueTime || ''}
                  onChange={(e) => setEditingTask({...editingTask, dueTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="edit-recurring" className="block text-sm font-medium text-gray-700 mb-1">
                  Recurring
                </label>
                <select
                  id="edit-recurring"
                  value={editingTask.recurring}
                  onChange={(e) => setEditingTask({...editingTask, recurring: e.target.value as 'none' | 'daily' | 'weekly'})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                >
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 font-medium"
              >
                Update Task
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={newTask.category}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                >
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'low' | 'medium' | 'high'})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label htmlFor="due-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  id="due-date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label htmlFor="due-time" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Time
                </label>
                <input
                  type="time"
                  id="due-time"
                  value={newTask.dueTime}
                  onChange={(e) => setNewTask({...newTask, dueTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="recurring" className="block text-sm font-medium text-gray-700 mb-1">
                  Recurring
                </label>
                <select
                  id="recurring"
                  value={newTask.recurring}
                  onChange={(e) => setNewTask({...newTask, recurring: e.target.value as 'none' | 'daily' | 'weekly'})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                >
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 font-medium"
            >
              Add Task
            </button>
          </form>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'pending')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <SortAsc size={18} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'priority' | 'dueDate' | 'createdAt')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
              <option value="createdAt">Created At</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {sortDirection === 'asc' ? (
              <SortAsc
                size={18}
                className="text-indigo-600 cursor-pointer"
                onClick={() => setSortDirection('desc')}
              />
            ) : (
              <SortDesc
                size={18}
                className="text-indigo-600 cursor-pointer"
                onClick={() => setSortDirection('asc')}
              />
            )}
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Your Tasks ({sortedTasks.length})
        </h3>

        {sortedTasks.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-gray-400 mb-4">
              {searchQuery
                ? 'No tasks match your search.'
                : filter === 'all'
                  ? 'No tasks yet. Add your first task!'
                  : filter === 'completed'
                    ? 'No completed tasks yet.'
                    : 'No pending tasks. Great job!'}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-start p-4 rounded-lg border ${
                  task.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                } hover:shadow-sm transition-shadow`}
              >
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="mr-3 mt-1 p-1 text-gray-500 hover:text-indigo-600 transition-colors"
                  title={task.completed ? "Mark as pending" : "Mark as completed"}
                >
                  {task.completed ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <Circle size={20} />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium ${
                      task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full border border-blue-200">
                      {task.category}
                    </span>
                    {task.recurring !== 'none' && (
                      <span className={`text-xs px-2 py-1 rounded-full border ${getRecurringColor(task.recurring)}`}>
                        <Repeat size={10} className="inline mr-1" />
                        {task.recurring}
                      </span>
                    )}
                  </div>

                  {task.description && (
                    <p className={`text-sm mt-1 ${
                      task.completed ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {task.dueDate ? formatDate(task.dueDate) : 'No due date'}
                    </span>
                    {task.dueTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {formatTime(task.dueTime)}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => startEditing(task)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit task"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedLevel;