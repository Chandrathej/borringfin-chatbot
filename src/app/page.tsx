"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();
      setReply(data.reply || "No reply from API");
    } catch (err) {
      console.error(err);
      setReply("Error connecting to API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">💬 BoringFin Assistant</h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me a finance question..."
        className="w-full max-w-md p-3 rounded-lg text-black bg-white border border-gray-400"
        rows={4}
        autoFocus
      />

      <button
        onClick={sendMessage}
        disabled={loading || !message}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {reply && (
        <div className="mt-6 w-full max-w-md p-4 bg-gray-800 rounded-lg">
          <strong>Assistant:</strong> {reply}
        </div>
      )}
    </main>
  );
}
