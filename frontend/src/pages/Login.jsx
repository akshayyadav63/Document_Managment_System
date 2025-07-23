import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Assuming you have an AuthContext for managing authentication state
import docImage from '../assets/image.png';

function Login() {
 const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data.token); // Store token in context
      navigate('/dashboard'); // Redirect to dashboard

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-blue-950">
      <div className="flex shadow-xl rounded-lg overflow-hidden max-w-3xl w-full">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-white dark:bg-gray-800 px-8 py-12 w-1/2">
          <img
            src={docImage}
            alt="Document Illustration"
            className="w-full mb-6"
          />
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2">
            Document Management System
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Securely manage, share, and access your documents anytime, anywhere.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white dark:bg-gray-900 px-8 py-12 w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-xl font-semibold text-center mb-6 text-blue-800 dark:text-blue-300">
            Welcome Back!
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your password"
                required
              />
              <div className="flex justify-end mt-1">
                <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
  Forgot Password?
</Link>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
                  defaultChecked
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <Link to="/signup" className="text-xs text-blue-600 hover:underline">
  Create Account
</Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-md transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
