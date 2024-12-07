"use client";

import { IconSearch, IconSend, IconMoodSmile, IconPaperclip } from "@tabler/icons-react";
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

type IconComponentProps = {
  icon: React.ElementType;
  className?: string;
};

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
      avatar: '👩‍💼',
      lastMessage: 'Hey, can we discuss the new project?',
      time: '10:30 AM',
      unread: true,
      online: true
    },
    { 
      id: '2',
      name: 'Param Khanna',
      avatar: '👨‍💻',
      lastMessage: 'The designs look great!',
      time: 'Yesterday',
      unread: false,
      online: true
    },
    { 
      id: '3',
      name: 'Sebastian Salinas',
      avatar: '👩‍🎨',
      lastMessage: 'Meeting at 3 PM?',
      time: 'Yesterday',
      unread: false,
      online: false
    },
    { 
      id: '4',
      name: 'Aaryan Mittal',
      avatar: '👨‍💻',
      lastMessage: 'Can you review the code?',
      time: 'Yesterday',
      unread: false,
      online: false
    },
  ];

  const IconComponent = ({ icon: IconElement, className }: IconComponentProps) => {
    return <IconElement className={className} />;
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Chats Sidebar */}
      <div className="w-80 flex flex-col bg-white/5 rounded-xl border border-white/10">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full bg-white/5 text-white p-2 pl-9 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
            />
            <IconComponent 
              icon={IconSearch} 
              className="absolute left-3 top-3 h-4 w-4 text-white/40" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`flex items-center p-4 cursor-pointer transition-colors duration-200 border-b border-white/5
                ${selectedChat === chat.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <div className="relative">
                <div className="w-10 h-10 flex items-center justify-center text-2xl rounded-xl bg-white/5">
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a0b2e]" />
                )}
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/90">{chat.name}</p>
                  <p className="text-xs text-white/40">{chat.time}</p>
                </div>
                <p className="text-sm text-white/60 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread && (
                <div className="ml-2 w-2 h-2 bg-purple-500 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className="flex-1 flex flex-col bg-white/5 rounded-xl border border-white/10">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center text-2xl rounded-xl bg-white/5">
                    {chats.find(c => c.id === selectedChat)?.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-white/90">
                      {chats.find(c => c.id === selectedChat)?.name}
                    </p>
                    <p className="text-sm text-white/40">Active now</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Message bubbles would go here */}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <button className="p-2 text-white/40 hover:text-white/60 transition-colors">
                  <IconComponent icon={IconMoodSmile} className="h-5 w-5" />
                </button>
                <button className="p-2 text-white/40 hover:text-white/60 transition-colors">
                  <IconComponent icon={IconPaperclip} className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
                />
                <button className="p-2 text-purple-400 hover:text-purple-300 transition-colors">
                  <IconComponent icon={IconSend} className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white/40">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
