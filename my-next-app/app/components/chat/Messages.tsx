"use client";

import { useState } from "react";
import { IconSearch, IconSend } from "@tabler/icons-react";
import { Icon } from "../shared/Icon";

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
              <Icon icon={IconSearch} className="w-5 h-5" />
            </div>
          </div>
        </div>
        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Add your messages list here */}
        </div>
      </div>
    </div>
  );
}
