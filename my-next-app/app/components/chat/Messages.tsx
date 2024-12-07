"use client";

import { useState } from "react";
import { Search, Send } from "lucide-react";
import type { LucideProps } from 'lucide-react';

interface ChatType {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  online: boolean;
}

export function MessagesView() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");

  const chats: ChatType[] = [
    { 
      id: '1',
      name: 'Dhruv Maniar',
      avatar: '👩‍💼',
      lastMessage: 'Hey, can we discuss the new project?',
      time: '10:30 AM',
      unread: true,
      online: true
    },
    { 
      id: '2',
      name: 'Yash Sheth',
      avatar: '👨‍💻',
      lastMessage: 'The designs look great!',
      time: 'Yesterday',
      unread: false,
      online: true
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="w-80 flex flex-col bg-white/5 rounded-xl border border-white/10">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full bg-white/5 text-white pl-10 pr-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
            />
            <div className="absolute left-3 top-2.5 text-white/40">
              <Search size={20} className="text-white/40" />
            </div>
          </div>
        </div>
        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-white/5 ${
                selectedChat === chat.id ? 'bg-white/5' : ''
              }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="text-2xl">{chat.avatar}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white/90">{chat.name}</span>
                  <span className="text-xs text-white/60">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60 truncate">{chat.lastMessage}</span>
                  {chat.unread && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
