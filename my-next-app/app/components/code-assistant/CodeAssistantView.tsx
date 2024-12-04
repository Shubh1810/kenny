"use client";

export function CodeAssistantView() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white/90 mb-6">
        AI Code Assistant
      </h1>
      <p className="text-white/70 mb-4">
        Enhance your coding experience with AI-powered code suggestions.
      </p>
      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <textarea
          className="w-full h-64 bg-transparent text-white p-2 outline-none"
          placeholder="Start coding here..."
        ></textarea>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Get AI Suggestions
        </button>
      </div>
    </div>
  );
}
