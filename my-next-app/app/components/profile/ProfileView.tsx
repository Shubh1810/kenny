"use client";

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export function ProfileView() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    displayName: user?.username || "",
    email: user?.email || "",
    bio: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // TODO: Implement profile update API call
      console.log('Profile update:', formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const quickSettings = [
    {
      title: "Security",
      description: "Password & authentication",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-400"
    },
    {
      title: "Notifications",
      description: "Customize alerts",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-400"
    },
    {
      title: "Appearance",
      description: "Theme & display",
      bgColor: "bg-green-500/10",
      textColor: "text-green-400"
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white/90 mb-6">Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="md:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-2xl font-bold text-white/70">
              {user?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white/90">{user?.username}</h2>
              <p className="text-white/60">{user?.email}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Display Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20 disabled:opacity-50"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Quick Settings */}
        <div className="space-y-4">
          {quickSettings.map((setting, index) => (
            <div 
              key={index}
              className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${setting.bgColor}`}>
                  {/* Icon placeholder */}
                  <div className="w-5 h-5"></div>
                </div>
                <div>
                  <h3 className="text-white/90 font-medium">{setting.title}</h3>
                  <p className="text-sm text-white/60">{setting.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
