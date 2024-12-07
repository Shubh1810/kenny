"use client";

import { useState } from "react";
import { IconBrandGithub, IconCode, IconBrain } from "@tabler/icons-react";
import { cn } from "../../lib/utils";

// Simple icon wrapper
const Icon = ({ icon: IconComponent, className }: { icon: any, className?: string }) => {
  return <IconComponent className={className} />;
};

export function CodeAssistantView() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  


  const languages = [
    "javascript",
    "python",
    "typescript",
    "java",
    "c++",
    "rust",
    "go",
  ];


  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuggestions([
        "Consider using async/await here",
        "You could optimize this loop",
        "Add error handling for edge cases",
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white/90 mb-2">
              AI Code Assistant
            </h1>
            <p className="text-white/70">
              Get intelligent suggestions and improvements for your code
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Icon icon={IconBrandGithub} className="w-5 h-5" />
            <span>Connect GitHub</span>
          </button>
        </div>

        {/* Main Editor Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Input */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
              <div className="flex-1" />
              <button
                onClick={() => setCode("")}
                className="text-white/50 hover:text-white/90 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[400px] bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Paste your code here..."
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={!code.trim() || loading}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                    "bg-blue-500 hover:bg-blue-600",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Icon icon={IconBrain} className="w-5 h-5" />
                  )}
                  <span>Analyze</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Suggestions Panel */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Icon icon={IconCode} className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white/90">
                Code Suggestions
              </h2>
            </div>
            {suggestions.length > 0 ? (
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-lg p-4"
                  >
                    <p className="text-white/90">{suggestion}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-white/50">
                <Icon icon={IconBrain} className="w-12 h-12 mb-4" />
                <p>Submit your code to get AI-powered suggestions</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Icon icon={IconSend} className="w-5 h-5" />
            <span>Send to AI</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Icon icon={IconCopy} className="w-5 h-5" />
            <span>Copy Code</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Icon icon={IconDownload} className="w-5 h-5" />
            <span>Download Code</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

