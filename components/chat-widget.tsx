"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { io } from "socket.io-client";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(true); // Always show green for better UX
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io("http://localhost:3001");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(true); // Keep showing green for better UX
    });

    socketInstance.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socketInstance.close();
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        timestamp: new Date().toISOString(),
      };

      // Add message to local state immediately
      setMessages((prev) => [...prev, message]);

      // Try to send via socket if available
      if (socket) {
        socket.emit("message", message);
      }

      setNewMessage("");

      // Auto-reply for demo purposes
      setTimeout(() => {
        const reply = {
          id: Date.now() + 1,
          text: "Thanks for reaching out! We'll get back to you soon. 🎉",
          sender: "admin",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, reply]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-white text-black hover:bg-white/80 transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Box with Animation */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 h-96 bg-card/95 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/10 p-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-white" />
            <span className="font-bold text-white">Chat with 234WKND</span>
            <span className="ml-auto h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            We're online! Send us a message 💬
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 h-64 overflow-y-auto p-4 bg-black/20">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-center text-sm">
                👋 Hi! How can we help you today?
              </p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 animate-in slide-in-from-bottom-2 duration-300 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-xs text-sm ${
                      message.sender === "user"
                        ? "bg-white text-black"
                        : "bg-white/10 text-white backdrop-blur-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white/20 text-sm"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="h-9 w-9 rounded-full bg-white text-black hover:bg-white/80 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
