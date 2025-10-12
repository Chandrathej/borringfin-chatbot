"use client";

import React from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";

export default function PageWrapper() {
  return (
    <SessionProvider>
      <Page />
    </SessionProvider>
  );
}

function Page() {
  const { data: session, status } = useSession();

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
          {/* Logo + Branding + Welcome */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              {/* SVG Icon */}
              <svg
                className="w-8 h-8 text-blue-500"
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

          {/* Sign In / Sign Out */}
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

        {/* Page content & Chat */}
        <main className="flex-1 flex flex-col p-6">
          {/* Optional main content can go here */}

          {/* ChatWindow fills remaining space */}
          <div className="flex-1 flex flex-col">
            <ChatWindow />
          </div>
        </main>
      </div>
    </div>
  );
}
