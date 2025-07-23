import React from 'react';
import Navbar from '../components/Navbar';
import FileList from '../components/FileList';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Example stats cards */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-700 dark:text-blue-400">12</span>
            <span className="text-gray-700 dark:text-gray-300 mt-2">Folders</span>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-700 dark:text-blue-400">34</span>
            <span className="text-gray-700 dark:text-gray-300 mt-2">Files</span>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-700 dark:text-blue-400">5</span>
            <span className="text-gray-700 dark:text-gray-300 mt-2">Shared</span>
          </div>
        </div>
        {/* File List Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">Your Files</h2>
          <FileList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;