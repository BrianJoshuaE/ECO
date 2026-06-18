import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import './MyJobs.css';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get('/jobs/my');
        setJobs(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="my-jobs-page">
      <h1>My Jobs</h1>
      <div className="jobs-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.wasteType}</h3>
            <p>{job.description}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Location:</strong> {job.pickupLocation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
