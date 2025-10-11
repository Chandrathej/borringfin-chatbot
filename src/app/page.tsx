"use client";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { FaQuestionCircle } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0 relative px-8 py-6">
        {/* Top bar: title left, sign-in right */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            BoringFin <FaQuestionCircle />
          </h1>
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
            Sign In
          </button>
        </div>

        {/* Chat window */}
        <ChatWindow />
      </div>
    </main>
  );
}
