"use client";

import { useState } from "react";

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
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Chat List */}
      <div className="w-80 flex flex-col bg-white/5 rounded-xl border border-white/10">
        <div className="p-4 border-b border-white/10">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
          />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`flex items-center p-4 cursor-pointer hover:bg-white/5 ${
                selectedChat === chat.id ? 'bg-white/10' : ''
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center text-2xl rounded-xl bg-white/5">
                {chat.avatar}
              </div>
              <div className="ml-4 flex-1">
                <p className="text-white/90">{chat.name}</p>
                <p className="text-white/60 text-sm">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className="flex-1 flex flex-col bg-white/5 rounded-xl border border-white/10 ml-4">
        {selectedChat ? (
          <div className="p-4 text-white/90">
            Select a chat to start messaging
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/40">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
