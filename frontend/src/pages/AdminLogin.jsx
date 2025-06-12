import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_ENDPOINTS } from "../config/api";

const AdminLogin = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user) {
      toast.info("You are already logged in!");
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_ENDPOINTS.LOGIN,
        { email, password, confirmPassword, role: "Admin" },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message || "Login successful!");
      login(response.data.token, response.data.user);
      navigateTo("/admin/dashboard");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };
  // ... rest of the component code ...
}; 