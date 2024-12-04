"use client";

import { IconSearch, IconBook2, IconBookmark, IconStar, IconArrowRight, IconTag } from "@tabler/icons-react";
import { useState } from "react";

export function KnowledgeBaseView() {
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
    {
      id: 1,
      title: "Getting Started with AI Assistant",
      category: "Basics",
      readTime: "5 min",
      popularity: "Most Read",
      tags: ["beginner", "setup"],
    },
    {
      id: 2,
      title: "Advanced AI Prompting Techniques",
      category: "Advanced",
      readTime: "10 min",
      popularity: "Trending",
      tags: ["advanced", "prompts"],
    },
    {
      id: 3,
      title: "API Integration Guide",
      category: "Development",
      readTime: "15 min",
      popularity: "New",
      tags: ["api", "development"],
    },
  ];

  const categories = [
    { id: 'basics', label: 'Basics', count: 12 },
    { id: 'advanced', label: 'Advanced Topics', count: 8 },
    { id: 'development', label: 'Development', count: 15 },
    { id: 'troubleshooting', label: 'Troubleshooting', count: 10 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white/90 mb-6">Knowledge Base</h1>
      <p className="text-white/70 mb-8">
        Explore our comprehensive documentation and guides.
      </p>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 text-white p-4 pl-12 rounded-xl border border-white/10 focus:outline-none focus:border-white/20"
        />
        <IconSearch className="absolute left-4 top-4 h-5 w-5 text-white/40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white/90 mb-4">Categories</h2>
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-white/70">{category.label}</span>
                <span className="text-sm text-white/40">{category.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Featured Article */}
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-xl border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                  Featured
                </span>
              </div>
              <IconBookmark className="h-5 w-5 text-white/40 hover:text-white/60 cursor-pointer" />
            </div>
            <h2 className="text-xl font-semibold text-white/90 mb-2">
              Complete Guide to AI Assistant Features
            </h2>
            <p className="text-white/70 mb-4">
              Learn about all the powerful features and capabilities of your AI assistant.
            </p>
            <button className="flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-colors">
              <span>Read More</span>
              <IconArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Articles List */}
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/40">{article.category}</span>
                    <span className="text-sm text-white/40">•</span>
                    <span className="text-sm text-white/40">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white/90">{article.title}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-sm">
                  {article.popularity}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IconTag className="h-4 w-4 text-white/40" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-lg bg-white/5 text-white/60 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
