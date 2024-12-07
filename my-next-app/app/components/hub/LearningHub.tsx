"use client";

import { IconBook, IconCertificate, IconProgress, IconBookmark, IconClock } from "@tabler/icons-react";
import { useState } from "react";

export function LearningHubView() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: "AI Fundamentals",
      category: "ai",
      progress: 75,
      duration: "4 hours",
      level: "Intermediate",
      thumbnail: "🤖",
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      category: "ml",
      progress: 30,
      duration: "6 hours",
      level: "Beginner",
      thumbnail: "🧠",
    },
    {
      id: 3,
      title: "Neural Networks Deep Dive",
      category: "ai",
      progress: 0,
      duration: "8 hours",
      level: "Advanced",
      thumbnail: "🔮",
    },
  ];

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'ai', label: 'Artificial Intelligence' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'data', label: 'Data Science' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white/90 mb-6">Learning Hub</h1>
      <p className="text-white/70 mb-8">Enhance your skills with our curated learning paths.</p>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <IconBook className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-white/60">Courses Started</p>
              <p className="text-xl font-bold text-white/90">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <IconCertificate className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-white/60">Certificates</p>
              <p className="text-xl font-bold text-white/90">4</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <IconClock className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-white/60">Hours Learned</p>
              <p className="text-xl font-bold text-white/90">28</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <IconProgress className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-white/60">Current Streak</p>
              <p className="text-xl font-bold text-white/90">5 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-purple-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses
          .filter(course => selectedCategory === 'all' || course.category === selectedCategory)
          .map((course) => (
            <div key={course.id} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-colors">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">{course.thumbnail}</span>
                  <IconBookmark className="h-5 w-5 text-white/40 hover:text-white/60 cursor-pointer" />
                </div>
                <h3 className="text-lg font-semibold text-white/90 mb-2">{course.title}</h3>
                <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
                  <IconClock className="h-4 w-4" />
                  <span>{course.duration}</span>
                  <span className="px-2 py-1 rounded-full bg-white/10 text-white/60">
                    {course.level}
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-white/5 rounded-full h-2 mb-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-white/60">{course.progress}% Complete</p>
              </div>
              <button className="w-full p-4 bg-white/5 text-white/90 hover:bg-white/10 transition-colors border-t border-white/10">
                {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
