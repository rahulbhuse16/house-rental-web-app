import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Handle sending messages
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const userMessage = { type: "user", message: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput(""); // Clear input field

    // Fetch AI response
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "user", content: userInput }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_API_KEY`, // Replace with your API key
          }
        }
      );
      const botMessage = {
        type: "bot",
        message: response.data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = {
        type: "bot",
        message: "Sorry, something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Render chat bubbles
  const renderMessages = () =>
    messages.map((msg, index) => (
      <div
        key={index}
        style={{
          maxWidth: "70%",
          padding: "10px 15px",
          borderRadius: "15px",
          fontSize: "14px",
          lineHeight: "1.5",
          alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
          backgroundColor: msg.type === "user" ? "#e1f5fe" : "#f5f5f5",
          color: "#333",
          marginBottom: "10px",
          borderTopRightRadius: msg.type === "user" ? "0" : "15px",
          borderTopLeftRadius: msg.type === "bot" ? "0" : "15px",
        }}
      >
        {msg.message}
      </div>
    ));

  return (
    <div
      style={{
        width: "350px",
        height: "500px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        position: "fixed",
        bottom: "20px",
        right: "20px",
      }}
    >
      {/* Chat Header */}
      <div
        style={{
          backgroundColor: "#3b82f6",
          color: "#fff",
          padding: "15px",
          fontSize: "16px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        HouseBot
      </div>

      {/* Chat Messages */}
      <div
        style={{
          flex: "1",
          padding: "15px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {renderMessages()}
      </div>

      {/* Chat Input */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{
            flex: "1",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "20px",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "0 20px",
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
