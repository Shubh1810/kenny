// app/components/thought-partner/ThoughtPartnerView.tsx

"use client";

import React, { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ThoughtPartnerView = () => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newConversation = [
      ...conversation,
      { role: "user", content: input.trim() },
    ];
    setConversation(newConversation as Message[]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/thought-partner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversation: newConversation }),
      });

      const data = await response.json();

      if (response.ok) {
        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } else {
        console.error("Error from API:", data.error);
        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I couldn't process your request." },
        ]);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Request failed:", error.message);
      } else {
        console.error("An unexpected error occurred");
      }
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: "An error occurred while communicating with the assistant." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-blue-900 text-white rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Thought Partner</h1>
      <p className="mb-4 text-gray-300">
        Share your ideas, and I&apos;ll help you refine them.
      </p>

      <div className="h-64 overflow-y-auto bg-blue-800 p-4 rounded-lg mb-4">
        {conversation.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong className={msg.role === "user" ? "text-green-400" : "text-yellow-400"}>
              {msg.role === "user" ? "You" : "Assistant"}:
            </strong>{" "}
            <span>{msg.content}</span>
          </div>
        ))}
        {loading && <p className="text-gray-400">Assistant is typing...</p>}
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 bg-blue-800 rounded-l-lg text-white"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-500 rounded-r-lg text-white"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ThoughtPartnerView;