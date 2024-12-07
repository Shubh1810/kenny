"use client";

import { useState } from "react";
import { cn } from "../../lib/utils";

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
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
            Connect GitHub
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
                <button
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
                    <div className="w-5 h-5 bg-blue-500 rounded-full" />
                  )}
                  <span>Analyze</span>
                </button>
              </div>
            </div>
          </div>

          {/* Suggestions Panel */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-blue-500 rounded-full" />
              <h2 className="text-xl font-semibold text-white/90">
                Code Suggestions
              </h2>
            </div>
            {suggestions.length > 0 ? (
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-4"
                  >
                    <p className="text-white/90">{suggestion}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-white/50">
                <div className="w-12 h-12 bg-blue-500 rounded-full mb-4" />
                <p>Submit your code to get AI-powered suggestions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

