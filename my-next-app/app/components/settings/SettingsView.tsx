"use client";

import { IconBell, IconPalette, IconKey, IconLanguage, IconDeviceLaptop, IconBrain } from "@tabler/icons-react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export function SettingsView() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('english');
  const [aiLevel, setAiLevel] = useState('advanced');
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#0A0F1C");
  const [middleColor, setMiddleColor] = useState("#1B2341");
  const [secondaryColor, setSecondaryColor] = useState("#2D3867");

  const updateThemeColors = () => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--middle-color', middleColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    const sidebarGradients = document.querySelectorAll('.sidebar-gradient');
    sidebarGradients.forEach(element => {
      element.classList.remove('from-[#0A0F1C]', 'via-[#1B2341]', 'to-[#2D3867]');
      element.classList.add(
        `from-[${primaryColor}]`,
        `via-[${middleColor}]`,
        `to-[${secondaryColor}]`
      );
    });

    const pageBackgrounds = document.querySelectorAll('.page-background');
    pageBackgrounds.forEach(element => {
      element.style.background = `linear-gradient(to bottom right, ${primaryColor}, ${middleColor}, ${secondaryColor})`;
    });
  };

  const settingsSections = [
    {
      id: 'ai',
      icon: <IconBrain className="h-5 w-5" />,
      title: 'AI Settings',
      description: 'Configure AI behavior and interactions',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-1">AI Interaction Level</label>
            <select
              value={aiLevel}
              onChange={(e) => setAiLevel(e.target.value)}
              className="w-full bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
            >
              <option value="basic">Basic</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90">AI Suggestions</p>
              <p className="text-sm text-white/60">Receive AI-powered suggestions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={aiSuggestions}
                onChange={(e) => setAiSuggestions(e.target.checked)}
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
            </label>
          </div>
        </div>
      ),
    },
    {
      id: 'notifications',
      icon: <IconBell className="h-5 w-5" />,
      title: 'Notifications',
      description: 'Manage your notification preferences',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90">Push Notifications</p>
              <p className="text-sm text-white/60">Receive notifications on your device</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
            </label>
          </div>
        </div>
      ),
    },
    {
      id: 'appearance',
      icon: <IconPalette className="h-5 w-5" />,
      title: 'Appearance',
      description: 'Customize the look and feel',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-1">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">Primary Color (Top)</label>
            <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">Middle Color</label>
            <HexColorPicker color={middleColor} onChange={setMiddleColor} />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">Secondary Color (Bottom)</label>
            <HexColorPicker color={secondaryColor} onChange={setSecondaryColor} />
          </div>
          <button
            onClick={updateThemeColors}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Apply Colors
          </button>
        </div>
      ),
    },
    {
      id: 'language',
      icon: <IconLanguage className="h-5 w-5" />,
      title: 'Language & Region',
      description: 'Set your preferred language',
      content: (
        <div>
          <label className="block text-sm text-white/60 mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white/90 mb-6">Settings</h1>
      <p className="text-white/70 mb-8">
        Customize your experience and preferences.
      </p>

      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div
            key={section.id}
            className="bg-white/5 p-6 rounded-xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/5 rounded-lg text-white/60">
                {section.icon}
              </div>
              <div>
                <h2 className="text-lg font-medium text-white/90">{section.title}</h2>
                <p className="text-sm text-white/60">{section.description}</p>
              </div>
            </div>
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
}
