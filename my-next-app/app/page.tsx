"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/app/components/ui/Sidebar";
import {
  IconHome,
  IconSettings,
  IconLogout,
  IconMessages,
  IconBrain,
  IconCheckbox,
  IconCalendar,
  IconCode,
  IconFolders,
  IconBooks,
  IconAutomation,
  IconChartPie,
  IconBell,
  IconSchool,
  IconUsers,
  IconGitBranch,
} from "@tabler/icons-react";
import { useState } from "react";
import { DashboardView } from "@/app/components/dashboard/DashboardView";
import { CodeAssistantView } from "@/app/components/code-assistant/CodeAssistantView";
import { DataVisualizationView } from "@/app/components/data/DataVisualizationView";
import { ProfileView } from "@/app/components/profile/ProfileView";
import { ResearchAssistantView } from "@/app/components/research/ResearchAssistantView";
import { LearningHubView } from "@/app/components/hub/LearningHub";
import { KnowledgeBaseView } from "@/app/components/knowledge-base/KnowledgeBase";
import { MessagesView } from "@/app/components/chat/Messages";
import { SettingsView } from "@/app/components/settings/SettingsView";
import { TasksView } from "@/app/components/tasks/TasksView";
import { SmartNotificationsView } from "./components/notifications/SmartNotificationsView";
import Image from 'next/image';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };
  
  const links = [
    {
      label: "Dashboard",
      id: "dashboard",
      href: "#",
      icon: <IconHome className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("dashboard"),
    },
    {
      label: "AI Code Assistant",
      id: "codeAssistant",
      href: "#",
      icon: <IconCode className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("codeAssistant"),
    },
    {
      label: "Project Explorer",
      id: "projectExplorer",
      href: "#",
      icon: <IconFolders className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("projectExplorer"),
    },
    {
      label: "Research Assistant",
      id: "researchAssistant",
      href: "#",
      icon: <IconBooks className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("researchAssistant"),
    },
    {
      label: "Workflow Automation",
      id: "workflowAutomation",
      href: "#",
      icon: <IconAutomation className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("workflowAutomation"),
    },
    {
      label: "Data Visualization",
      id: "dataVisualization",
      href: "#",
      icon: <IconChartPie className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("dataVisualization"),
    },
    {
      label: "Smart Notifications",
      id: "smartNotifications",
      href: "#",
      icon: <IconBell className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("smartNotifications"),
    },
    {
      label: "Learning Hub",
      id: "learningHub",
      href: "#",
      icon: <IconSchool className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("learningHub"),
    },
    {
      label: "Collaboration Space",
      id: "collaborationSpace",
      href: "#",
      icon: <IconUsers className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("collaborationSpace"),
    },
    {
      label: "Version Control",
      id: "versionControl",
      href: "#",
      icon: <IconGitBranch className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("versionControl"),
    },
    {
      label: "Chat",
      id: "messages",
      href: "#",
      icon: <IconMessages className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("messages"),
    },
    {
      label: "Knowledge Base",
      id: "knowledge",
      href: "#",
      icon: <IconBrain className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("knowledge"),
    },
    {
      label: "Tasks",
      id: "tasks",
      href: "#",
      icon: <IconCheckbox className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("tasks"),
    },
    {
      label: "Calendar",
      id: "calendar",
      href: "#",
      icon: <IconCalendar className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("calendar"),
    },
    {
      label: "Settings",
      id: "settings",
      href: "#",
      icon: <IconSettings className="h-7 w-7 text-neutral-100" />,
      onClick: () => handleNavigation("settings"),
    },
  ];
  const renderContent = () => {
    switch(currentPage) {
      case 'dashboard':
        return <DashboardView />;
      case 'codeAssistant':
        return <CodeAssistantView />;
      case "projectExplorer":
        return (
          <div>
            <h1 className="text-2xl font-bold text-white/90 mb-6">
              Project Explorer
            </h1>
            <p className="text-white/70 mb-4">
              Navigate through your projects effortlessly.
            </p>
            {/* Project List */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <ul>
                <li className="mb-2">
                  <a href="#" className="text-blue-400 hover:underline">
                    Project Alpha
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-blue-400 hover:underline">
                    Project Beta
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-blue-400 hover:underline">
                    Project Gamma
                  </a>
                </li>
                {/* ... more projects ... */}
              </ul>
            </div>
          </div>
        );

      case "researchAssistant":
        return <ResearchAssistantView />;
      case "workflowAutomation":
        return (
          <div>
            <h1 className="text-2xl font-bold text-white/90 mb-6">
              Workflow Automation
            </h1>
            <p className="text-white/70 mb-4">
              Automate tasks and streamline your workflow.
            </p>
            {/* Workflow Builder Placeholder */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-white/70">
                Drag and drop tasks to build your workflow (feature coming
                soon).
              </p>
            </div>
          </div>
        );
      case "dataVisualization":
        return <DataVisualizationView />;

      case "smartNotifications":
        return <SmartNotificationsView />;
      case "learningHub":
        return <LearningHubView />;
      case "collaborationSpace":
        return (
          <div>
            <h1 className="text-2xl font-bold text-white/90 mb-6">
              Collaboration Space
            </h1>
            <p className="text-white/70 mb-4">
              Collaborate with your team in real-time.
            </p>
            {/* Chat and Collaboration Placeholder */}
            <div className="flex gap-4">
              <div className="flex-1 bg-white/5 p-4 rounded-xl border border-white/10">
                <h2 className="text-xl font-semibold text-white/90 mb-2">
                  Team Chat
                </h2>
                {/* Chat messages */}
                <div className="h-64 overflow-y-auto">
                  <p className="text-white/70">[10:00 AM] Alice: Hello team!</p>
                  {/* ... more messages ... */}
                </div>
                {/* Message Input */}
                <input
                  type="text"
                  className="w-full bg-transparent text-white p-2 mt-2 outline-none border border-white/10 rounded-lg"
                  placeholder="Type a message..."
                />
              </div>
              <div className="w-1/3 bg-white/5 p-4 rounded-xl border border-white/10">
                <h2 className="text-xl font-semibold text-white/90 mb-2">
                  Online Users
                </h2>
                <ul>
                  <li className="text-white/70">• Alice</li>
                  <li className="text-white/70">• Bob</li>
                  <li className="text-white/70">• Carol</li>
                  {/* ... more users ... */}
                </ul>
              </div>
            </div>
          </div>
        );

      case "versionControl":
        return (
          <div>
            <h1 className="text-2xl font-bold text-white/90 mb-6">
              Version Control
            </h1>
            <p className="text-white/70 mb-4">
              Manage your code versions with AI assistance.
            </p>
            {/* Repository List */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
              <h2 className="text-xl font-semibold text-white/90 mb-2">
                Repositories
              </h2>
              <ul>
                <li className="mb-2">
                  <a href="#" className="text-blue-400 hover:underline">
                    repo-awesome-project
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-blue-400 hover:underline">
                    repo-another-project
                  </a>
                </li>
                {/* ... more repositories ... */}
              </ul>
            </div>
            {/* Commit History Placeholder */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h2 className="text-xl font-semibold text-white/90 mb-2">
                Commit History
              </h2>
              <p className="text-white/70">Select a repository to view commits.</p>
            </div>
          </div>
        );

      case 'messages':
        return <MessagesView />;
      case 'projects':
        return (
          <div>
            <h1 className="text-2xl font-bold text-white/90 mb-6">Projects</h1>
            {/* Projects content */}
          </div>
        );
      case 'settings':
        return <SettingsView />;

      case 'tasks':
        return <TasksView />;

      case "knowledge":
        return <KnowledgeBaseView />;
        case "profile":
          return <ProfileView />;

      default:
        return null;
    }
  };

  return (
    <>
      {/* Add background div */}
      <div className="fixed inset-0 page-background" style={{
        background: `linear-gradient(to bottom right, #0A0F1C, #1B2341, #2D3867)`,
        zIndex: -1
      }} />
      
      <div className="flex h-screen overflow-hidden relative">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody>
            <div className="flex flex-col h-full">
              {/* Logo/Brand - Fixed at top */}
              <div className="shrink-0 mb-6">
                {open ? (
                  <h1 className="text-2xl font-bold text-neutral-100">
                    KIRA
                  </h1>
                ) : (
                  <Image 
                    src="/kira.jpg" 
                    alt="KIRA Logo"
                    width={40}
                    height={40}
                    className="rounded-xl"
                  />
                )}
              </div>

              {/* Navigation - Scrollable */}
              <nav className="flex-1 overflow-y-auto pr-2 space-y-2">
                <div className="flex flex-col">
                  {links.map((link) => (
                    <SidebarLink 
                      key={link.id} 
                      link={{
                        label: link.label,
                        href: link.href,
                        icon: link.icon
                      }}
                      onClick={link.onClick}
                    />
                  ))}
                </div>
              </nav>

              {/* Profile & Logout - Fixed at bottom */}
              <div className="shrink-0 border-t border-white/10 pt-4 mt-4">
                <SidebarLink
                  link={{
                    label: "John Doe",
                    href: "#",
                    icon: (
                      <Image 
                      src="/unknown-user.jpg" 
                      alt="Unknown User"
                      width={20}
                      height={20}
                      className="rounded-md"
                    />
                  ),
                  }}
                  onClick={() => handleNavigation("profile")}
                />
                <SidebarLink
                  link={{
                    label: "Logout",
                    href: "#",
                    icon: <IconLogout className="h-5 w-5 text-red-400" />,
                  }}
                  className="text-red-400"
                  onClick={() => {/* handle logout */}}
                />
              </div>
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto rounded-l-[2.5rem] bg-gradient-to-br from-neutral-900/50 via-neutral-900/30 to-neutral-800/20 p-8 border-l border-white/5">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}
