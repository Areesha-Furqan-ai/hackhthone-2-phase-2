'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../services/api';
const { todoAPI } = api;

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingData, setEditingData] = useState({ title: '', description: '' });
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Load todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const data = await todoAPI.getAll({}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setTodos(data.todos);
      } catch (err) {
        setError('Failed to load todos');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const createdTodo = await todoAPI.create({
        title: newTodo.title,
        description: newTodo.description,
        priority: 'medium'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setTodos([createdTodo, ...todos]);
      setNewTodo({ title: '', description: '' });
    } catch (err) {
      alert(err.message || 'Failed to create todo');
    }
  };

  const handleUpdateTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const updatedTodo = await todoAPI.update(id, editingData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setTodos(todos.map(todo =>
        todo._id === id ? updatedTodo : todo
      ));
      setEditingTodo(null);
      setEditingData({ title: '', description: '' });
    } catch (err) {
      alert(err.message || 'Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;

    try {
      const token = localStorage.getItem('token');
      await todoAPI.delete(id, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete todo');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const updatedTodo = await todoAPI.update(id, { status: newStatus }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setTodos(todos.map(todo =>
        todo._id === id ? updatedTodo : todo
      ));
    } catch (err) {
      alert(err.message || 'Failed to update todo status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Todo Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {JSON.parse(localStorage.getItem('user') || '{}').username}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Add Todo Form */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add New Todo
              </h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleCreateTodo} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="What needs to be done?"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Additional details..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Todo
                </button>
              </form>
            </div>
          </div>

          {/* Todo List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Your Todos ({todos.length})
              </h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4 mb-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              {todos.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No todos yet. Add one above!</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {todos.map((todo) => (
                    <li key={todo._id} className="py-4">
                      {editingTodo === todo._id ? (
                        <div className="bg-blue-50 p-4 rounded-md">
                          <div className="mb-3">
                            <input
                              type="text"
                              value={editingData.title}
                              onChange={(e) => setEditingData({...editingData, title: e.target.value})}
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-2"
                              placeholder="Todo title"
                            />
                            <textarea
                              value={editingData.description}
                              onChange={(e) => setEditingData({...editingData, description: e.target.value})}
                              rows={2}
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder="Todo description"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdateTodo(todo._id)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingTodo(null);
                                setEditingData({ title: '', description: '' });
                              }}
                              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${todo.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {todo.title}
                            </p>
                            {todo.description && (
                              <p className="text-sm text-gray-500 truncate">{todo.description}</p>
                            )}
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                                todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {todo.priority}
                              </span>
                              <span className="ml-2">
                                Created: {new Date(todo.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <select
                              value={todo.status}
                              onChange={(e) => handleStatusChange(todo._id, e.target.value)}
                              className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                            <button
                              onClick={() => {
                                setEditingTodo(todo._id);
                                setEditingData({ title: todo.title, description: todo.description || '' });
                              }}
                              className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTodo(todo._id)}
                              className="text-red-600 hover:text-red-900 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}