import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import './Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get('/admin/stats');
        setStats(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">{stats.totalUsers || 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Jobs</div>
          <div className="stat-value">{stats.totalJobs || 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Completed Jobs</div>
          <div className="stat-value">{stats.completedJobs || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
