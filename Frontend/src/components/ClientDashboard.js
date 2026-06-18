import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import './Dashboard.css';

const ClientDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/jobs/my');
        const jobs = response.data;
        const pending = jobs.filter((job) => job.status === 'pending').length;
        const completed = jobs.filter((job) => job.status === 'completed').length;
        setStats({ total: jobs.length, pending, completed });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Client Dashboard</h1>
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-label">Total Requests</div>
          <div className="stat-value">{stats.total || 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending</div>
          <div className="stat-value">{stats.pending || 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{stats.completed || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
