"use client";

import { IconChartPie, IconChartLine, IconDownload } from "@tabler/icons-react";

export function DataVisualizationView() {
  const metrics = [
    { label: "Total Users", value: "1,234", change: "+12%", trend: "up" },
    { label: "Active Sessions", value: "856", change: "+5%", trend: "up" },
    { label: "Response Time", value: "125ms", change: "-8%", trend: "down" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white/90 mb-6">
        Data Visualization
      </h1>
      <p className="text-white/70 mb-4">
        Visualize and analyze your data with interactive charts.
      </p>
      
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/60 text-sm">{metric.label}</p>
                <h3 className="text-2xl font-bold text-white/90 mt-1">{metric.value}</h3>
              </div>
              <span className={`text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white/90">Usage Analytics</h2>
            <IconDownload className="h-5 w-5 text-white/40 hover:text-white/60 cursor-pointer" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <IconChartLine className="h-24 w-24 text-white/20" />
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white/90">Distribution</h2>
            <IconDownload className="h-5 w-5 text-white/40 hover:text-white/60 cursor-pointer" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <IconChartPie className="h-24 w-24 text-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
