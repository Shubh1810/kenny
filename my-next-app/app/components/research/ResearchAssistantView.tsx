"use client";

import { useState } from "react";
import { IconSearch, IconBookmark, IconShare, IconLoader, IconFilter } from "@tabler/icons-react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

type MotionProps = {
  className?: string;
 onClick?: () => void;
  children?: React.ReactNode;
  key?: string | number;
  style?: React.CSSProperties;
  whileHover?: any;
  whileTap?: any;
  initial?: any;
  animate?: any;
  disabled?: boolean;
} & HTMLMotionProps<"div">;

const MotionDiv = motion.div as unknown as React.FC<MotionProps>;
const MotionButton = motion.button as unknown as React.FC<MotionProps>;

export function ResearchAssistantView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search functionality
    setTimeout(() => {
      setResults([
        "Result 1: AI in Healthcare",
        "Result 2: Machine Learning Trends",
        "Result 3: Future of Neural Networks",
      ]);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white/90 mb-2">
              Research Assistant
            </h1>
            <p className="text-white/70">
              Aggregate and summarize information from various sources.
            </p>
          </div>
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <IconFilter className="w-5 h-5" />
            <span>Filter Results</span>
          </MotionButton>
        </div>

        {/* Search Section */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
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
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              disabled={isSearching}
              className={cn(
                "px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isSearching ? (
                <IconLoader className="h-5 w-5 animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <IconSearch className="h-5 w-5" />
                  <span>Search</span>
                </div>
              )}
            </MotionButton>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white/90 mb-4">
              Research Results
            </h2>
            <div className="space-y-4">
              {!searchQuery ? (
                <p className="text-white/60">Enter a topic to start researching</p>
              ) : isSearching ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-1/2"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                </div>
              ) : results.length > 0 ? (
                results.map((result, index) => (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-xl border border-white/10"
                  >
                    <h3 className="text-lg font-medium text-white/90 mb-2">{result}</h3>
                    <div className="mt-2">
                      <MotionButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-white/60 hover:text-white/80"
                      >
                        <IconBookmark className="h-4 w-4" />
                        <span>Save Research</span>
                      </MotionButton>
                      <MotionButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-white/60 hover:text-white/80"
                      >
                        <IconShare className="h-4 w-4" />
                        <span>Share Results</span>
                      </MotionButton>
                    </div>
                  </MotionDiv>
                ))
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
      </MotionDiv>
    </div>
  );
}
