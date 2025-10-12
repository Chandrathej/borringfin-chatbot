"use client";

import {
  HomeIcon,
  ChartBarIcon,
  RectangleStackIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const menuItems = [
    { label: "Home", icon: <HomeIcon className="w-6 h-6" /> },
    { label: "Analytics", icon: <ChartBarIcon className="w-6 h-6" /> },
    { label: "Dashboard", icon: <RectangleStackIcon className="w-6 h-6" /> },
    { label: "Profile", icon: <UserIcon className="w-6 h-6" /> },
  ];

  const previousChats = [
    "Retirement Planning",
    "Budget Analysis",
    "Loan Review",
  ];

  return (
    <div className="flex flex-col justify-between w-64 h-screen text-gray-200 p-4 
      bg-neutral-900/40 backdrop-blur-xl border-r border-neutral-800/50 
      shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] relative">
      
      {/* Frost overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-r-2xl"></div>

      {/* Top Section */}
      <div className="relative z-10 space-y-4">
        {/* New Chat */}
        <button
          className="w-full flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800/40 
          hover:bg-neutral-700/40 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:scale-[1.03]
          active:scale-[0.98] transition-all font-medium cursor-pointer backdrop-blur-md border border-neutral-700/50"
        >
          <PlusIcon className="w-5 h-5 text-blue-400" />
          <span>New Chat</span>
        </button>

        {/* Menu Items */}
        <div className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg 
              bg-transparent hover:bg-neutral-800/40 hover:scale-[1.03] 
              transition-all font-medium cursor-pointer border border-transparent 
              hover:border-neutral-700/40 hover:shadow-[0_0_10px_rgba(255,255,255,0.08)]"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-800/60 mt-6 relative z-10"></div>

      {/* Bottom Section - Previous Chats */}
      <div className="relative z-10 mt-4 flex-1 overflow-y-auto custom-scrollbar">
        <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-2">
          Previous Chats
        </h3>
        <div className="space-y-2">
          {previousChats.map((chat) => (
            <button
              key={chat}
              className="w-full text-left px-4 py-2 rounded-lg bg-transparent 
              hover:bg-neutral-800/40 hover:scale-[1.03] transition-all 
              font-medium cursor-pointer border border-transparent 
              hover:border-neutral-700/40 hover:shadow-[0_0_8px_rgba(255,255,255,0.08)]"
            >
              {chat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
