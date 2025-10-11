"use client";

import React from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Page = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col ml-60 p-6 gap-6">
        {/* Header */}
        <header className="sticky top-0 bg-gray-800 py-4 px-6 z-10 shadow-md rounded-b flex justify-between items-center transition-colors duration-150">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-100">Boringfin</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Your friendly personal finance assistant 🤖
            </p>
          </div>

          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl shadow transition-transform duration-150 hover:scale-105">
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
