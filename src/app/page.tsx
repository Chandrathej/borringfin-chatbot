"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ModuleBar from "../components/ModuleBar";
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";

const modules = [
  "Debt & Liability",
  "Tax Planning",
  "Goal Planning",
  "Expense Analysis",
  "Insurance",
  "Investment",
  "Financial Education",
];

export default function PageWrapper() {
  return (
    <SessionProvider>
      <Page />
    </SessionProvider>
  );
}

function Page() {
  const { data: session, status } = useSession();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-950 text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 relative">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-3 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md z-10">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7v7c0 5 5 9 10 9s10-4 10-9V7l-10-5zM12 12a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              <span className="text-2xl font-semibold font-sans text-gray-100 tracking-tight">
                BoringFin
              </span>
            </div>
            <span className="text-sm text-gray-400 mt-1">
              Welcome! Your personal finance assistant
            </span>
          </div>

          <div>
            {!session ? (
              <button
                className="text-gray-200 border border-gray-700 px-3 py-1 rounded hover:bg-neutral-800"
                onClick={() => signIn("google")}
              >
                Sign In
              </button>
            ) : (
              <button
                className="text-gray-200 border border-gray-700 px-3 py-1 rounded hover:bg-neutral-800"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 flex flex-col p-6">
          {!activeModule ? (
            <ModuleBar onModuleClick={(moduleName: string) => setActiveModule(moduleName)} />
          ) : (
            <div className="flex flex-col flex-1 gap-4">
              {/* Top bar */}
              <div className="flex items-center gap-3">
                {/* Back Button with rounded hover glow */}
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-neutral-400/20 to-neutral-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300"></div>
                  <button
                    onClick={() => setActiveModule(null)}
                    className="relative px-4 py-2 text-gray-200 border border-neutral-700/60 rounded-full bg-neutral-900/50 backdrop-blur-md 
                    transition-all duration-300 group-hover:scale-105 group-hover:border-neutral-500 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                  >
                    &larr; Back
                  </button>
                </div>

                {/* Dropdown with same glassy styling */}
                <select
                  value={activeModule}
                  onChange={(e) => setActiveModule(e.target.value)}
                  className="bg-neutral-900/40 backdrop-blur-md text-gray-100 px-3 py-2 rounded-xl border border-neutral-700/50 shadow-inner focus:outline-none hover:border-neutral-500/70 transition-all duration-300"
                >
                  {modules.map((mod) => (
                    <option key={mod} value={mod}>
                      {mod}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chat window */}
              <div className="flex-1 flex flex-col bg-neutral-950/80 backdrop-blur-md rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)] p-4">
                <ChatWindow moduleName={activeModule} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
