"use client";

import { useState } from 'react';
import { IconKey, IconBell, IconPalette } from "@tabler/icons-react";
import { Icon } from "../shared/Icon";

export function ProfileView() {
  const [formData, setFormData] = useState({
    displayName: "John Doe",
    email: "john.doe@example.com",
    bio: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white/90 mb-6">Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="md:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-neutral-300 dark:bg-neutral-700"></div>
            <div>
              <h2 className="text-xl font-semibold text-white/90">John Doe</h2>
              <p className="text-white/60">john.doe@example.com</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Display Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Quick Settings */}
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Icon icon={IconKey} className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white/90 font-medium">Security</h3>
                <p className="text-sm text-white/60">Password & authentication</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Icon icon={IconBell} className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white/90 font-medium">Notifications</h3>
                <p className="text-sm text-white/60">Customize alerts</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Icon icon={IconPalette} className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-white/90 font-medium">Appearance</h3>
                <p className="text-sm text-white/60">Theme & display</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
