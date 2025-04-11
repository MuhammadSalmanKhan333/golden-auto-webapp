import React, { useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { BsFillChatFill } from "react-icons/bs";
const ChatScreen = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatboxRef = useRef(null);
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    const userMessage = inputMessage;
    addMessage(userMessage, "user");
    setInputMessage("");
    setTimeout(() => {
      addMessage("This is a bot response.", "bot");
    }, 500);
  };
  const addMessage = (message, sender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, type: sender },
    ]);
    scrollToBottom();
  };
  const addUserMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, type: "user" },
    ]);
    scrollToBottom();
  };

  const addBotMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, type: "bot" },
    ]);
    scrollToBottom();
  };
  const respondToUser = (userMessage) => {
    setTimeout(() => {
      addBotMessage("This is a response from the chatbot.");
    }, 500);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatboxRef.current) {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }
    }, 0);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className="fixed right-4 bottom-20" style={{ zIndex: "1000" }}>
      <div content="Chats" position="Top">
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          style={{ background: "black", borderRadius: "50%" }}
          className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray transition duration-300 flex items-center"
        >
          <BsFillChatFill />
        </button>
      </div>
      {isChatOpen && (
        <div
          id="chat-container"
          class={`${
            isChatOpen ? "block" : "hidden"
          } fixed bottom-20 right-4  w-96`}
        >
          <div class="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div
              style={{ backgroundColor: "black" }}
              class="p-4  text-white rounded-t-lg flex justify-between items-center"
            >
              <p class="text-lg font-semibold">Chat Bot</p>
              <button
                onClick={() => setIsChatOpen(false)}
                class="text-gray-100 hover:text-gray-300 focus:outline-none focus:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#FFF"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              ref={chatboxRef}
              id="chatbox"
              class="p-4 h-[300px] overflow-y-auto scrollbar-thumb-blue-500 bg-slate-300"
            >
              {messages.map((message, index) => (
                <div key={index} className="mb-2 text-right">
                  <p
                    className={`py-2 px-4 inline-block rounded-lg ${
                      message.type === "isAuthenticated"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}
            </div>
            <div class="p-4  flex bg-slate-300">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                id="user-input"
                placeholder="Type a message"
                class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                id="send-button"
                onClick={handleSendMessage}
                class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;
