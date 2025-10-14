"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MicrophoneIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";

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

interface ChatWindowProps {
  moduleName?: string;
}

export default function ChatWindow({ moduleName }: ChatWindowProps) {
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

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      // Prevent auto-restart and ensure clean stop
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // --- Speech Control ---
  const startListening = () => {
    if (!recognitionRef.current) return;

    try {
      // Force stop any previous unfinished session to avoid cached transcripts
      recognitionRef.current.abort();
      recognitionRef.current.stop();

      setInputText(""); // clear any cached partials
      recognitionRef.current.start();
      setListening(true);
    } catch (err) {
      console.error("Error starting speech recognition:", err);
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.stop();
      recognitionRef.current.abort(); // ensure full reset
      setListening(false);
    } catch (err) {
      console.error("Error stopping speech recognition:", err);
    }
  };

  // --- Send Message ---
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
      const conversation = messages
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        }))
        .concat([{ role: "user", content: userMessage.text }]);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });

      const data = await response.json();

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingMessage.id
            ? { ...msg, text: data.reply, typing: false }
            : msg
        )
      );
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingMessage.id
            ? { ...msg, text: "Error connecting to backend", typing: false }
            : msg
        )
      );
    }
  };

  // --- JSX ---
  return (
    <div className="flex flex-col h-full w-full rounded-2xl backdrop-blur-md bg-neutral-950/50 border border-neutral-800/50 shadow-inner">
      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent"
      >
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm italic">
            Start chatting with {moduleName} assistant...
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <motion.div
                whileHover={
                  msg.sender === "bot" && !msg.typing ? { scale: 1.02 } : {}
                }
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm transition-all duration-300 ${
                  msg.sender === "user"
                    ? "bg-blue-600/80 text-white shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                    : msg.typing
                    ? "bg-neutral-700/60 text-gray-300 italic animate-pulse"
                    : "bg-neutral-800/60 text-gray-200 border border-neutral-700/50"
                }`}
              >
                {msg.text}

                {msg.sender === "bot" && !msg.typing && (
                  <div className="flex gap-2 mt-1 justify-start">
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(34,197,94,0.2)",
                      }}
                      className="p-1.5 rounded-full transition cursor-pointer"
                    >
                      <HandThumbUpIcon className="w-4 h-4 text-green-400" />
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(239,68,68,0.2)",
                      }}
                      className="p-1.5 rounded-full transition cursor-pointer"
                    >
                      <HandThumbDownIcon className="w-4 h-4 text-red-400" />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 p-3 bg-neutral-900/60 backdrop-blur-lg border-t border-neutral-800/50 rounded-b-2xl shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className={`flex-1 p-3 rounded-full bg-neutral-800/60 text-gray-100 placeholder-gray-500 focus:outline-none border border-neutral-700/60 
            focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 ${
              listening ? "animate-pulse ring-1 ring-blue-400/60" : ""
            }`}
        />

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => {
              if (listening) stopListening();
              else startListening();
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: listening ? "" : "0 0 6px rgba(0,200,255,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full transition-all duration-300 ${
              listening
                ? "bg-blue-500/30 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)] animate-pulse"
                : "text-gray-300 hover:bg-neutral-700/60"
            }`}
          >
            <MicrophoneIcon className="w-6 h-6" />
          </motion.button>

          {listening && (
            <div className="flex items-end gap-1 ml-2">
              <div className="w-1 h-3 bg-green-400 animate-bounce"></div>
              <div className="w-1 h-5 bg-green-400 animate-bounce delay-75"></div>
              <div className="w-1 h-4 bg-green-400 animate-bounce delay-150"></div>
              <div className="w-1 h-6 bg-green-400 animate-bounce delay-200"></div>
            </div>
          )}
        </div>

        <motion.button
          onClick={sendMessage}
          disabled={!inputText.trim()}
          whileHover={
            inputText.trim()
              ? { scale: 1.05, boxShadow: "0 0 8px rgba(59,130,246,0.4)" }
              : {}
          }
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-full transition-all duration-300 ${
            inputText.trim()
              ? "bg-blue-600/70 hover:bg-blue-500 text-white shadow-[0_0_8px_rgba(59,130,246,0.4)]"
              : "bg-neutral-800/50 text-gray-500 cursor-not-allowed"
          }`}
        >
          <PaperAirplaneIcon className="w-6 h-6 rotate-90" />
        </motion.button>
      </div>
    </div>
  );
}
