"use client";

import { FaPlus, FaHistory } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white flex flex-col p-4">
      {/* New Chat button */}
      <button className="flex items-center gap-2 bg-white text-black py-2 px-4 rounded mb-6 hover:bg-gray-200">
        <FaPlus /> New Chat
      </button>

      {/* Previous Chats section */}
      <div className="mt-auto">
        <h2 className="text-lg font-semibold mb-2">Previous Chats</h2>
        <ul className="space-y-2">
          <li className="p-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer flex items-center gap-2">
            <FaHistory /> Chat 1
          </li>
          <li className="p-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer flex items-center gap-2">
            <FaHistory /> Chat 2
          </li>
          {/* Add more previous chats dynamically later */}
        </ul>
      </div>
    </div>
  );
}
