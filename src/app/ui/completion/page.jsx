"use client";
import React, { useState } from "react";

const page = () => {
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCompletion("");
    setError(null);

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await response.json();
      setCompletion(data.text);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full max-w-xl mx-auto py-12">
        {/* Display Area for AI Response, Loading, and Errors */}
        <div className="w-full h-64 p-4 border border-gray-300 rounded-md mb-4 whitespace-pre-wrap">
          {error && <p className="text-red-500">{error}</p>}
          {isLoading && <p>Loading...</p>}
          {!isLoading && !error && completion}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="How can I help you?"
            className="flex-grow p-2 border border-gray-300 rounded-l-md"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md disabled:bg-gray-400"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
