import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      toast.success('Registration successful!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const login = useCallback((token) => {
    try {
      const decodedToken = jwtDecode(token);
      localStorage.setItem('token', token);
      setUser(decodedToken);
    } catch (error) {
      toast.error('Failed to process login');
      throw error;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully!');
  };

  const handleGoogleCallback = async (token) => {
    try {
      const response = await axios.get(API_ENDPOINTS.GOOGLE_CALLBACK, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const { user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      toast.success('Google authentication successful!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google authentication failed');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    handleGoogleCallback
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 