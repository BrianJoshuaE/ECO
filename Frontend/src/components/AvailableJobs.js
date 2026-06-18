import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import './AvailableJobs.css';

const AvailableJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get('/jobs/available');
        setJobs(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  const acceptJob = async (id) => {
    try {
      await axiosInstance.put(`/jobs/${id}/accept`);
      setMessage('Job accepted');
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      setMessage('Unable to accept job');
    }
  };

  return (
    <div className="available-jobs">
      <h1>Available Jobs</h1>
      {message && <p className="message">{message}</p>}
      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.wasteType}</h3>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.pickupLocation}</p>
            <button className="btn-primary" onClick={() => acceptJob(job.id)}>Accept Job</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableJobs;
