"use client";

import { HomeIcon, ChartBarIcon, RectangleStackIcon, UserIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const menuItems = [
    { label: "Home", icon: <HomeIcon className="w-5 h-5" /> },
    { label: "Analytics", icon: <ChartBarIcon className="w-5 h-5" /> },
    { label: "Dashboard", icon: <RectangleStackIcon className="w-5 h-5" /> },
    { label: "Profile", icon: <UserIcon className="w-5 h-5" /> },
  ];

  const previousChats = [
    "Retirement Planning",
    "Budget Analysis",
    "Loan Review",
  ];

  return (
    <div className="flex flex-col justify-between w-64 h-screen bg-neutral-900 text-gray-200 p-4">
      {/* Top Section */}
      <div className="space-y-4">
        {/* New Chat */}
        <button className="w-full flex items-center gap-2 px-4 py-2 rounded hover:bg-neutral-800 transition-colors font-medium cursor-pointer">
          <PlusIcon className="w-5 h-5 text-blue-500" />
          New Chat
        </button>

        {/* Menu Items */}
        <div className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-neutral-800 transition-colors font-medium cursor-pointer"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Section - Previous Chats */}
      <div className="mt-6 space-y-2">
        <h3 className="text-gray-400 text-xs uppercase tracking-wide">
          Previous Chats
        </h3>
        {previousChats.map((chat) => (
          <button
            key={chat}
            className="w-full text-left px-4 py-2 rounded hover:bg-neutral-800 transition-colors font-medium cursor-pointer"
          >
            {chat}
          </button>
        ))}
      </div>
    </div>
  );
}
