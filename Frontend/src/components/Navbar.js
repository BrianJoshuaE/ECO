import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${darkMode ? 'dark' : 'light'}`}>
      <div className="navbar-brand">EcoCollect</div>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to={user.role === 'collector' ? '/collector' : user.role === 'admin' ? '/admin' : '/client'}>Dashboard</Link>
            <Link to="/request">Request</Link>
            <Link to="/available-jobs">Available Jobs</Link>
            <Link to="/my-jobs">My Jobs</Link>
            <Link to="/feedback">Feedback</Link>
            <Link to="/messages">Messages</Link>
            <Link to="/payment">Payment</Link>
            <Link to="/education">Education</Link>
            <Link to="/map">Map</Link>
            <button className="theme-toggle" onClick={toggleTheme}>{darkMode ? 'Light' : 'Dark'}</button>
            <button className="btn-logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
