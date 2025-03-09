'use client';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalCategories: 0,
    totalUsers: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await fetchApi('/admin/stats');
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
          <p className="text-3xl font-semibold mt-2">{stats.totalPosts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Categories</h3>
          <p className="text-3xl font-semibold mt-2">{stats.totalCategories}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Users</h3>
          <p className="text-3xl font-semibold mt-2">{stats.totalUsers}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        {/* Add recent activity content here */}
      </div>
    </div>
  );
}