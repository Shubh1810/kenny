"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTasks, FaTerminal, FaBook, FaRobot, FaPlay, FaStop, FaCog } from 'react-icons/fa';

interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'stopped';
  type: string;
}

export function MultiAgentControlPanel() {
  const [activeTab, setActiveTab] = useState('agents');
  const [agents, setAgents] = useState<Agent[]>([
    { id: '1', name: 'Code Generator', status: 'idle', type: 'Generator' },
    { id: '2', name: 'Test Runner', status: 'running', type: 'Testing' },
    { id: '3', name: 'Documentation Bot', status: 'stopped', type: 'Documentation' },
  ]);

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl"
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold text-white">Multi-Agent Control Panel</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
        >
          <FaCog className="h-5 w-5" />
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {['agents', 'tasks', 'logs', 'resources'].map((tab) => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab)}
            className={`
              flex items-center justify-center gap-2 p-4 rounded-xl
              ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'}
              transition-colors duration-200
            `}
          >
            {tab === 'agents' && <FaRobot className="h-5 w-5" />}
            {tab === 'tasks' && <FaTasks className="h-5 w-5" />}
            {tab === 'logs' && <FaTerminal className="h-5 w-5" />}
            {tab === 'resources' && <FaBook className="h-5 w-5" />}
            <span className="capitalize">{tab}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-gray-800 p-6 rounded-xl"
        >
          {activeTab === 'agents' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Active Agents</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
                >
                  Add New Agent
                </motion.button>
              </div>
              
              <div className="grid gap-4">
                {agents.map((agent) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-700 p-4 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        h-3 w-3 rounded-full
                        ${agent.status === 'running' ? 'bg-green-500' : 
                          agent.status === 'stopped' ? 'bg-red-500' : 'bg-yellow-500'}
                      `} />
                      <div>
                        <h3 className="text-white font-medium">{agent.name}</h3>
                        <p className="text-gray-400 text-sm">{agent.type}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
                      >
                        {agent.status === 'running' ? <FaStop /> : <FaPlay />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-gray-600 rounded-lg text-white hover:bg-gray-500"
                      >
                        <FaCog />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-green-400">
                <p>[System] Agent "Code Generator" initialized</p>
                <p>[Task] Starting code generation for component...</p>
                <p>[Warning] Resource usage at 75%</p>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-700 p-4 rounded-lg"
              >
                <h3 className="text-white font-medium mb-2">Current Tasks</h3>
                <div className="space-y-2">
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-white">Generate Component Structure</p>
                    <div className="w-full bg-gray-600 h-2 rounded-full mt-2">
                      <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-700 p-4 rounded-lg cursor-pointer"
              >
                <h3 className="text-white font-medium mb-2">Documentation</h3>
                <p className="text-gray-400 text-sm">Access agent documentation and guides</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-700 p-4 rounded-lg cursor-pointer"
              >
                <h3 className="text-white font-medium mb-2">Templates</h3>
                <p className="text-gray-400 text-sm">Browse available templates</p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
} 