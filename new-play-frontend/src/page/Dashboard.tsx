import React from 'react';
import Sidebare from '../components/Sidebare';

const Dashboard: React.FC = () => {
    
  return (
    <div className="flex min-h-screen bg-gray-500">
    {/* Sidebar */}
      <Sidebare/>
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
            <p className="text-4xl text-purple-600 mt-2">1,245</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Active Orders</h2>
            <p className="text-4xl text-green-600 mt-2">320</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Revenue</h2>
            <p className="text-4xl text-yellow-600 mt-2">$12,430</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-700">Recent Activity</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-gray-600">User JohnDoe added a new post.</span>
                <span className="text-sm text-gray-500">2 mins ago</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">Admin updated the settings.</span>
                <span className="text-sm text-gray-500">15 mins ago</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">User Alice uploaded a new file.</span>
                <span className="text-sm text-gray-500">30 mins ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
