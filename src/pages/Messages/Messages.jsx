import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiPaperclip, FiSmile } from "react-icons/fi";
import { BsFillChatFill, BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { RiChatDeleteLine } from "react-icons/ri";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const chatboxRef = useRef(null);

  // Sample conversations data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        online: true,
        title: "Web Developer",
      },
      lastMessage: "Hey, when can we schedule the meeting?",
      time: "2 min ago",
      unread: 0,
    },
    {
      id: 2,
      user: {
        name: "Sarah Smith",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        online: false,
        title: "Graphic Designer",
      },
      lastMessage: "I've sent the first draft",
      time: "1 hour ago",
      unread: 3,
    },
    {
      id: 3,
      user: {
        name: "Mike Johnson",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        online: true,
        title: "Marketing Specialist",
      },
      lastMessage: "The campaign is performing well",
      time: "3 hours ago",
      unread: 0,
    },
  ]);

  // Sample messages for each conversation
  const conversationMessages = {
    1: [
      { text: "Hey there!", type: "bot", time: "10:30 AM" },
      { text: "Hi! How can I help you today?", type: "user", time: "10:31 AM" },
      {
        text: "I'm looking for a web developer for my project",
        type: "bot",
        time: "10:32 AM",
      },
      {
        text: "Great! I specialize in React and Node.js. What's your project about?",
        type: "user",
        time: "10:33 AM",
      },
      {
        text: "Hey, when can we schedule the meeting?",
        type: "bot",
        time: "2 min ago",
      },
    ],
    2: [
      { text: "Hello Sarah!", type: "user", time: "9:00 AM" },
      {
        text: "Hi! I'm working on your logo design",
        type: "bot",
        time: "9:05 AM",
      },
      { text: "What style are you looking for?", type: "bot", time: "9:06 AM" },
      {
        text: "I want something modern and minimalist",
        type: "user",
        time: "9:10 AM",
      },
      { text: "I've sent the first draft", type: "bot", time: "1 hour ago" },
    ],
    3: [
      {
        text: "Hi Mike, how's the campaign going?",
        type: "user",
        time: "8:00 AM",
      },
      {
        text: "It's going well! We've got good engagement",
        type: "bot",
        time: "8:15 AM",
      },
      { text: "What's the CTR looking like?", type: "user", time: "8:20 AM" },
      {
        text: "Around 3.5% which is above industry average",
        type: "bot",
        time: "8:25 AM",
      },
      {
        text: "The campaign is performing well",
        type: "bot",
        time: "3 hours ago",
      },
    ],
  };

  // Load messages when conversation changes
  useEffect(() => {
    if (activeConversation) {
      setMessages(conversationMessages[activeConversation] || []);
    }
  }, [activeConversation]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      text: inputMessage,
      type: "user",
      time: "Just now",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    // Simulate bot response after 1 second
    setTimeout(() => {
      const botResponse = {
        text: "Thanks for your message! I'll get back to you soon.",
        type: "bot",
        time: "Just now",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    scrollToBottom();
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

  const markAsRead = (conversationId) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unread: 0 } : conv
      )
    );
  };

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-3 md:p-6 bg-gray-900">
      <div className="w-full max-w-[1200px] h-screen mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 text-yellow-400 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-700 flex flex-col">
            {/* Search */}
            <div className="p-3 border-b border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 bg-gray-800 text-white"
                />
                <BsSearch className="absolute left-2 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto bg-gray-800">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => {
                    setActiveConversation(conversation.id);
                    markAsRead(conversation.id);
                  }}
                  className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 flex items-center ${
                    activeConversation === conversation.id ? "bg-gray-700" : ""
                  }`}
                >
                  <div className="relative mr-3">
                    <img
                      src={conversation.user.avatar}
                      alt={conversation.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {conversation.user.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-white truncate">
                        {conversation.user.name}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 truncate">
                      {conversation.lastMessage}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {conversation.user.title}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="ml-2 bg-yellow-500 text-gray-900 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="w-2/3 flex flex-col bg-gray-800">
            {/* Chat Header */}
            <div className="p-3 flex justify-between items-center border-b border-gray-700">
              {activeConversation && (
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <img
                      src={
                        conversations.find((c) => c.id === activeConversation)
                          ?.user.avatar
                      }
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {conversations.find((c) => c.id === activeConversation)
                      ?.user.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {
                        conversations.find((c) => c.id === activeConversation)
                          ?.user.name
                      }
                    </h3>
                    <p className="text-xs text-gray-400">
                      {
                        conversations.find((c) => c.id === activeConversation)
                          ?.user.title
                      }
                    </p>
                  </div>
                </div>
              )}
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-yellow-400">
                  <BsThreeDotsVertical />
                </button>
                <button className="text-gray-400 hover:text-yellow-400">
                  <RiChatDeleteLine />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={chatboxRef}
              className="flex-1 p-4 overflow-y-auto h-screen max-h-[90vh] bg-gray-900"
            >
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === "user"
                          ? "bg-yellow-500 text-gray-900 rounded-br-none"
                          : "bg-gray-700 text-white rounded-bl-none"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.type === "user"
                            ? "text-gray-800"
                            : "text-gray-300"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-3 border-t border-gray-700 bg-gray-800">
              <div className="flex items-center">
                <button className="text-gray-400 hover:text-yellow-400 mx-2">
                  <FiPaperclip />
                </button>
                <button className="text-gray-400 hover:text-yellow-400 mx-2">
                  <FiSmile />
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message"
                  className="flex-1 px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 bg-gray-700 text-white"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={`px-3 py-2 text-xl ${
                    inputMessage.trim()
                      ? "text-yellow-400 hover:text-yellow-300"
                      : "text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;