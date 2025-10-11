"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { FaArrowUp, FaMicrophone } from "react-icons/fa";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWindow() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setConversation((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();

      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "No reply" },
      ]);
    } catch (err) {
      console.error(err);
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to API" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900 rounded-lg p-4 min-h-0">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-4 space-y-2 min-h-0"
      >
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg break-words w-full max-w-full ${
              msg.role === "user"
                ? "bg-white text-black self-end"
                : "bg-gray-800 self-start text-white"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me a finance question..."
          className="flex-1 p-3 rounded border border-gray-700 bg-gray-900 text-white outline-none"
        />
        <button className="p-3 bg-gray-700 rounded hover:bg-gray-600">
          <FaMicrophone />
        </button>
        <button
          onClick={sendMessage}
          disabled={loading || !message.trim()}
          className="p-3 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? "..." : <FaArrowUp className="text-white text-lg" />}
        </button>
      </div>
    </div>
  );
}
