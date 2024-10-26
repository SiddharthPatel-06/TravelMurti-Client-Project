import React, { useState } from "react";
// import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to open and close chatbot
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {/* Toggle button */}
      {!isOpen && (
        <button className="chatbot-toggle-btn" onClick={toggleChatbot}>
          💬
        </button>
      )}

      {/* Chatbot box */}
      <div className={`chatbot-box ${isOpen ? "open" : ""}`}>
        {/* Close button inside the chatbot box */}
        <button className="chatbot-close-btn" onClick={toggleChatbot}>
          ✕
        </button>

        {/* Chatbot iframe */}
        <iframe
          className="chatbot-iframe"
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/fab51271-c4e6-425a-a693-8bdac0442633"
        ></iframe>
      </div>
    </div>
  );
}

export default Chatbot;
