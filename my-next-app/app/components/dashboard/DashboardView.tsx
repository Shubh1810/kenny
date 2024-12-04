"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBatteryFull, FaBrain, FaMicrochip, FaClock, FaDollarSign, FaCloudSun, FaRocket } from 'react-icons/fa';

export function DashboardView() {
  const [systemStatus, setSystemStatus] = useState(50); // Default value
  const [aiActivity, setAiActivity] = useState(50); // Default value
  const [time, setTime] = useState(new Date());
  const [bankBalance] = useState(123456.78); // Example balance
  const [heights, setHeights] = useState<number[]>(Array(30).fill(50)); // Default value

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(Math.random() * 100);
      setAiActivity(Math.random() * 100);
      setTime(new Date());
      setHeights(Array(30).fill(0).map(() => Math.random() * 100));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* JARVIS Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white/90 mb-2">
          Welcome back, Sir
        </h1>
        <p className="text-white/70">
          All systems are operational. How may I assist you today?
        </p>
      </motion.div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SystemMetricCard
          icon={<FaBatteryFull className="h-8 w-8 text-blue-400" />}
          label="System Power"
          value={`${Math.round(systemStatus)}%`}
          color="blue"
        />
        <SystemMetricCard
          icon={<FaBrain className="h-8 w-8 text-purple-400" />}
          label="AI Core Status"
          value={`${Math.round(aiActivity)}%`}
          color="purple"
        />
        <SystemMetricCard
          icon={<FaMicrochip className="h-8 w-8 text-green-400" />}
          label="Processing Load"
          value={`${Math.round(Math.random() * 100)}%`}
          color="green"
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Activity Monitor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white/90 mb-4 flex items-center gap-2">
            <FaBrain className="h-5 w-5 text-blue-400" />
            AI Neural Activity
          </h2>
          <div className="h-48 flex items-end gap-1">
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
        </motion.div>

        {/* Recent Operations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white/90 mb-4 flex items-center gap-2">
            <FaMicrochip className="h-5 w-5 text-green-400" />
            Recent Operations
          </h2>
          <div className="space-y-4">
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
        </motion.div>

        {/* Live Time and Bank Balance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white/90 mb-4 flex items-center gap-2">
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
        </motion.div>

        {/* Weather Widget */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white/90 mb-4 flex items-center gap-2">
            <FaCloudSun className="h-5 w-5 text-blue-400" />
            Weather Update
          </h2>
          <div className="text-white/90">
            <p className="text-lg">Sunny, 72°F</p>
            <p className="text-sm text-white/60">San Francisco, CA</p>
          </div>
        </motion.div>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 bg-${color}-400/10 rounded-lg`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <h3 className="text-2xl font-bold text-white/90">{value}</h3>
        </div>
      </div>
    </motion.div>
  );
}

function OperationItem({ text, time, icon }: {
  text: string;
  time: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
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
