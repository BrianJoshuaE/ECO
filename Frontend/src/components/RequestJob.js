import React, { useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import './RequestJob.css';

const RequestJob = () => {
  const [formData, setFormData] = useState({
    wasteType: 'mixed',
    description: '',
    pickupLocation: '',
    latitude: '',
    longitude: '',
    scheduledDate: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/jobs', formData);
      setMessage('Job request submitted successfully');
    } catch (err) {
      setMessage('Unable to submit request');
    }
  };

  return (
    <div className="request-job-page">
      <div className="request-job-card">
        <h2>Request Pickup</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Waste Type</label>
            <select name="wasteType" value={formData.wasteType} onChange={handleChange}>
              <option value="paper">Paper</option>
              <option value="plastic">Plastic</option>
              <option value="organic">Organic</option>
              <option value="electronic">Electronic</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" />
          </div>
          <div className="form-group">
            <label>Pickup Location</label>
            <input name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} required />
          </div>
          <div className="form-group inline">
            <div>
              <label>Latitude</label>
              <input name="latitude" value={formData.latitude} onChange={handleChange} />
            </div>
            <div>
              <label>Longitude</label>
              <input name="longitude" value={formData.longitude} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Scheduled Date</label>
            <input type="datetime-local" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-primary">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default RequestJob;
