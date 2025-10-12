"use client";

import { useState, useEffect, useRef } from "react";
import { MicrophoneIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  typing?: boolean;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize SpeechRecognition
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      setInputText(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current || listening) return;
    recognitionRef.current.start();
    setListening(true);
  };

  const stopListening = () => {
    if (!recognitionRef.current || !listening) return;
    recognitionRef.current.stop();
    setListening(false);
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setListening(false);

    const thinkingMessage: Message = {
      id: Date.now() + 1,
      text: "AI is thinking...",
      sender: "bot",
      typing: true,
    };
    setMessages((prev) => [...prev, thinkingMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });
      const data = await response.json();

      // Replace AI thinking message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingMessage.id
            ? { ...msg, text: data.reply, typing: false }
            : msg
        )
      );
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingMessage.id
            ? { ...msg, text: "Error connecting to backend", typing: false }
            : msg
        )
      );
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-neutral-950 rounded-lg shadow-lg">
      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-2"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500"
                  : msg.typing
                  ? "bg-gray-600 italic animate-pulse"
                  : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex items-center px-3 py-2 bg-neutral-900 gap-2 rounded-b-lg">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className={`flex-1 p-3 rounded-full bg-neutral-700 text-white focus:outline-none border-none ${
            listening ? "animate-pulse" : ""
          }`}
        />

        {/* Voice icon */}
        <button
          onMouseEnter={startListening}
          onMouseLeave={stopListening}
          className={`text-gray-200 hover:text-white p-2 ${
            listening ? "animate-pulse" : ""
          }`}
        >
          <MicrophoneIcon className="w-6 h-6" />
        </button>

        {/* Send button */}
        <button
          onClick={sendMessage}
          disabled={!inputText.trim()}
          className={`p-2 ${
            inputText.trim()
              ? "text-gray-200 hover:text-white"
              : "text-gray-500 cursor-not-allowed"
          }`}
        >
          <PaperAirplaneIcon className="w-6 h-6 rotate-90" />
        </button>
      </div>
    </div>
  );
}
