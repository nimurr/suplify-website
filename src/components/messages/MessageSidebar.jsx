// "use client";

// import url from "@/redux/api/baseUrl";
// import moment from "moment";
// import Link from "next/link";
// import { useParams, usePathname } from "next/navigation";
// import React, { useEffect, useState, useRef } from "react";
// import { CiSearch } from "react-icons/ci";
// import { FaArrowLeft } from "react-icons/fa6";
// import { LuLoader } from "react-icons/lu";
// import {
//   joinConversation,
//   fetchConversationList,
//   leaveConversation,
//   setupConversationListener
// } from "@/utils/messagingService";
// import { useSocket } from "@/context/SocketContext";
// import { getSocket } from "@/utils/socket-io";

// const MessageSidebar = () => {
//   const { id } = useParams();
//   const pathname = usePathname();
//   const { isConnected } = useSocket();
//   const socket = getSocket();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [conversations, setConversations] = useState([]);
//   const [filteredConversations, setFilteredConversations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // console.log(conversations)

//   const lastJoinedRef = useRef(null);




//   // Listen for online/offline status
//   useEffect(() => {
//     if (!socket) return;

//     const handleStatusUpdate = (data) => {
//       console.log("related-user-online-status", data);

//       // Update online status based on the received data
//       if (data && typeof data.isOnline !== 'undefined') {
//         setIsOnline(data.isOnline);
//       } else if (data && data.status) {
//         setIsOnline(data.status === 'online');
//       }
//     };

//     socket.on('related-user-online-status', handleStatusUpdate);

//     return () => {
//       socket.off('related-user-online-status', handleStatusUpdate);
//     };
//   }, [socket]);



//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !socket || !isConnected) return;

//     const eventName = `conversation-list-updated::${user._id}`;

//     const messageListener = (response) => {
//       console.log("🔥 conversation-list-updated data:", response);

//       setConversations(prev => {
//         // Get the conversation ID from the response
//         const newConvId = response?.conversations?.[0]?._conversationId ||
//           response?.conversationId ||
//           response?._id;

//         if (!newConvId) {
//           console.warn("No conversation ID found in response");
//           return prev;
//         }

//         // Find existing conversation by matching conversationId
//         const existingIndex = prev.findIndex(conv => {
//           const existingConvId = conv?.conversations?.[0]?._conversationId ||
//             conv?.conversationId ||
//             conv?._id;
//           return existingConvId === newConvId;
//         });

//         if (existingIndex !== -1) {
//           // ✅ ONLY UPDATE lastMessage and updatedAt - PRESERVE ORIGINAL userId
//           console.log("✏️ Updating existing conversation message:", newConvId);
//           const updated = [...prev];

//           // 🔥 KEY FIX: Keep the ORIGINAL conversation object, only update message fields
//           updated[existingIndex] = {
//             ...updated[existingIndex], // ✅ Keep original userId, name, profileImage
//             conversations: [
//               {
//                 ...updated[existingIndex].conversations?.[0], // ✅ Keep original conversation data
//                 lastMessage: response.conversations?.[0]?.lastMessage, // ✅ Update message
//                 updatedAt: response.conversations?.[0]?.updatedAt,     // ✅ Update time
//                 _conversationId: newConvId // ✅ Ensure ID stays the same
//               }
//             ]
//             // ❌ DO NOT spread response data here - it contains wrong userId!
//           };

//           // Move updated conversation to top
//           const [updatedConv] = updated.splice(existingIndex, 1);
//           return [updatedConv, ...updated];
//         } else {
//           // ➕ New conversation - add to top
//           console.log("➕ Adding new conversation:", newConvId);
//           return [response, ...prev];
//         }
//       });
//     };

//     // Remove any existing listener first
//     socket.off(eventName, messageListener);

//     // Add the listener
//     socket.on(eventName, messageListener);

//     console.log(`✅ Listening to: ${eventName}`);

//     return () => {
//       console.log(`🧹 Cleaning up listener: ${eventName}`);
//       socket.off(eventName, messageListener);
//     };

//   }, [socket, isConnected]);
//   // ------------------------------------
//   // FETCH CONVERSATIONS WHEN SOCKET CONNECTS
//   // ------------------------------------
//   useEffect(() => {
//     if (!isConnected) {
//       console.log("Waiting for socket connection...");
//       return;
//     }

//     setTimeout(() => {
//       const loadConversations = async () => {
//         try {
//           setIsLoading(true);
//           const response = await fetchConversationList({
//             page: 1,
//             limit: 50,
//             search: searchQuery
//           });
//           setConversations(response?.results || []);
//         } catch (error) {
//           console.error("Error fetching conversations:", error);
//           setConversations([]);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       loadConversations();
//     }, 2000);

//   }, [isConnected]);







//   // ------------------------------------
//   // FILTER SEARCH
//   // ------------------------------------
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredConversations(conversations);
//     } else {
//       setFilteredConversations(
//         conversations.filter((conv) =>
//           conv.userId?.name
//             ?.toLowerCase()
//             .includes(searchQuery.toLowerCase())
//         )
//       );
//     }
//   }, [searchQuery, conversations]);

//   // ------------------------------------
//   // AUTO JOIN/LEAVE WHEN ROUTE CHANGES
//   // ------------------------------------
//   useEffect(() => {
//     const conversationId = id || pathname.split("/chat/")[1];

//     if (!conversationId || !isConnected) return;

//     const handleRoomChange = async () => {
//       // Leave previous conversation if exists
//       if (lastJoinedRef.current && lastJoinedRef.current !== conversationId) {
//         try {
//           await leaveConversation(lastJoinedRef.current);
//           console.log("Left conversation:", lastJoinedRef.current);
//         } catch (error) {
//           console.error("Error leaving conversation:", error);
//         }
//       }

//       // Join new conversation
//       if (conversationId !== lastJoinedRef.current) {
//         try {
//           await joinConversation(conversationId);
//           console.log("Joined conversation:", conversationId);
//           lastJoinedRef.current = conversationId;
//         } catch (error) {
//           console.error("Error joining conversation:", error);
//         }
//       }
//     };

//     handleRoomChange();
//   }, [id, pathname, isConnected]);

//   // ------------------------------------
//   // SEARCH HANDLER
//   // ------------------------------------
//   const handleSearch = async (query) => {
//     setSearchQuery(query);

//     if (!isConnected) {
//       console.warn("Cannot search: socket not connected");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await fetchConversationList({
//         page: 1,
//         limit: 50,
//         search: query.trim()
//       });
//       setConversations(response?.results || []);
//     } catch (error) {
//       console.error("Error searching conversations:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-3">
//       <Link
//         href="/"
//         className="flex items-center gap-2 bg-gray-200 p-2 rounded text-xl font-semibold my-5"
//       >
//         <FaArrowLeft /> Back Home
//       </Link>

//       {/* SEARCH */}
//       <div className="relative">
//         <CiSearch className="absolute top-[14px] left-3 text-2xl text-gray-400" />
//         <input
//           className="py-3 w-full pl-10 rounded-lg border-2 border-gray-200"
//           value={searchQuery}
//           onChange={(e) => handleSearch(e.target.value)}
//           placeholder="Search Here..."
//           disabled={!isConnected}
//         />
//       </div>

//       {/* CONNECTION STATUS */}
//       {!isConnected && (
//         <div className="my-3 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
//           Connecting to server...
//         </div>
//       )}

//       {/* CONVERSATIONS */}
//       <div className="my-5 bg-gray-100 rounded">
//         {isLoading ? (
//           <div className="flex justify-center p-5">
//             <LuLoader className="animate-spin text-xl" />
//           </div>
//         ) : filteredConversations.length ? (
//           filteredConversations.map((conv) => {
//             const conversationId =
//               conv.conversations?.[0]?._conversationId ||
//               conv.conversationId;

//             const isActive =
//               id?.toString() === conversationId?.toString();

//             const lastMessage =
//               conv?.conversations?.[0]?.lastMessage ||
//               "No messages yet";

//             return (
//               <Link
//                 key={conversationId}
//                 href={`/chat/${conversationId}`}
//                 onClick={async (e) => {
//                   if (lastJoinedRef.current && lastJoinedRef.current !== conversationId) {
//                     try {
//                       await leaveConversation(lastJoinedRef.current);
//                       console.log("Left conversation:", lastJoinedRef.current);
//                     } catch (error) {
//                       console.error("Error leaving conversation:", error);
//                     }
//                   }
//                 }}
//                 className={`px-2 py-5 flex gap-3 rounded-lg hover:bg-gray-200 ${isActive ? "bg-blue-200" : ""
//                   }`}
//               >
//                 <div className="relative">
//                   <img
//                     className="w-10 h-10 rounded-full object-cover"
//                     src={
//                       conv?.userId?.profileImage?.imageUrl?.includes(
//                         "amazonaws.com"
//                       )
//                         ? conv?.userId?.profileImage?.imageUrl
//                         : url + conv?.userId?.profileImage?.imageUrl
//                     }
//                     alt="profile"
//                     onError={(e) => {
//                       e.target.src = "https://via.placeholder.com/40";
//                     }}
//                   />
//                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <h2 className="font-semibold text-sm">
//                     {conv?.userId?.name}
//                   </h2>
//                   <p className="text-sm text-gray-600 truncate">
//                     {lastMessage}
//                   </p>
//                 </div>

//                 <p className="text-xs text-gray-500 flex-shrink-0">
//                   {moment(
//                     conv?.conversations?.[0]?.updatedAt
//                   ).fromNow()}
//                 </p>
//               </Link>
//             );
//           })
//         ) : (
//           <p className="p-4 text-gray-500 text-center">
//             {!isConnected ? "Waiting for connection..." : "No conversations found"}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageSidebar;


"use client";

import url from "@/redux/api/baseUrl";
import moment from "moment";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";
import { LuLoader } from "react-icons/lu";
import {
  joinConversation,
  fetchConversationList,
  leaveConversation,
  setupConversationListener
} from "@/utils/messagingService";
import { useSocket } from "@/context/SocketContext";
import { getSocket } from "@/utils/socket-io";

const MessageSidebar = () => {
  const { id } = useParams();
  const pathname = usePathname();
  const { isConnected } = useSocket();
  const socket = getSocket();

  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState({}); // Track online status of all users
  const [currentUserId, setCurrentUserId] = useState(null);

  const lastJoinedRef = useRef(null);

  // Get current user ID
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || user?._id || user?._userId;
      setCurrentUserId(userId);
    }
  }, []);

  // Listen for online/offline status updates
  useEffect(() => {
    if (!socket || !currentUserId) return;

    const handleStatusUpdate = (data) => {
      console.log("related-user-online-status", data);

      // Update online status for specific user
      if (data && data.userId) {
        setOnlineUsers(prev => ({
          ...prev,
          [data.userId]: data.isOnline || data.status === 'online'
        }));
      }
    };

    // Listen to the event with current user's ID
    socket.on(`related-user-online-status::${currentUserId}`, handleStatusUpdate);

    return () => {
      socket.off(`related-user-online-status::${currentUserId}`, handleStatusUpdate);
    };
  }, [socket, currentUserId]);

  // Listen for conversation list updates
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !socket || !isConnected) return;

    const eventName = `conversation-list-updated::${user._id}`;

    const messageListener = (response) => {
      console.log("🔥 conversation-list-updated data:", response);

      setConversations(prev => {
        // Get the conversation ID from the response
        const newConvId = response?.conversations?.[0]?._conversationId ||
          response?.conversationId ||
          response?._id;

        if (!newConvId) {
          console.warn("No conversation ID found in response");
          return prev;
        }

        // Find existing conversation by matching conversationId
        const existingIndex = prev.findIndex(conv => {
          const existingConvId = conv?.conversations?.[0]?._conversationId ||
            conv?.conversationId ||
            conv?._id;
          return existingConvId === newConvId;
        });

        if (existingIndex !== -1) {
          // ✅ ONLY UPDATE lastMessage and updatedAt - PRESERVE ORIGINAL userId
          console.log("✏️ Updating existing conversation message:", newConvId);
          const updated = [...prev];

          // 🔥 KEY FIX: Keep the ORIGINAL conversation object, only update message fields
          updated[existingIndex] = {
            ...updated[existingIndex], // ✅ Keep original userId, name, profileImage
            conversations: [
              {
                ...updated[existingIndex].conversations?.[0], // ✅ Keep original conversation data
                lastMessage: response.conversations?.[0]?.lastMessage, // ✅ Update message
                updatedAt: response.conversations?.[0]?.updatedAt,     // ✅ Update time
                _conversationId: newConvId // ✅ Ensure ID stays the same
              }
            ]
            // ❌ DO NOT spread response data here - it contains wrong userId!
          };

          // Move updated conversation to top
          const [updatedConv] = updated.splice(existingIndex, 1);
          return [updatedConv, ...updated];
        } else {
          // ➕ New conversation - add to top
          console.log("➕ Adding new conversation:", newConvId);
          return [response, ...prev];
        }
      });
    };

    // Remove any existing listener first
    socket.off(eventName, messageListener);

    // Add the listener
    socket.on(eventName, messageListener);

    console.log(`✅ Listening to: ${eventName}`);

    return () => {
      console.log(`🧹 Cleaning up listener: ${eventName}`);
      socket.off(eventName, messageListener);
    };

  }, [socket, isConnected]);

  // FETCH CONVERSATIONS WHEN SOCKET CONNECTS
  useEffect(() => {
    if (!isConnected) {
      console.log("Waiting for socket connection...");
      return;
    }

    setTimeout(() => {
      const loadConversations = async () => {
        try {
          setIsLoading(true);
          const response = await fetchConversationList({
            page: 1,
            limit: 50,
            search: searchQuery
          });
          setConversations(response?.results || []);
        } catch (error) {
          console.error("Error fetching conversations:", error);
          setConversations([]);
        } finally {
          setIsLoading(false);
        }
      };
      loadConversations();
    }, 2000);

  }, [isConnected]);

  // FILTER SEARCH
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredConversations(conversations);
    } else {
      setFilteredConversations(
        conversations.filter((conv) =>
          conv.userId?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, conversations]);

  // AUTO JOIN/LEAVE WHEN ROUTE CHANGES
  useEffect(() => {
    const conversationId = id || pathname.split("/chat/")[1];

    if (!conversationId || !isConnected) return;

    const handleRoomChange = async () => {
      // Leave previous conversation if exists
      if (lastJoinedRef.current && lastJoinedRef.current !== conversationId) {
        try {
          await leaveConversation(lastJoinedRef.current);
          console.log("Left conversation:", lastJoinedRef.current);
        } catch (error) {
          console.error("Error leaving conversation:", error);
        }
      }

      // Join new conversation
      if (conversationId !== lastJoinedRef.current) {
        try {
          await joinConversation(conversationId);
          console.log("Joined conversation:", conversationId);
          lastJoinedRef.current = conversationId;
        } catch (error) {
          console.error("Error joining conversation:", error);
        }
      }
    };

    handleRoomChange();
  }, [id, pathname, isConnected]);

  // SEARCH HANDLER
  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (!isConnected) {
      console.warn("Cannot search: socket not connected");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetchConversationList({
        page: 1,
        limit: 50,
        search: query.trim()
      });
      setConversations(response?.results || []);
    } catch (error) {
      console.error("Error searching conversations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to check if user is online
  const isUserOnline = (userId) => {
    const userIdString = userId?._userId || userId?.id || userId?._id || userId;
    return onlineUsers[userIdString] || false;
  };

  return (
    <div className="p-3">
      <Link
        href="/"
        className="flex items-center gap-2 bg-gray-200 p-2 rounded text-xl font-semibold my-5"
      >
        <FaArrowLeft /> Back Home
      </Link>

      {/* SEARCH */}
      <div className="relative">
        <CiSearch className="absolute top-[14px] left-3 text-2xl text-gray-400" />
        <input
          className="py-3 w-full pl-10 rounded-lg border-2 border-gray-200"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search Here..."
          disabled={!isConnected}
        />
      </div>

      {/* CONNECTION STATUS */}
      {!isConnected && (
        <div className="my-3 p-2 text-center bg-yellow-100 text-yellow-700 rounded-lg text-sm">
          Connecting...
        </div>
      )}

      {/* CONVERSATIONS */}
      <div className="my-5 bg-gray-100 rounded">
        {isLoading ? (
          <div className="flex justify-center p-5">
            <LuLoader className="animate-spin text-xl" />
          </div>
        ) : filteredConversations.length ? (
          filteredConversations.map((conv) => {
            const conversationId =
              conv.conversations?.[0]?._conversationId ||
              conv.conversationId;

            const isActive =
              id?.toString() === conversationId?.toString();

            const lastMessage =
              conv?.conversations?.[0]?.lastMessage ||
              "No messages yet";

            const userIsOnline = isUserOnline(conv?.userId);

            return (
              <Link
                key={conversationId}
                href={`/chat/${conversationId}`}
                onClick={async (e) => {
                  if (lastJoinedRef.current && lastJoinedRef.current !== conversationId) {
                    try {
                      await leaveConversation(lastJoinedRef.current);
                      console.log("Left conversation:", lastJoinedRef.current);
                    } catch (error) {
                      console.error("Error leaving conversation:", error);
                    }
                  }
                }}
                className={`px-2 py-5 flex gap-3 rounded-lg hover:bg-gray-200 ${isActive ? "bg-blue-200" : ""
                  }`}
              >
                <div className="relative">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={
                      conv?.userId?.profileImage?.imageUrl?.includes(
                        "amazonaws.com"
                      )
                        ? conv?.userId?.profileImage?.imageUrl
                        : url + conv?.userId?.profileImage?.imageUrl
                    }
                    alt="profile"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/40";
                    }}
                  />
                  {/* Online/Offline Status Indicator */}
                  <span 
                    className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                      userIsOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                    title={userIsOnline ? 'Online' : 'Offline'}
                  ></span>
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-sm">
                    {conv?.userId?.name}
                  </h2>
                  <p className="text-sm text-gray-600 truncate">
                    {lastMessage}
                  </p>
                </div>

                <p className="text-xs text-gray-500 flex-shrink-0">
                  {moment(
                    conv?.conversations?.[0]?.updatedAt
                  ).fromNow()}
                </p>
              </Link>
            );
          })
        ) : (
          <p className="p-4 text-gray-500 text-center">
            {!isConnected ? "Waiting for connection..." : "No conversations found"}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageSidebar;