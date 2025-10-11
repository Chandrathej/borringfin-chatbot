"use client";

import React from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Page = () => {
  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col ml-60 p-6 gap-6">
        {/* Header */}
        <header className="sticky top-0 bg-gray-900 py-4 px-6 z-10 shadow-md rounded-b flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Boringfin</h1>
            <p className="text-gray-300 mt-1 text-sm">
              Your friendly personal finance assistant 🤖
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition">
            Sign In
          </button>
        </header>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <ChatWindow />
        </div>
      </main>
    </div>
  );
};

export default Page;
