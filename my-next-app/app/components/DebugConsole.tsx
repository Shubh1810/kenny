"use client";

import { useEffect, useState } from 'react';

interface LogMessage {
    type: 'log' | 'error' | 'info';
    message: string;
    timestamp: string;
}

export default function DebugConsole() {
    const [logs, setLogs] = useState<LogMessage[]>([]);

    useEffect(() => {
        const originalConsole = {
            log: console.log,
            error: console.error,
            info: console.info
        };

        // Override console methods
        console.log = (...args) => {
            originalConsole.log(...args);
            addLog('log', args);
        };

        console.error = (...args) => {
            originalConsole.error(...args);
            addLog('error', args);
        };

        console.info = (...args) => {
            originalConsole.info(...args);
            addLog('info', args);
        };

        function addLog(type: 'log' | 'error' | 'info', args: any[]) {
            const message = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
            ).join(' ');

            setLogs(prev => [...prev, {
                type,
                message,
                timestamp: new Date().toLocaleTimeString()
            }].slice(-50)); // Keep last 50 logs
        }

        // Cleanup
        return () => {
            console.log = originalConsole.log;
            console.error = originalConsole.error;
            console.info = originalConsole.info;
        };
    }, []);

    return (
        <div className="fixed right-0 top-0 w-96 h-screen bg-black/90 text-green-400 p-4 overflow-auto font-mono text-xs">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-white">Debug Console</h3>
                <button 
                    onClick={() => setLogs([])}
                    className="text-white hover:text-red-400"
                >
                    Clear
                </button>
            </div>
            {logs.map((log, i) => (
                <div 
                    key={i} 
                    className={`mb-1 ${
                        log.type === 'error' ? 'text-red-400' : 
                        log.type === 'info' ? 'text-blue-400' : 
                        'text-green-400'
                    }`}
                >
                    <span className="text-gray-500">{log.timestamp}</span>
                    <pre className="whitespace-pre-wrap break-words">
                        {log.message}
                    </pre>
                </div>
            ))}
        </div>
    );
} 