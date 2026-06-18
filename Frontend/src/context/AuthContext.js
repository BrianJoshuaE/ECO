import React, { createContext, useContext, useState } from 'react';
import axiosInstance from '../api/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    setUser(response.data.user);
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token);
    return response.data;
  };

  const register = async (data) => {
    const response = await axiosInstance.post('/auth/register', data);
    setUser(response.data.user);
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
