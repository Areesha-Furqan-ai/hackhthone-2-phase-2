import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border rounded-lg p-4 bg-gray-100">
          <div className="flex items-center">
            <div className="h-5 w-5 bg-gray-300 rounded mr-3"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="flex justify-between items-center">
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                <div className="flex space-x-2">
                  <div className="h-3 bg-gray-300 rounded w-10"></div>
                  <div className="h-3 bg-gray-300 rounded w-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;