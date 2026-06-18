import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ClientDashboard from './components/ClientDashboard';
import CollectorDashboard from './components/CollectorDashboard';
import AdminDashboard from './components/AdminDashboard';
import RequestJob from './components/RequestJob';
import AvailableJobs from './components/AvailableJobs';
import MyJobs from './components/MyJobs';
import Feedback from './components/Feedback';
import Messages from './components/Messages';
import Payment from './components/Payment';
import Education from './components/Education';
import Map from './components/Map';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/client" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
            <Route path="/collector" element={<ProtectedRoute><CollectorDashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/request" element={<ProtectedRoute><RequestJob /></ProtectedRoute>} />
            <Route path="/available-jobs" element={<ProtectedRoute><AvailableJobs /></ProtectedRoute>} />
            <Route path="/my-jobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
            <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
            <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
