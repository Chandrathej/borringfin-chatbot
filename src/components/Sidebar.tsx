"use client";

import React from "react";
import { FaHome, FaChartLine, FaUser, FaPlus } from "react-icons/fa";
import { usePathname } from "next/navigation";

interface ChatSummary {
  id: string;
  title: string;
}

const Sidebar = () => {
  const pathname = usePathname();

  // Mock previous chats (replace with backend or localStorage later)
  const previousChats: ChatSummary[] = [
    { id: "1", title: "Retirement Planning" },
    { id: "2", title: "Loan Analysis" },
    { id: "3", title: "Budget Review" },
  ];

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Analytics", icon: <FaChartLine />, path: "/analytics" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-gray-900 text-white shadow-lg flex flex-col justify-between">
      <div className="p-6 flex flex-col gap-6">
        {/* Top: New Chat */}
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded transition">
          <FaPlus /> New Chat
        </button>

        {/* Middle: Menu Items */}
        <nav className="flex flex-col gap-4 mt-6">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded transition-all ${
                pathname === item.path ? "bg-indigo-600" : "hover:bg-indigo-500"
              }`}
            >
              {item.icon} {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom: Previous Chats */}
      <div className="p-6 flex flex-col gap-2 border-t border-gray-700">
        <h3 className="text-gray-300 uppercase text-xs mb-2">Previous Chats</h3>
        {previousChats.map((chat) => (
          <a
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="px-3 py-2 rounded hover:bg-gray-700 transition"
          >
            {chat.title}
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
