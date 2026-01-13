'use client';

import React from 'react';
import Link from 'next/link';

const OfflinePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.874-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">You are offline</h2>
          <p className="mt-2 text-gray-600">
            It looks like you're not connected to the internet. Please check your connection and try again.
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Retry Connection
          </button>

          <div className="mt-4">
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Return to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;