// components/dashboard/DashboardView.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from '../../context/AuthContext';
import { FaBatteryFull, FaBrain, FaMicrochip, FaClock, FaDollarSign, FaRocket } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Dynamically import the TradingViewWidget to prevent SSR issues
const TradingViewWidget = dynamic(() => import('../TradingViewWidget'), { ssr: false });

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;
const MotionH1 = motion.h1 as any;

export default function DashboardView() {
  const { user, isLoading, login, register, logout } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [heights] = useState<number[]>(Array(30).fill(50));
  const [time, setTime] = useState(new Date());
  const [bankBalance] = useState(123456.78);
  const [activeChart, setActiveChart] = useState<'BTC' | 'SOL' | null>(null);

  // Add this console.log to debug
  console.log('Current user state:', user);
  console.log('Is loading:', isLoading);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second instead of 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLoginMode) {
        await login(formData.username, formData.password);
        console.log('Login successful');  // Debug log
      } else {
        await register(formData.username, formData.email, formData.password);
        console.log('Registration successful');  // Debug log
      }
      // Clear form data after successful login/register
      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      console.error('Auth error:', err);  // Debug log
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-neutral-950/80 via-neutral-950/70 to-neutral-900/60">
        <div className="w-full max-w-md p-8 space-y-6 bg-white/5 rounded-lg shadow-md border border-white/10">
          <h1 className="text-2xl font-bold text-center text-white/90">
            {isLoginMode ? 'Login to Continue' : 'Create Account'}
          </h1>
          
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-900/20 rounded border border-red-500/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mt-1 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>

            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-white/70">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/70">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mt-1 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600/80 rounded-md hover:bg-blue-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoginMode ? 'Login' : 'Register'}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              {isLoginMode 
                ? "Don't have an account? Register" 
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Return your existing dashboard when user is logged in
  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-0 md:mt-8 p-4">
      {/* Left Column - Charts */}
      <div className="w-full lg:w-2/3 space-y-8">
        {/* Welcome Message */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-8"
        >
          <div className="flex justify-between items-center">
            <MotionH1
              className="bg-clip-text text-transparent text-left bg-gradient-to-br from-black via-gray-700 to-gray-800 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 text-4xl md:text-4xl lg:text-5xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              Welcome back, {user?.username}
            </MotionH1>
            <MotionButton
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={logout}
              className="px-4 py-2 text-white bg-red-600/80 hover:bg-red-700/80 rounded-md transition-colors duration-200"
            >
              Logout
            </MotionButton>
          </div>
          <p className="text-white/70">
            Will be able to create your account securely soon!! Keep visiting for new features. New updates every week.
          </p>
        </MotionDiv>

        {/* Updated Charts Section */}
        <div className="grid grid-cols-1 gap-6">
          {/* Simple buttons to toggle charts */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-6">
            <MotionButton 
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveChart(activeChart === 'BTC' ? null : 'BTC')}
              className={`px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 ${
                activeChart === 'BTC' ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              BTC/USD
            </MotionButton>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveChart(activeChart === 'SOL' ? null : 'SOL')}
              className={`px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 ${
                activeChart === 'SOL' ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              SOL/USD
            </MotionButton>
          </div>

          {/* Chart Container with improved animation */}
          <MotionDiv 
            className="w-full h-[400px] bg-white/5 rounded-xl overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: activeChart ? 1 : 0,
              height: activeChart ? 400 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {activeChart === 'BTC' && <TradingViewWidget symbol="BTCUSD" />}
            {activeChart === 'SOL' && <TradingViewWidget symbol="SOLUSD" />}
          </MotionDiv>
        </div>
      </div>

      {/* Right Column - Dashboard Metrics */}
      <div className="w-full lg:w-1/3 space-y-8">
        {/* Updated System Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SystemMetricCard
            icon={<FaBrain className="h-8 w-8 text-purple-400" />}
            label="AI Status"
            value="Active"
            color="purple"
          />
          <SystemMetricCard
            icon={<FaRocket className="h-8 w-8 text-green-400" />}
            label="System"
            value="Online"
            color="green"
          />
        </div>

        {/* AI Activity Monitor */}
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 p-4 rounded-xl border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white/90 mb-2 flex items-center gap-2">
            <FaBrain className="h-5 w-5 text-blue-400" />
            AI Neural Activity
          </h2>
          <div className="h-24 flex items-end gap-1">
            {heights.map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-blue-400/20 rounded-t"
                style={{
                  height: `${height}%`,
                  transition: 'height 0.5s ease'
                }}
              />
            ))}
          </div>
        </MotionDiv>

        {/* Recent Operations */}
        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 p-4 rounded-xl border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white/90 mb-2 flex items-center gap-2">
            <FaMicrochip className="h-5 w-5 text-green-400" />
            Recent Operations
          </h2>
          <div className="space-y-2">
            <OperationItem
              text="AI Model Training Complete"
              time="2 minutes ago"
              icon={<FaBrain className="h-4 w-4 text-purple-400" />}
            />
            <OperationItem
              text="System Optimization"
              time="15 minutes ago"
              icon={<FaRocket className="h-4 w-4 text-blue-400" />}
            />
            <OperationItem
              text="Security Scan Completed"
              time="1 hour ago"
              icon={<FaMicrochip className="h-4 w-4 text-green-400" />}
            />
          </div>
        </MotionDiv>

        {/* Live Time and Bank Balance */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 p-4 rounded-xl border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white/90 mb-2 flex items-center gap-2">
            <FaClock className="h-5 w-5 text-yellow-400" />
            Live Time & Bank Balance
          </h2>
          <div className="flex justify-between items-center">
            <div className="text-white/90">
              <p className="text-lg">{time.toLocaleTimeString()}</p>
              <p className="text-sm text-white/60">{time.toLocaleDateString()}</p>
            </div>
            <div className="text-white/90">
              <p className="text-lg flex items-center gap-1">
                <FaDollarSign className="h-5 w-5 text-green-400" />
                {bankBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}

function SystemMetricCard({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10"
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 bg-${color}-400/10 rounded-lg`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <h3 className="text-2xl font-bold text-white/90">{value}</h3>
        </div>
      </div>
    </MotionDiv>
  );
}

function OperationItem({ text, time, icon }: {
  text: string;
  time: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <div className="p-2 bg-white/5 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-white/90">{text}</p>
        <p className="text-sm text-white/50">{time}</p>
      </div>
    </div>
  );
}