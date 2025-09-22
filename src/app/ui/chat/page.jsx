"use client";
import { useChat } from "@ai-sdk/react";
import React, { useState } from "react";

export default function ChatPage() {
  const [input, setinput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat();
  console.log(messages);
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage({ text: input });
    setinput("");
  };
  return (
    <div className="flex flex-col w-full max-w-md mx-auto py-24 stretch">
      {error && <div className="text-red-500 mb-4">{error.message}</div>}

      {/* Messages Area */}
      <div className="flex flex-col-reverse flex-grow pb-24">
        {messages.map((m) => (
          <div key={m.id} className="mb-4">
            <div className="font-semibold">
              {m.role === "user" ? "You" : "AI"}
            </div>
            {m.parts.map((part, index) => {
              switch (part.type) {
                case "text":
                  return (
                    <div
                      key={`${m.id}-${index}`}
                      className="whitespace-pre-wrap"
                    >
                      {part.text}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        ))}
      </div>
      {(status === "submitted" || status === "streaming") && (
        <div className="mb-4">
          <div className="fex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
          </div>
        </div>
      )}

      {/* Fixed Input Form */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center bg-black border-t">
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-full max-w-xl p-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md"
            disabled={status !== "ready"}
          />
          {status === "submitted" || status === "streaming" ? (
            <button
              onClick={stop}
              className="px-4 py-2 bg-red-500 text-white rounded-r-md disabled:bg-gray-400"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md disabled:bg-gray-400"
              disabled={status !== "ready"}
            >
              Send
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
