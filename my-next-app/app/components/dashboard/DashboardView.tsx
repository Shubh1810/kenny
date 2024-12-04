"use client";

import { IconHome, IconMessages, IconUser } from "@tabler/icons-react";

export function DashboardView() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white/90 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<IconHome className="h-6 w-6 text-blue-500" />}
          label="Total Projects"
          value="24"
          color="blue"
        />
        <StatCard
          icon={<IconMessages className="h-6 w-6 text-green-500" />}
          label="New Messages"
          value="12"
          color="green"
        />
        <StatCard
          icon={<IconUser className="h-6 w-6 text-purple-500" />}
          label="Team Members"
          value="8"
          color="purple"
        />
      </div>

      <h2 className="text-xl font-semibold text-white/90 mb-4">Recent Activity</h2>
      <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
        <ActivityItem
          text="Project 'Dashboard UI' was updated"
          time="2 hours ago"
        />
        <ActivityItem
          text="New team member added"
          time="5 hours ago"
        />
        <ActivityItem
          text="Client meeting scheduled"
          time="1 day ago"
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-4">
        <div className={`p-3 bg-${color}-500/10 rounded-lg`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <h3 className="text-2xl font-bold text-white/90">{value}</h3>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="p-4 border-b border-white/10">
      <p className="text-white/70">{text}</p>
      <p className="text-sm text-white/40">{time}</p>
    </div>
  );
}
