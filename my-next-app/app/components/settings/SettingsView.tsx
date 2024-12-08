"use client";

import { useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import { 
  Bot, 
  Bell, 
  Palette, 
  Globe 
} from "lucide-react";

type ColorPreset = {
  primary: string;
  middle: string;
  secondary: string;
};

type MotionProps = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  key?: string | number;
  style?: React.CSSProperties;
} & HTMLMotionProps<"div">;

const MotionDiv = motion.div as unknown as React.FC<MotionProps>;
const MotionButton = motion.button as unknown as React.FC<MotionProps>;

type SettingSection = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

export function SettingsView() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('english');
  const [aiLevel, setAiLevel] = useState('advanced');
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#0A0F1C");
  const [middleColor, setMiddleColor] = useState("#1B2341");
  const [secondaryColor, setSecondaryColor] = useState("#2D3867");

  const [presets, setPresets] = useState<ColorPreset[]>([
    { primary: "#0A0F1C", middle: "#1B2341", secondary: "#2D3867" },
    { primary: "#FF5733", middle: "#33FF57", secondary: "#3357FF" },
    { primary: "#FFD700", middle: "#FF4500", secondary: "#8A2BE2" },
  ]);

  const loadPreset = (preset: ColorPreset) => {
    setPrimaryColor(preset.primary);
    setMiddleColor(preset.middle);
    setSecondaryColor(preset.secondary);
  };

  const savePreset = (index: number) => {
    const newPresets = [...presets];
    newPresets[index] = { primary: primaryColor, middle: middleColor, secondary: secondaryColor };
    setPresets(newPresets);
  };

  const updateThemeColors = () => {
    // Implement theme color update logic here
    console.log('Updating theme colors:', { primaryColor, middleColor, secondaryColor });
  };

  const settingsSections = [
    {
      id: 'ai',
      title: 'AI Settings',
      description: 'Configure AI behavior and interactions',
      icon: <Bot className="w-5 h-5" />,
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
      title: 'Notifications',
      description: 'Manage your notification preferences',
      icon: <Bell className="w-5 h-5" />,
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
      title: 'Appearance',
      description: 'Customize the look and feel',
      icon: <Palette className="w-5 h-5" />,
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
          
          {/* Color Selection Grid */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-white/60 mb-1">Primary Color (Top)</label>
              <div className="flex gap-4">
                <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                <MotionDiv 
                  className="w-full p-4 rounded-lg bg-white/5 border border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-sm text-white/60 mb-2">Selected Color:</p>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-full border border-white/20"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <code className="text-sm text-white/90">{primaryColor}</code>
                  </div>
                </MotionDiv>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1">Middle Color</label>
              <div className="flex gap-4">
                <HexColorPicker color={middleColor} onChange={setMiddleColor} />
                <MotionDiv 
                  className="w-full p-4 rounded-lg bg-white/5 border border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-sm text-white/60 mb-2">Selected Color:</p>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-full border border-white/20"
                      style={{ backgroundColor: middleColor }}
                    />
                    <code className="text-sm text-white/90">{middleColor}</code>
                  </div>
                </MotionDiv>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1">Secondary Color (Bottom)</label>
              <div className="flex gap-4">
                <HexColorPicker color={secondaryColor} onChange={setSecondaryColor} />
                <MotionDiv 
                  className="w-full p-4 rounded-lg bg-white/5 border border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-sm text-white/60 mb-2">Selected Color:</p>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-full border border-white/20"
                      style={{ backgroundColor: secondaryColor }}
                    />
                    <code className="text-sm text-white/90">{secondaryColor}</code>
                  </div>
                </MotionDiv>
              </div>
            </div>
          </div>

          {/* Color Presets */}
          <div className="mt-4 mb-4">
            <label className="block text-sm text-white/60 mb-2">Saved Color Presets</label>
            <div className="flex gap-4">
              {presets.map((preset, index) => (
                <div key={index} className="flex flex-col items-center">
                  <button
                    onClick={() => loadPreset(preset)}
                    className="w-16 h-16 rounded-full border-2 border-white/20 hover:border-white/50 transition-all"
                    style={{
                      background: `linear-gradient(180deg, ${preset.primary} 0%, ${preset.middle} 50%, ${preset.secondary} 100%)`
                    }}
                  />
                  <button
                    onClick={() => savePreset(index)}
                    className="mt-2 px-2 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 transition-colors"
                  >
                    Save Slot {index + 1}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <MotionButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={updateThemeColors}
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Apply Colors
          </MotionButton>
        </div>
      ),
    },
    {
      id: 'language',
      title: 'Language & Region',
      description: 'Set your preferred language',
      icon: <Globe className="w-5 h-5" />,
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
        {settingsSections.map((section: SettingSection) => (
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
