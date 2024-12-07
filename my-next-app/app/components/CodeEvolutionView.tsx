// app/components/code-evolution/CodeEvolutionView.tsx

"use client";

import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import dynamic from 'next/dynamic';

// Dynamically import MonacoEditor with no SSR
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

const CodeEvolutionView = () => {
  const [code, setCode] = useState(`// Start typing your code here...\n`);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = useCallback(async (codeSnippet: string) => {
    if (!codeSnippet || codeSnippet.trim().length < 10) return;
    
    setLoading(true);
    try {
      // TODO: Replace with actual AI backend call
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              "Refactor to avoid nested loops",
              "Use ES6 features like destructuring",
              "Consider reducing function complexity",
            ]),
          2000
        )
      );
      setSuggestions(response as string[]);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSuggestions(code);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [code, fetchSuggestions]);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Code Evolution Engine</h1>
      <p className="mb-4 text-gray-300">
        Write or paste your code below to receive optimization and refactoring
        suggestions.
      </p>

      {/* @ts-expect-error -- MonacoEditor has incomplete types for Next.js */}
      <MonacoEditor
        height="300px"
        defaultLanguage="javascript"
        value={code}
        theme="vs-dark"
        onChange={(value: string | undefined) => setCode(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">AI Suggestions</h2>
        {loading ? (
          <p className="text-gray-400">Analyzing code...</p>
        ) : suggestions.length > 0 ? (
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="hover:text-gray-200 transition-colors">
                {suggestion}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            {code.trim().length < 10
              ? "Add more code to receive suggestions"
              : "No suggestions available"}
          </p>
        )}
      </div>
    </div>
  );
};

export default CodeEvolutionView;