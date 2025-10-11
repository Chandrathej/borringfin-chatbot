"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { FaArrowUp, FaMicrophone, FaCheck } from "react-icons/fa";

type Message = { role: "user" | "assistant"; content: string; emoji?: string };

const trackEvent = (name: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag(name, params);
  }
};

export default function ChatWindow() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sentConfirm, setSentConfirm] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setConversation((prev) => [
      ...prev,
      { role: "user", content: message, emoji: "🙂" },
    ]);

    trackEvent("send_message", { message_length: message.length });
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
        { role: "assistant", content: data.reply || "No reply", emoji: "🤖" },
      ]);

      setSentConfirm(true);
      setTimeout(() => setSentConfirm(false), 1000);
    } catch (err) {
      console.error(err);
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to API", emoji: "⚠️" },
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
    <div className="flex-1 flex flex-col bg-gray-900 rounded-xl p-4 min-h-0 shadow-inner">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-4 space-y-3 min-h-0"
      >
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl break-words max-w-full shadow transition-transform duration-150 ${
              msg.role === "user"
                ? "bg-gray-700 text-white self-end transform hover:scale-105"
                : "bg-gray-800 self-start text-gray-200 transform hover:scale-105"
            }`}
          >
            {msg.emoji && <span className="mr-1">{msg.emoji}</span>}
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="p-3 rounded-2xl bg-gray-800 self-start animate-pulse shadow">
            🤖 AI is thinking...
          </div>
        )}
      </div>

      {/* Input with mic + send/tick */}
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me a finance question..."
          className="w-full p-3 pr-20 rounded-xl border border-gray-700 bg-gray-900 text-white outline-none shadow focus:border-gray-500 transition-colors duration-150"
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <FaMicrophone className="text-gray-400 hover:text-gray-200 cursor-pointer transition-colors duration-150" />
          {sentConfirm ? (
            <FaCheck className="text-green-400 transition-transform duration-150 animate-bounce" />
          ) : (
            <FaArrowUp
              onClick={sendMessage}
              className={`text-gray-300 cursor-pointer hover:text-gray-200 transition-colors duration-150 ${
                loading || !message.trim() ? "opacity-50 pointer-events-none" : ""
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
