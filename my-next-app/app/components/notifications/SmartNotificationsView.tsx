"use client";

export function SmartNotificationsView() {
  const notifications = [
    { id: 1, icon: '🔔', text: 'You have a meeting scheduled at 3 PM.', time: '5 min ago', priority: 'high' },
    { id: 2, icon: '📧', text: 'New email from Alice: "Project Update"', time: '10 min ago', priority: 'medium' },
    { id: 3, icon: '💡', text: 'AI suggests reviewing recent code changes', time: '1 hour ago', priority: 'low' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white/90 mb-6">
        Smart Notifications
      </h1>
      <p className="text-white/70 mb-4">
        Stay updated with AI-prioritized notifications.
      </p>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10
              ${notification.priority === 'high' ? 'border-l-4 border-l-red-500' : 
                notification.priority === 'medium' ? 'border-l-4 border-l-yellow-500' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{notification.icon}</span>
              <div className="flex-1">
                <p className="text-white/70">{notification.text}</p>
                <p className="text-sm text-white/50">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
