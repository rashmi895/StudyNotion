import { useState } from "react";
import { askAI } from "../Services/operations/AIchatbot";
import React from "react";
function ChatBot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello 👋 How can I help you?"
    }
  ]);

  const handleSend = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    const response = await askAI(message);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: response,
      },
    ]);

    setMessage("");
  };

  return (
    <div className="h-screen p-5 text-white">
      <h1 className="text-2xl font-bold">
        StudyNotion AI Tutor
      </h1>

      <div className="border h-[500px] overflow-y-auto p-4 my-4">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong className="capitalize font-semibold">{msg.role}:</strong> <span className="break-words">{msg.content}</span>
          </div>
        ))}
      </div>

      <input
        className="border p-2 w-3/4 text-white bg-transparent placeholder-gray-400"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="ml-2 bg-yellow-400 px-4 py-2"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}

export default ChatBot;