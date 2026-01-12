'use client';

import React, { useState } from 'react';
import BasicLevel from '@/components/todo-levels/BasicLevel';
import IntermediateLevel from '@/components/todo-levels/IntermediateLevel';
import AdvancedLevel from '@/components/todo-levels/AdvancedLevel';

const TodoDashboard = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'intermediate' | 'advanced'>('basic');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Assalam-o-Alaikum
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            Welcome to FAJ Todo App
          </p>
          <div className="mt-4 h-1 w-24 bg-indigo-500 mx-auto rounded-full"></div>
        </header>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white rounded-xl p-2 shadow-lg">
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'basic'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-indigo-100'
            }`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Level
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'intermediate'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-indigo-100'
            }`}
            onClick={() => setActiveTab('intermediate')}
          >
            Intermediate Level
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'advanced'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-indigo-100'
            }`}
            onClick={() => setActiveTab('advanced')}
          >
            Advanced Level
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300">
          {activeTab === 'basic' && <BasicLevel />}
          {activeTab === 'intermediate' && <IntermediateLevel />}
          {activeTab === 'advanced' && <AdvancedLevel />}
        </div>
      </div>
    </div>
  );
};

export default TodoDashboard;