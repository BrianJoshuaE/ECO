import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import './Payment.css';

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({ jobId: '', amount: '', method: 'mtn_momo' });

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get('/payments');
        setPayments(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPayments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/payments', formData);
      setFormData({ jobId: '', amount: '', method: 'mtn_momo' });
      alert('Payment recorded');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment</h1>
      <div className="payment-grid">
        <form className="payment-form" onSubmit={handleSubmit}>
          <label>Job ID</label>
          <input value={formData.jobId} onChange={(e) => setFormData({ ...formData, jobId: e.target.value })} required />
          <label>Amount</label>
          <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
          <label>Method</label>
          <select value={formData.method} onChange={(e) => setFormData({ ...formData, method: e.target.value })}>
            <option value="mtn_momo">MTN MoMo</option>
            <option value="airtel_money">Airtel Money</option>
            <option value="bank">Bank Transfer</option>
          </select>
          <button type="submit" className="btn-primary">Pay</button>
        </form>
        <div className="payment-history">
          <h2>History</h2>
          {payments.map((payment) => (
            <div key={payment.id} className="payment-item">
              <p><strong>Amount:</strong> {payment.amount}</p>
              <p><strong>Status:</strong> {payment.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;
