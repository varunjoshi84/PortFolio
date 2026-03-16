import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('import.meta.env.VITE_API_URL/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('adminToken', response.data.access_token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-8 bg-[#0a0a0a] border border-white/10 rounded-sm shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent">
            <Lock size={28} />
          </div>
          <h2 className="text-2xl font-heading text-text font-bold">Admin Portal</h2>
          <p className="text-[#888] text-sm mt-1">Sign in to manage portfolio content</p>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-[#a0a0a0]">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#111] border border-white/10 p-3 rounded-sm text-text focus:border-accent outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-[#a0a0a0]">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#111] border border-white/10 p-3 rounded-sm text-text focus:border-accent outline-none"
            />
          </div>
          <button 
            type="submit"
            className="mt-4 bg-accent text-background font-medium py-3 rounded-sm hover:bg-[#b09257] transition-colors"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
