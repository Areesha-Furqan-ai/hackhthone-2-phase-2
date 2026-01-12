import Link from 'next/link';

const DashboardPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Task Dashboard</h1>
        <p className="text-xl text-gray-600">Manage your tasks efficiently</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Your Task Dashboard</h2>
          <p className="text-gray-600 mb-6">
            This is the original task dashboard. You can also try our new CLI-to-UI transformation dashboard!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/todo-dashboard"
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-shadow duration-300 text-center"
            >
              Try CLI to UI Transformation
            </Link>

            <Link
              href="/tasks/create"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-shadow duration-300 text-center"
            >
              Create New Task
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-blue-50 p-5 rounded-xl text-center">
            <h3 className="font-bold text-blue-800 mb-2">Basic Tasks</h3>
            <p className="text-blue-600 text-sm">Add, view, delete tasks</p>
          </div>
          <div className="bg-yellow-50 p-5 rounded-xl text-center">
            <h3 className="font-bold text-yellow-800 mb-2">Intermediate</h3>
            <p className="text-yellow-600 text-sm">Categories, priorities, filters</p>
          </div>
          <div className="bg-purple-50 p-5 rounded-xl text-center">
            <h3 className="font-bold text-purple-800 mb-2">Advanced</h3>
            <p className="text-purple-600 text-sm">Dates, recurring, statistics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;