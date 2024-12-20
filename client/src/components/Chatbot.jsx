import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const [messages, setMessages] = useState([
    { bot: "Welcome to Travel Murti! Type anything to start." },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleInput = () => {
    if (!inputValue) return;

    let updatedMessages = [...messages, { user: inputValue }];
    if (step === 0) {
      updatedMessages.push({
        bot: "We are Travel Murti, your travel partner! What's your name?",
      });
      setStep(1);
    } else if (step === 1) {
      setUserData({ ...userData, name: inputValue });
      updatedMessages.push({ bot: "Great! What's your email?" });
      setStep(2);
    } else if (step === 2) {
      setUserData({ ...userData, email: inputValue });
      updatedMessages.push({ bot: "Finally, your phone number?" });
      setStep(3);
    } else if (step === 3) {
      setUserData({ ...userData, phone: inputValue });
      updatedMessages.push({
        bot: `Thank you ${
          userData.name || "Guest"
        }! Our team will contact you at ${
          userData.email || "your email"
        } or at ${inputValue}.`,
      });
      sendToAdmin({ ...userData, phone: inputValue });
      setStep(4);
    }
    setMessages(updatedMessages);
    setInputValue("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleInput();
    }
  };

  const sendToAdmin = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/send-email`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Email sent:", response.data);
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <span className="text-white text-xl">💬</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col fixed bottom-0.5 right-0.5 z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Travel Murti Bot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white font-bold text-lg"
            >
              ✖
            </button>
          </div>

          {/* Chat History */}
          <div className="p-4 h-64 overflow-y-auto bg-gray-50 custom-scrollbar">
            {messages.map((msg, index) => (
              <div key={index} className="my-2">
                {msg.bot && (
                  <div className="bg-blue-100 p-2 rounded-lg text-sm text-gray-700 max-w-xs">
                    {msg.bot}
                  </div>
                )}
                {msg.user && (
                  <div className="bg-purple-100 p-2 rounded-lg text-sm text-gray-700 max-w-xs ml-auto">
                    {msg.user}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          {step < 4 && (
            <div className="p-2 bg-gray-100 flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type here..."
                className="flex-grow p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleInput}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
