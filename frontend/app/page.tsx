import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to FAJ Todo App
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Transform your CLI-based todo application into a beautiful, modern UI experience
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Choose Your Experience</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center"
            >
              <h3 className="text-xl font-bold mb-2">Task Dashboard</h3>
              <p className="text-indigo-100">Modern task management interface</p>
            </Link>

            <Link
              href="/todo-dashboard"
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center"
            >
              <h3 className="text-xl font-bold mb-2">Todo Dashboard</h3>
              <p className="text-green-100">Complete CLI to UI transformation</p>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Features Available:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-medium text-blue-800">Basic Level</p>
                <p className="text-blue-600">Add, View, Delete</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="font-medium text-yellow-800">Intermediate</p>
                <p className="text-yellow-600">Categories, Priorities, Filters</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="font-medium text-purple-800">Advanced</p>
                <p className="text-purple-600">Dates, Recurring, Stats</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}