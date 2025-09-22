// File: src/app/ui/stream/page.jsx

"use client";
import React from "react";
import { useCompletion } from "@ai-sdk/react";

export default function StreamPage() {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,
    setInput,
  } = useCompletion({
    // Point the hook to your streaming API endpoint
    api: "/api/stream",
  });

  // Workaround to clear input after submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e); // Call the original handler
    setInput(""); // Clear the input field
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto py-12">
      {/* Display Area for AI Response, Loading, and Errors */}
      <div className="w-full min-h-64 p-4 border border-gray-300 rounded-md mb-4 whitespace-pre-wrap">
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {isLoading && !completion && <p>Loading...</p>}
        {completion}
      </div>

      {/* Input Form */}
      <form onSubmit={handleFormSubmit} className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className="flex-grow p-2 border border-gray-300 rounded-l-md"
          disabled={isLoading}
        />
        {isLoading ? (
          <button
            type="button"
            onClick={stop}
            className="px-4 py-2 bg-red-500 text-white rounded-r-md"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md disabled:bg-gray-400"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
