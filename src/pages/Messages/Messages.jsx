import { useState, useRef, useEffect } from "react";
import { FiSend, FiPaperclip, FiSmile } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import utils from "../../utils/utils";
import { useSelector } from "react-redux";
import personSvg from "../../assets/icons/User.png";

const Messages = () => {
  const location = useLocation();
  const { vehicle, seller, buyer, chatOpen } = location.state || {};
  const { user } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const chatboxRef = useRef(null);
  const [activeTab, setActiveTab] = useState("seller");
  const [conversations, setConversations] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if chat exists between users for this vehicle
  const checkChatExists = async () => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}chats?filters[$or][0][seller][$eq]=${user.id}&filters[$and][0][buyer][$eq]=${user.id}&filters[$and][1][vehicle][$eq]=${vehicle}`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );

      if (response.data.data.length > 0) {
        // Chat exists
        const chat = response.data.data[0];
        setCurrentChatId(chat.id);
        fetchMessages(chat.id);
        return chat.id;
      }
      return null;
    } catch (error) {
      console.error("Error checking chat:", error);
      return null;
    }
  };

  // Create new chat if doesn't exist
  const createChat = async () => {
    try {
      const payload = {
        data: {
          vehicle: vehicle,
          seller: seller,
          buyer: user.id,
          chatOpen: true,
        },
      };

      const response = await axios.post(`${utils.BASE_URL}chats`, payload, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
          "Content-Type": "application/json",
        },
      });

      const chatId = response.data.data.id;
      setCurrentChatId(chatId);
      return chatId;
    } catch (error) {
      console.error("Error creating chat:", error);
      return null;
    }
  };

  // Initialize chat - check first, create if needed
  const initializeChat = async () => {
    const existingChatId = await checkChatExists();
    if (!existingChatId) {
      // Don't create chat yet - will create when first message is sent
      console.log(
        "No existing chat found, will create when first message is sent"
      );
    }
    setIsLoading(false);
  };

  // Fetch messages for a chat
  const fetchMessages = async (chatId) => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}messages?populate=*&filters[chat][id][$eq]=${chatId}&sort=createdAt:asc`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );

      const formattedMessages = response?.data?.data?.map((msg) => ({
        id: msg.id,
        text: msg.content,
        type: msg.sender?.id === user.id ? "user" : "other",
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setMessages(formattedMessages);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Fetch seller conversations
  const fetchSellerConversations = async () => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}chats?populate=buyer&filters[seller][$eq]=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );

      console.log(response, "transformedConversations res seller");

      const transformedConversations = response?.data?.data?.map((chat) => {
        const otherUser = chat?.buyer;
        const lastMessage =
          chat.messages?.length > 0
            ? chat.messages[chat.messages.length - 1]?.content || ""
            : "";

        return {
          id: chat.id,
          user: {
            id: otherUser.id,
            name: `${otherUser.fname} ${otherUser.lname}`,
            email: otherUser.email,
            title: "Buyer",
            online: true,
            avatar: otherUser.picture,
          },
          lastMessage,
          time: chat.updatedAt
            ? new Date(chat.updatedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Just now",
          unread: 0,
          vehicle: chat.vehicle || null,
        };
      });

      console.log(transformedConversations, "transformedConversations seller");

      setConversations(transformedConversations);
    } catch (error) {
      console.error("Failed to fetch seller conversations:", error);
    }
  };

  // Fetch buyer conversations
  const fetchBuyerConversations = async () => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}chats?populate=seller&filters[buyer][$eq]=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      console.log(response, "transformedConversations res buyer");

      const transformedConversations = response?.data?.data?.map((chat) => {
        const otherUser = chat?.seller;
        const lastMessage =
          chat.messages?.length > 0
            ? chat.messages[chat.messages.length - 1]?.content || ""
            : "";

        return {
          id: chat.id,
          user: {
            id: otherUser.id,
            name: `${otherUser.fname} ${otherUser.lname}`,
            email: otherUser.email,
            title: "Seller",
            online: true,
            avatar: otherUser.picture,
          },
          lastMessage,
          time: chat.updatedAt
            ? new Date(chat.updatedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Just now",
          unread: 0,
          vehicle: chat.vehicle || null,
        };
      });

      console.log(transformedConversations, "transformedConversations buyer");

      setConversations(transformedConversations);
    } catch (error) {
      console.error("Failed to fetch buyer conversations:", error);
    }
  };

  // Load conversations based on active tab
  useEffect(() => {
    if (activeTab === "seller") {
      fetchSellerConversations();
    } else {
      fetchBuyerConversations();
    }
  }, [activeTab]);

  // Initialize chat when component mounts
  useEffect(() => {
    if (vehicle && seller && buyer) {
      initializeChat();
    }
  }, [vehicle, seller, buyer]);

  // Send message
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // If no chat exists, create one first
    let chatId = currentChatId;
    if (!chatId) {
      chatId = await createChat();
      if (!chatId) {
        console.error("Failed to create chat");
        return;
      }
    }

    const payload = {
      data: {
        content: inputMessage,
        sender: user.id,
        chat: chatId,
      },
    };

    try {
      const response = await axios.post(`${utils.BASE_URL}messages`, payload, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
          "Content-Type": "application/json",
        },
      });

      // Add the new message to local state
      const newMessage = {
        text: inputMessage,
        type: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");
      scrollToBottom();

      // Refresh conversations to update last message
      if (activeTab === "seller") {
        fetchSellerConversations();
      } else {
        fetchBuyerConversations();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
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
      (conv.lastMessage &&
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="p-3 md:p-6 bg-gray-900 h-screen flex items-center justify-center">
        <div className="text-white">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6 bg-gray-900">
      <div className="w-full max-w-[1200px] h-screen mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 text-yellow-400 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>

        {/* Tabs */}
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <button
                onClick={() => setActiveTab("seller")}
                className={`inline-block p-4 border-b-2 min-w-[100px] rounded-t-lg transition-all duration-300 ease-in-out ${
                  activeTab === "seller"
                    ? "text-yellow-400 border-yellow-400"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Seller
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => setActiveTab("buyer")}
                className={`inline-block p-4 min-w-[100px] border-b-2 rounded-t-lg transition-all duration-300 ease-in-out ${
                  activeTab === "buyer"
                    ? "text-yellow-400 border-yellow-400"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Buyer
              </button>
            </li>
          </ul>
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
                    fetchMessages(conversation.id);
                  }}
                  className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 flex items-center ${
                    activeConversation === conversation.id ? "bg-gray-700" : ""
                  }`}
                >
                  <div className="relative mr-3">
                    <img
                      src={conversation.user.avatar || personSvg}
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
                      {conversation.lastMessage || "No messages yet"}
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
              {activeConversation ? (
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <img
                      src={
                        conversations.find((c) => c.id === activeConversation)
                          ?.user.avatar || personSvg
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
                  </div>
                </div>
              ) : (
                <div className="text-white">Select a conversation</div>
              )}

              {activeConversation && (
                <div className="flex space-x-2">
                  <Link
                    to={`/details/${vehicle || ""}`}
                    className="text-white text-xs bg-yellow-500 px-2 py-1 rounded-md"
                  >
                    View Ad
                  </Link>
                </div>
              )}
            </div>

            {/* Messages */}
            <div
              ref={chatboxRef}
              className="flex-1 p-4 overflow-y-auto h-screen max-h-[90vh] bg-gray-900"
            >
              {activeConversation ? (
                messages.length > 0 ? (
                  <div className="space-y-3">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.type === "user"
                            ? "justify-end"
                            : "justify-start"
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
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    No messages yet
                  </div>
                )
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  Select a conversation to view messages
                </div>
              )}
            </div>

            {/* Message Input */}

            <div className="p-3 border-t border-gray-700 bg-gray-800">
              <div className="flex items-center">
                <button className="text-gray-400 hover:text-yellow-400 mx-2">
                  <FiPaperclip />
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
