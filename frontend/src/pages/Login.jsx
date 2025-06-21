import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleSignIn from "../components/GoogleSignIn";
import { API_ENDPOINTS } from "../config/api";

const Login = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      toast.info("You are already logged in!");
    }
    // Show success or error messages from URL
    const params = new URLSearchParams(location.search);
    const success = params.get('success');
    const error = params.get('error');
    if (success) {
      toast.success(success);
      params.delete('success');
      navigateTo({ search: params.toString() }, { replace: true });
    }
    if (error) {
      toast.error(error);
      params.delete('error');
      navigateTo({ search: params.toString() }, { replace: true });
    }
  }, [user, location.search, navigateTo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_ENDPOINTS.LOGIN,
        { email, password, confirmPassword, role: "Patient" },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      toast.success(response.data.message || "Login successful!");
      login(response.data.token, response.data.user);
      navigateTo("/");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login-page">
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Welcome to the official login portal of Nivora Care Hospital.
          Access your personalized dashboard to manage appointments, view medical
          records, receive prescriptions, and stay connected with your healthcare provider.
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              className="register-link"
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
        
        <div className="mt-4 separator">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-4">
            <GoogleSignIn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;