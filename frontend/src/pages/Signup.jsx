// === src/pages/RegisterPage.js (or Signup.js) ===
import React, { useState } from 'react';
 import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import docImage from '../assets/image.png';

  

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log(form);
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      alert('Registration successful! You can now login.');
      navigate('/');
    }catch (err) {
  console.log('Signup error:', err); // Add this line
  if (err.code === 11000) {
    return res.status(400).json({ error: "Email already exists" });
  }
  res.status(400).json({ error: err.message });
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
            className="w-full  mb-6"
          />
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2">Document Management System</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Create your account to securely manage, share, and access your documents.
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="bg-white dark:bg-gray-900 px-8 py-12 w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-xl font-semibold text-center mb-6 text-blue-800 dark:text-blue-300">
            Create Account
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Your Name"
                required
              />
            </div>
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
                placeholder="Create a password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-md transition-all"
            >
              Sign Up
            </button>
            <div className="text-center mt-4">
              <Link to="/" className="text-sm text-blue-600 hover:underline">
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
