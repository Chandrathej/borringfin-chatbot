"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ModuleBar from "../components/ModuleBar";
import WelcomePage from "../components/WelcomePage";
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
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);

  // 🔁 Always check onboarding after login
  useEffect(() => {
    if (!session || !session.user?.email) return;

    const checkOnboarding = async () => {
      try {
        const res = await fetch("/api/user/status", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch user status");
        const data = await res.json();
        setOnboardingComplete(data.onboardingComplete ?? false);
      } catch (err) {
        console.error("Error fetching user status:", err);
        setOnboardingComplete(false); // fallback
      }
    };

    checkOnboarding();
  }, [session]); // runs once when session is ready

  // 🕒 Loading auth
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading...
      </div>
    );
  }

  // 🧍Not logged in
  if (!session) {
    return (
      <div className="flex h-screen bg-neutral-950 text-gray-100 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 relative">
          <Header session={session} />
          <main className="flex-1 flex flex-col p-6 overflow-y-auto">
            <ModuleSection activeModule={activeModule} setActiveModule={setActiveModule} />
          </main>
        </div>
      </div>
    );
  }

  // 🧩 Session active but status not yet fetched
  if (onboardingComplete === null) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Checking profile...
      </div>
    );
  }

  // 🧭 Onboarding incomplete
  if (onboardingComplete === false) {
    return (
      <div className="flex h-screen bg-neutral-950 text-gray-100 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 relative">
          <Header session={session} />
          <main className="flex-1 p-6 overflow-y-auto">
            <WelcomePage user={session.user} />
          </main>
        </div>
      </div>
    );
  }

  // ✅ Fully onboarded
  return (
    <div className="flex h-screen bg-neutral-950 text-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 relative">
        <Header session={session} />
        <main className="flex-1 flex flex-col p-6 overflow-y-auto">
          <ModuleSection activeModule={activeModule} setActiveModule={setActiveModule} />
        </main>
      </div>
    </div>
  );
}

/* ----------------------------- Header Component ----------------------------- */
function Header({ session }: { session: any }) {
  return (
    <header className="flex justify-between items-center px-6 py-3 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md z-10">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v7c0 5 5 9 10 9s10-4 10-9V7l-10-5zM12 12a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
          <span className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-100">
            BoringFin
          </span>
        </div>
        <span className="text-sm md:text-base text-gray-400 mt-1">
          Your personal finance assistant
        </span>
      </div>

      <div>
        {!session ? (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(0,200,255,0.25)" }}
            whileTap={{ scale: 0.97 }}
            className="text-gray-200 border border-gray-700 px-3 py-1 rounded hover:bg-neutral-800 transition-all duration-200"
            onClick={() => signIn("google")}
          >
            Sign In
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(0,200,255,0.25)" }}
            whileTap={{ scale: 0.97 }}
            className="text-gray-200 border border-gray-700 px-3 py-1 rounded hover:bg-neutral-800 transition-all duration-200"
            onClick={() => signOut()}
          >
            Sign Out
          </motion.button>
        )}
      </div>
    </header>
  );
}

/* --------------------------- Module Section --------------------------- */
function ModuleSection({
  activeModule,
  setActiveModule,
}: {
  activeModule: string | null;
  setActiveModule: (val: string | null) => void;
}) {
  return (
    <AnimatePresence mode="wait">
      {!activeModule ? (
        <motion.div
          key="modules"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <ModuleBar onModuleClick={(moduleName: string) => setActiveModule(moduleName)} />
        </motion.div>
      ) : (
        <motion.div
          key="chat"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col flex-1 gap-4"
        >
          <div className="flex items-center gap-3">
            <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <button
                onClick={() => setActiveModule(null)}
                className="relative px-4 py-2 text-gray-200 border border-neutral-700/60 rounded-full bg-neutral-900/50 backdrop-blur-md hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]"
              >
                &larr; Back
              </button>
            </motion.div>

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

          <motion.div
            className="flex-1 flex flex-col bg-neutral-950/80 backdrop-blur-md rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)] p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ChatWindow moduleName={activeModule} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
