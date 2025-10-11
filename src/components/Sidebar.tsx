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
    <aside className="fixed left-0 top-0 h-full w-60 bg-gray-900 text-gray-200 shadow-lg flex flex-col justify-between">
      {/* Top: New Chat */}
      <div className="p-6 flex flex-col gap-6">
        <button className="flex items-center gap-2 bg-gray-700 px-3 py-3 rounded-xl shadow hover:bg-gray-600 transition-colors">
          <FaPlus /> New Chat
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col gap-4 mt-6">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                pathname === item.path
                  ? "bg-gray-800 border-l-4 border-blue-gray-400 pl-2 text-gray-100"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.icon} {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom: Previous Chats */}
      <div className="p-6 flex flex-col gap-2 border-t border-gray-700 overflow-y-auto max-h-1/3">
        <h3 className="text-gray-400 uppercase text-xs mb-2">Previous Chats</h3>
        {previousChats.map((chat) => (
          <a
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="px-3 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            {chat.title}
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
