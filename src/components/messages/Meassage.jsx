// "use client";

// import url from "@/redux/api/baseUrl";
// import { useGetChatlistQuery } from "@/redux/fetures/messaging/getChatlist";
// import { useGetMessageQuery } from "@/redux/fetures/messaging/getMessage";
// import { useSendMessageMutation } from "@/redux/fetures/messaging/sendMessage";
// import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";
// import React, { useEffect, useState, useRef } from "react";
// import { Menu } from "lucide-react";
// import { useSearchParams } from "next/navigation";
// import io from "socket.io-client";
// import { Button } from "antd";

// // Use original socket connection only - removed the duplicate
// const socket = io("https://sayed3040.sobhoy.com");

// const MessagesPage = () => {
//   const { data: chatList } = useGetChatlistQuery();
//   const { data: user } = useLogedUserQuery();
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [sendMessage, { isLoading }] = useSendMessageMutation();
//   const searchParams = useSearchParams();
//   const chatIdFromQuery = searchParams.get("chatId");

//   const [activeChatId, setActiveChatId] = useState(chatIdFromQuery || null);
//   const { data: messagesData, refetch: refetchMessages } = useGetMessageQuery(activeChatId, {
//     skip: !activeChatId,
//   });

//   const chatData = chatList?.data?.attributes || [];
//   const userId = user?.data?.attributes?.user?.id;

//   const users = chatData.map((chat) => {
//     const participant = chat.participants.find((p) => p.id !== userId);
//     return {
//       id: participant?.id,
//       name: participant?.fullName,
//       status: participant?.role,
//       avatar: url + participant?.image?.url,
//       chatId: chat.id,
//     };
//   });

//   const [activeUser, setActiveUser] = useState(users.find(user => user.chatId === activeChatId) || users[0] || null);
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [unreadMessages, setUnreadMessages] = useState({});
//   const messagesInitializedRef = useRef({});
//   const processedMessagesRef = useRef(new Set()); // Track which messages we've already processed

//   // Listen for window resize to set sidebar visibility
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setShowSidebar(true);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Initial socket connection
//   useEffect(() => {
//     socket.emit("client_connect", "hello data from client");
    
//     if (userId) {
//       socket.emit("user_connected", userId);
//     }

//     // Clean up processed messages cache when component unmounts
//     return () => {
//       processedMessagesRef.current.clear();
//     };
//   }, [userId]);

//   // Set up message listener for the active chat only
//   useEffect(() => {
//     if (!activeChatId) return;
    
//     const eventName = `messages::${activeChatId}`;
    
//     const handleIncomingMessage = (message) => {
//       console.log("Received message:", message);
      
//       // Check if we've already processed this message
//       if (processedMessagesRef.current.has(message._id)) {
//         return;
//       }
      
//       // Mark this message as processed
//       processedMessagesRef.current.add(message._id);
      
//       setMessages(prevMessages => {
//         // Check if message already exists in our state
//         const messageExists = prevMessages.some(msg => msg._id === message._id);
        
//         if (!messageExists) {
//           return [...prevMessages, message];
//         }
        
//         return prevMessages.map(msg =>
//           msg._id === message._id ? { ...msg, ...message } : msg
//         );
//       });
//     };
    
//     socket.on(eventName, handleIncomingMessage);
    
//     // Clean up
//     return () => {
//       socket.off(eventName, handleIncomingMessage);
//     };
//   }, [activeChatId]);

//   // Handle unread messages for non-active chats
//   useEffect(() => {
//     if (!userId || !chatData.length) return;
    
//     // Set up listeners for all non-active chat IDs
//     chatData.forEach(chat => {
//       if (chat.id === activeChatId) return; // Skip active chat
      
//       const eventName = `messages::${chat.id}`;
      
//       const handleBackgroundMessage = (message) => {
//         // Update unread counter for non-active chats
//         setUnreadMessages(prev => ({
//           ...prev,
//           [chat.id]: (prev[chat.id] || 0) + 1
//         }));
//       };
      
//       socket.on(eventName, handleBackgroundMessage);
      
//       return () => {
//         socket.off(eventName, handleBackgroundMessage);
//       };
//     });
//   }, [chatData, activeChatId, userId]);

//   // Join active chat room
//   useEffect(() => {
//     if (activeChatId) {
//       socket.emit("join_chat", activeChatId);
//       console.log("Joined chat room:", activeChatId);
//     }
//   }, [activeChatId]);

//   // Update messages when messagesData changes
//   useEffect(() => {
//     if (activeChatId && messagesData?.data?.attributes) {
//       const chatMessages = messagesData.data.attributes;
      
//       // Add all fetched messages to our processed set
//       chatMessages.forEach(msg => {
//         processedMessagesRef.current.add(msg._id);
//       });
      
//       messagesInitializedRef.current[activeChatId] = true;
//       setMessages(chatMessages);
      
//       setUnreadMessages(prev => ({
//         ...prev,
//         [activeChatId]: 0
//       }));
//     }
//   }, [activeChatId, messagesData]);

//   // Scroll to bottom when messages change
//  // Scroll to bottom when messages change
//  useEffect(() => {
//   if (messagesEndRef.current) {
//     messagesEndRef.current.scrollIntoView({
//       behavior: "smooth",
//     });
//     window.scrollBy(-130, 0);
//   }
// }, [messages]);
//   // Update active user when chat list or active chat ID changes
//  useEffect(() => {
//   if (users.length > 0) {
//     // Find the selected user based on the activeChatId
//     const selectedUser = users.find(user => user.chatId === activeChatId);

//     // Only update state if selectedUser is different from the current activeUser
//     if (selectedUser && selectedUser.id !== activeUser?.id) {
//       setActiveUser(selectedUser);
//     } else if (!selectedUser && users[0]?.chatId !== activeChatId) {
//       // Set to the first user if no user is selected
//       setActiveUser(users[0]);
//       setActiveChatId(users[0].chatId);
//     }
//   }
// }, [users, activeChatId, activeUser]);


//   const handleSendMessage = async () => {
//     if (newMessage.trim() && activeUser?.id && activeChatId) {
//       const messageData = {
//         receiver: activeUser.id,
//         text: newMessage,
//       };

//       const tempId = `temp-${Date.now()}`;
//       const optimisticMsg = {
//         _id: tempId,
//         text: newMessage,
//         sender: { id: userId },
//         createdAt: new Date().toISOString(),
//         chatId: activeChatId,
//         pending: true
//       };

//       // Add to set of processed messages
//       processedMessagesRef.current.add(tempId);
      
//       setMessages(prevMessages => [...prevMessages, optimisticMsg]);
//       setNewMessage("");

//       try {
//         const response = await sendMessage(messageData).unwrap();
//         const actualMessageId = response?.data?.id || optimisticMsg._id;
        
//         // Update processed messages set with real ID
//         processedMessagesRef.current.delete(tempId);
//         processedMessagesRef.current.add(actualMessageId);

//         setMessages(prevMessages =>
//           prevMessages.map(msg =>
//             msg._id === tempId
//               ? { ...msg, _id: actualMessageId, pending: false }
//               : msg
//           )
//         );

//         const messageForSocket = {
//           _id: actualMessageId,
//           text: newMessage,
//           sender: { id: userId },
//           receiver: { id: activeUser.id },
//           createdAt: new Date().toISOString(),
//           chatId: activeChatId
//         };

//         socket.emit("send_message", {
//           chatId: activeChatId,
//           message: messageForSocket
//         });
//       } catch (error) {
//         console.error("Error sending message:", error);
//         setMessages(prevMessages =>
//           prevMessages.map(msg =>
//             msg._id === tempId
//               ? { ...msg, error: true, pending: false }
//               : msg
//           )
//         );
//       }
//     }
//   };

//   const handleUserSelect = (user) => {
//     // Clear processed messages when switching chats
//     processedMessagesRef.current.clear();
    
//     setActiveUser(user);
//     setActiveChatId(user?.chatId);
//     setUnreadMessages(prev => ({
//       ...prev,
//       [user.chatId]: 0
//     }));

//     // Clear messages when switching to a different chat
//     setMessages([]);

//     if (!messagesInitializedRef.current[user.chatId]) {
//       setTimeout(() => {
//         refetchMessages();
//       }, 100);
//     }

//     if (window.innerWidth < 768) {
//       setShowSidebar(false);
//     }
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return "Just now";

//     const messageDate = new Date(timestamp);
//     const now = new Date();

//     if (messageDate.toDateString() === now.toDateString()) {
//       return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     }

//     return messageDate.toLocaleDateString();
//   };

//   return (
//     <div className="container mx-auto mt-4 md:mt-12 pb-20 px-2 md:px-4">
//       <h1 className="text-center text-2xl md:text-3xl font-bold text-green-600 mb-4 md:mb-8">Messages</h1>
//       <Button
//                   onClick={() => window.history.back()}
//                   className="bg-gray-800 text-white hover:bg-gray-700 px-6 py-2 rounded-lg mb-6"
//                 >
//                   Back
//                 </Button>
//       <div className="flex bg-white shadow-lg rounded-lg overflow-hidden h-[90vh]">
//         <button
//           className="md:hidden absolute mt-20 top-4 left-4 p-2 bg-green-600 text-white rounded-lg"
//           onClick={() => setShowSidebar(!showSidebar)}
//         >
//           <Menu size={24} />
//         </button>

//         {/* Sidebar */}
//         <div className={`${showSidebar ? 'block' : 'hidden'} w-full md:w-1/4 border-r bg-gray-50 md:block ${showSidebar && window.innerWidth < 768 ? 'absolute inset-0 z-10 bg-white' : 'relative'}`}>
//         <Button
//                   onClick={() => window.history.back()}
//                   className="bg-gray-800 text-white hover:bg-gray-700 mt-4 px-6 py-2 rounded-lg mb-6"
//                 >
//                   Back
//                 </Button>
//           <h1 className="text-2xl text-green-600 ml-5 mt-4">Chat List</h1>
            
//           <div className="p-4 overflow-y-auto h-full">
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <div
//                   key={user.id}
//                   className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-200 relative ${activeUser?.id === user.id ? "bg-gray-200" : ""}`}
//                   onClick={() => handleUserSelect(user)}
//                 >
//                   <img
//                     src={user?.avatar}
//                     alt={user.name}
//                     className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
//                   />
//                   <div className="flex-1">
//                     <h4 className="font-semibold text-gray-800">{user.name}</h4>
//                     <p className="text-sm text-gray-500">{user.status}</p>
//                   </div>
                 
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">No chat lists available</p>
//             )}
//           </div>
//         </div>

//         {/* Chat area */}
//         <div className={`${!showSidebar ? 'block' : 'hidden'} w-full md:w-3/4 flex flex-col md:block`}>
//           <div className="p-4 border-b bg-gray-50 flex items-center">
//             {!showSidebar && activeUser && (
//               <button
//                 className="md:hidden mr-3 text-green-600"
//                 onClick={() => setShowSidebar(true)}
//               >
//                 <Menu size={24} />
//               </button>
//             )}
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {activeUser?.name || "Select a chat"}
//               </h2>
//               <p className="text-sm text-gray-500">
//                 {activeUser?.status || ""}
//               </p>
//             </div>
//           </div>

//           <div
//             className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f9fafb]"
//             style={{ height: "calc(100% - 150px)" }}
//           >
//             {messages.length > 0 ? (
//               messages.map((msg) => (
//                 <div
//                   key={msg._id}
//                   className={`flex ${msg.sender?.id === userId ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`px-4 py-2 rounded-lg max-w-[80%] break-words ${
//                       msg.pending
//                         ? "bg-gray-400 text-white"
//                         : msg.error
//                           ? "bg-red-500 text-white"
//                           : msg.sender?.id === userId
//                             ? "bg-green-600 text-white"
//                             : "bg-gray-200 text-gray-800"
//                     }`}
//                   >
//                     <p>{msg.text}</p>
//                     <div className="flex justify-between items-center mt-1">
//                       <p className={`text-xs ${msg.sender?.id === userId ? "text-gray-200" : "text-gray-500"}`}>
//                         {formatTime(msg?.createdAt)}
//                       </p>
//                       {msg.pending && (
//                         <span className="text-xs text-gray-200 ml-2">Sending...</span>
//                       )}
//                       {msg.error && (
//                         <span className="text-xs text-gray-200 ml-2">Failed to send</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">No messages available</p>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="p-3 md:p-4 border-t bg-gray-50 flex items-center gap-2 md:gap-4">
//             <input
//               type="text"
//               className="flex-1 border rounded-lg px-3 md:px-4 py-2 text-sm md:text-base"
//               placeholder="Type your message"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//               disabled={!activeUser}
//             />
//             <button
//               className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 text-sm md:text-base whitespace-nowrap ${(!activeUser || !newMessage.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
//               onClick={handleSendMessage}
//               disabled={!activeUser || !newMessage.trim()}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessagesPage;




"use client";

import url from "@/redux/api/baseUrl";
import { useGetChatlistQuery } from "@/redux/fetures/messaging/getChatlist";
import { useSendMessageMutation } from "@/redux/fetures/messaging/sendMessage";
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";
import React, { useEffect, useState, useRef } from "react";
import { Menu } from "lucide-react";
import { useSearchParams } from "next/navigation";
import io from "socket.io-client";
import { Button } from "antd";
import { useGetMessageQuery } from "@/redux/fetures/messaging/getMessage";

const socket = io("https://sayed3040.sobhoy.com");

const MessagesPage = () => {
  const { data: chatList } = useGetChatlistQuery();
  const { data: user } = useLogedUserQuery();
  const [showSidebar, setShowSidebar] = useState(true);
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const searchParams = useSearchParams();
  const chatIdFromQuery = searchParams.get("chatId");

  const [activeChatId, setActiveChatId] = useState(chatIdFromQuery || null);
  const { data: messagesData, refetch: refetchMessages } = useGetMessageQuery(activeChatId, {
    skip: !activeChatId,
  });

  const chatData = chatList?.data?.attributes || [];
  const userId = user?.data?.attributes?.user?.id;

  const users = chatData.map((chat) => {
    const participant = chat.participants.find((p) => p.id !== userId);
    return {
      id: participant?.id,
      name: participant?.fullName,
      status: participant?.role,
      avatar: url + participant?.image?.url,
      chatId: chat.id,
    };
  });

  const [activeUser, setActiveUser] = useState(users.find(user => user.chatId === activeChatId) || users[0] || null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [unreadMessages, setUnreadMessages] = useState({});
  const messagesInitializedRef = useRef({});
  const processedMessagesRef = useRef(new Set());
  const inputRef = useRef(null);

  useEffect(() => {
    socket.emit("client_connect", "hello data from client");

    if (userId) {
      socket.emit("user_connected", userId);
    }

    return () => {
      processedMessagesRef.current.clear();
    };
  }, [userId]);

  useEffect(() => {
    if (!activeChatId) return;

    const eventName = `messages::${activeChatId}`;

    const handleIncomingMessage = (message) => {
      if (processedMessagesRef.current.has(message._id)) {
        return;
      }

      processedMessagesRef.current.add(message._id);

      setMessages(prevMessages => {
        const messageExists = prevMessages.some(msg => msg._id === message._id);

        if (!messageExists) {
          return [...prevMessages, message];
        }

        return prevMessages;
      });
    };

    socket.on(eventName, handleIncomingMessage);

    return () => {
      socket.off(eventName, handleIncomingMessage);
    };
  }, [activeChatId]);

  useEffect(() => {
    if (!userId || !chatData.length) return;

    chatData.forEach(chat => {
      if (chat.id === activeChatId) return;

      const eventName = `messages::${chat.id}`;

      const handleBackgroundMessage = (message) => {
        setUnreadMessages(prev => ({
          ...prev,
          [chat.id]: (prev[chat.id] || 0) + 1
        }));
      };

      socket.on(eventName, handleBackgroundMessage);

      return () => {
        socket.off(eventName, handleBackgroundMessage);
      };
    });
  }, [chatData, activeChatId, userId]);

  useEffect(() => {
    if (activeChatId) {
      socket.emit("join_chat", activeChatId);
    }
  }, [activeChatId]);

  useEffect(() => {
    if (activeChatId && messagesData?.data?.attributes) {
      const chatMessages = messagesData.data.attributes;

      chatMessages.forEach(msg => {
        processedMessagesRef.current.add(msg._id);
      });

      messagesInitializedRef.current[activeChatId] = true;
      setMessages(chatMessages);

      setUnreadMessages(prev => ({
        ...prev,
        [activeChatId]: 0
      }));
    }
  }, [activeChatId, messagesData]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
      });

      if (window.innerWidth <= 768) {
        window.scrollBy(0, -60); // Adjust scroll for mobile
      } else {
        window.scrollBy(0, -130); // Adjust scroll for desktop
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && activeUser?.id && activeChatId) {
      const messageData = {
        receiver: activeUser.id,
        text: newMessage,
      };

      const tempId = `temp-${Date.now()}`;
      const optimisticMsg = {
        _id: tempId,
        text: newMessage,
        sender: { id: userId },
        createdAt: new Date().toISOString(),
        chatId: activeChatId,
        pending: true
      };

      processedMessagesRef.current.add(tempId);

      setMessages(prevMessages => [...prevMessages, optimisticMsg]);
      setNewMessage("");

      try {
        const response = await sendMessage(messageData).unwrap();
        const actualMessageId = response?.data?.id || optimisticMsg._id;

        processedMessagesRef.current.delete(tempId);
        processedMessagesRef.current.add(actualMessageId);

        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg._id === tempId
              ? { ...msg, _id: actualMessageId, pending: false }
              : msg
          )
        );

        const messageForSocket = {
          _id: actualMessageId,
          text: newMessage,
          sender: { id: userId },
          receiver: { id: activeUser.id },
          createdAt: new Date().toISOString(),
          chatId: activeChatId
        };

        socket.emit("send_message", {
          chatId: activeChatId,
          message: messageForSocket
        });
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg._id === tempId
              ? { ...msg, error: true, pending: false }
              : msg
          )
        );
      }
    }
  };

  const handleUserSelect = (user) => {
    processedMessagesRef.current.clear();

    setActiveUser(user);
    setActiveChatId(user?.chatId);
    setUnreadMessages(prev => ({
      ...prev,
      [user.chatId]: 0
    }));

    setMessages([]);

    if (!messagesInitializedRef.current[user.chatId]) {
      setTimeout(() => {
        refetchMessages();
      }, 100);
    }

    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "Just now";

    const messageDate = new Date(timestamp);
    const now = new Date();

    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return messageDate.toLocaleDateString();
  };

  return (
    <div className="container mx-auto mt-4 md:mt-12 pb-20 px-2 md:px-4">
      <h1 className="text-center text-2xl md:text-3xl font-bold text-green-600 mb-4 md:mb-8">Messages</h1>
      <Button
        onClick={() => window.history.back()}
        className="bg-gray-800 text-white hover:bg-gray-700 px-6 py-2 rounded-lg mb-6"
      >
        Back
      </Button>
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden md:h-[90vh] h-[65vh]">
        <button
          className="md:hidden absolute top-24  left-4 p-2 bg-green-600 text-white rounded-lg"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu  size={24} />
        </button>

        {/* Sidebar */}
        <div className={`${showSidebar ? 'block' : 'hidden'} w-full md:w-1/4 border-r bg-gray-50 md:block sidebar`}>
          {/* <Button
            onClick={() => window.history.back()}
            className="bg-gray-800 text-white hover:bg-gray-700 mt-4 px-6 py-2 rounded-lg mb-6"
          >
            Back
          </Button> */}
          <h1 className="text-2xl text-green-600 ml-5 mt-4">Chat List</h1>

          <div className="p-4 overflow-y-auto h-full">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-200 relative ${activeUser?.id === user.id ? "bg-gray-200" : ""}`}
                  onClick={() => handleUserSelect(user)}
                >
                  <img
                    src={user?.avatar}
                    alt={user.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No chat lists available</p>
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className={`${!showSidebar ? 'block' : 'hidden'} w-full md:h-[700px] h-[550px] md:mt-10 md:w-3/4 flex flex-col md:block`}>
          <div className="p-4 border-b bg-gray-50 flex items-center">
            {!showSidebar && activeUser && (
              <button
                className="md:hidden mr-3 text-green-600"
                onClick={() => setShowSidebar(true)}
              >
                <Menu className=" md:mt-0 mt-10" size={24} />
              </button>
            )}
            <div className="md:mt-2 mt-10">
              <h2 className="text-lg font-semibold text-gray-800">
                {activeUser?.name || "Select a chat"}
              </h2>
              <p className="text-sm text-gray-500">
                {activeUser?.status || ""}
              </p>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f9fafb]"
            style={{
              height: showSidebar 
                ? "calc(90% - 150px)" 
                : "calc(100vh - 100px)", // Adjust height based on sidebar visibility
              paddingBottom: "50px", // Ensure space for the input area
            }}
          >
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${msg.sender?.id === userId ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-[80%] break-words ${
                      msg.pending
                        ? "bg-gray-400 text-white"
                        : msg.error
                          ? "bg-red-500 text-white"
                          : msg.sender?.id === userId
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className={`text-xs ${msg.sender?.id === userId ? "text-gray-200" : "text-gray-500"}`}>
                        {formatTime(msg?.createdAt)}
                      </p>
                      {msg.pending && (
                        <span className="text-xs text-gray-200 ml-2">Sending...</span>
                      )}
                      {msg.error && (
                        <span className="text-xs text-gray-200 ml-2">Failed to send</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No messages available</p>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 md:p-4 border-t bg-gray-50 flex items-center gap-2 md:gap-4">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 border rounded-lg px-3 md:px-4 py-2 text-sm md:text-base"
              placeholder="Type your message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={!activeUser}
            />
            <button
              className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 text-sm md:text-base whitespace-nowrap ${(!activeUser || !newMessage.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSendMessage}
              disabled={!activeUser || !newMessage.trim()}
            >
              Send
            </button>
          </div>
          
        </div>
      </div>
     
      
    </div>
  );
};

export default MessagesPage;
