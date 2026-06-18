import React, { useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import './Messages.css';

const Messages = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/messages', {
        receiverId: '00000000-0000-0000-0000-000000000000',
        message,
      });
      setMessages([...messages, response.data]);
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="messages-page">
      <h1>Messages</h1>
      <div className="messages-card">
        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className="message-item">
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="message-form">
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
          <button type="submit" className="btn-primary">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
