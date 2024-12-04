"use client";

import { IconSearch, IconBookmark, IconShare } from "@tabler/icons-react";
import { useState } from "react";

export function ResearchAssistantView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Implement search functionality
    setTimeout(() => setIsSearching(false), 1500); // Simulate search
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white/90 mb-6">
        Research Assistant
      </h1>
      <p className="text-white/70 mb-4">
        Aggregate and summarize information from various sources.
      </p>

      {/* Search Section */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              className="w-full bg-white/5 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-white/20"
              placeholder="Enter a topic to research..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            {isSearching ? (
              <span>Searching...</span>
            ) : (
              <div className="flex items-center gap-2">
                <IconSearch className="h-5 w-5" />
                <span>Search</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold text-white/90 mb-4">Research Results</h2>
          <div className="space-y-4">
            {!searchQuery ? (
              <p className="text-white/60">Enter a topic to start researching</p>
            ) : isSearching ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-4 bg-white/10 rounded w-1/2"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
              </div>
            ) : (
              <p className="text-white/70">No results yet.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="text-lg font-medium text-white/90 mb-2">Recent Searches</h3>
            <ul className="space-y-2">
              <li className="text-white/60 hover:text-white/80 cursor-pointer">Machine Learning</li>
              <li className="text-white/60 hover:text-white/80 cursor-pointer">Neural Networks</li>
              <li className="text-white/60 hover:text-white/80 cursor-pointer">Data Science</li>
            </ul>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="text-lg font-medium text-white/90 mb-2">Tools</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 text-white/60 hover:text-white/80">
                <IconBookmark className="h-4 w-4" />
                <span>Save Research</span>
              </button>
              <button className="w-full flex items-center gap-2 text-white/60 hover:text-white/80">
                <IconShare className="h-4 w-4" />
                <span>Share Results</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
