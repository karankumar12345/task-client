/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useDashBoardDataQuery } from '@/redux/features/auth/apiauth';

const Dashboard = () => {
  const { data, isLoading, error } = useDashBoardDataQuery({});

  if (isLoading) return <p className="text-center mt-10 text-lg font-bold">Loading Dashboard Data...</p>;

  if (error) return <p className="text-center mt-10 text-red-500 font-bold">Error</p>;

  const {
    totalTasks,
    completedTasks,
    pendingTasks,
    averageTimePerTask,
    totalPendingTime,
    estimatedTimeRemaining,
    taskPriorityStats,
  } = data;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Dashboard Overview
      </h1>

      {/* Cards for basic statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tasks */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-500 mb-2">Total Tasks</h2>
            <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-green-500 mb-2">Completed Tasks</h2>
            <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
            <p className="text-gray-600 mt-1">
              {Math.round((completedTasks / totalTasks) * 100)}%
            </p>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-yellow-500 mb-2">Pending Tasks</h2>
            <p className="text-3xl font-bold text-yellow-600">{pendingTasks}</p>
            <p className="text-gray-600 mt-1">
              {Math.round((pendingTasks / totalTasks) * 100)}%
            </p>
          </div>
        </div>

        {/* Average Time per Completed Task */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-500 mb-2">Avg Time per Task</h2>
            <p className="text-3xl font-bold text-gray-900">
              {averageTimePerTask?.toFixed(2)} hrs
            </p>
          </div>
        </div>
      </div>

      {/* Pending Task Summary */}
      <div className="bg-white rounded-lg shadow-md mt-8 p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Pending Task Summary</h2>

        <div className="mb-4">
          <p className="text-lg font-medium text-gray-600">
            Total Pending Time: <span className="font-bold">{totalPendingTime?.toFixed(2)} hrs</span>
          </p>
          <p className="text-lg font-medium text-gray-600">
            Estimated Time to Finish: <span className="font-bold">{estimatedTimeRemaining?.toFixed(2)} hrs</span>
          </p>
        </div>

        {/* Task Priority Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg table-auto">
            <thead>
              <tr className="bg-gray-100">
                {['Task Priority', 'Pending Tasks', 'Total Time Elapsed (hrs)', 'Time to Finish (hrs)'].map((header) => (
                  <th key={header} className="border px-4 py-2 text-left font-medium text-gray-600">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {taskPriorityStats.map((stat:any) => (
                <tr key={stat._id} className="border-t">
                  <td className="border px-4 py-2 text-gray-700">{stat?._id}</td>
                  <td className="border px-4 py-2 text-gray-700">{stat?.count}</td>
                  <td className="border px-4 py-2 text-gray-700">
                    {(stat?.totalElapsedTime / 3600000)?.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2 text-gray-700">
                    {(stat?.totalEstimatedTime / 3600000)?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
