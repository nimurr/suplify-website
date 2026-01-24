// "use client";

// import url from "@/redux/api/baseUrl";
// import moment from "moment";
// import Link from "next/link";
// import { useParams, usePathname } from "next/navigation";
// import React, { useEffect, useState, useRef } from "react";
// import { CiSearch } from "react-icons/ci";
// import { FaArrowLeft } from "react-icons/fa6";
// import { LuLoader } from "react-icons/lu";
// import { joinConversation, fetchConversationList, leaveConversation } from "@/utils/messagingService";
// import { useSocket } from "@/context/SocketContext";

// const MessageSidebar = () => {
//   const { id } = useParams();
//   const pathname = usePathname();
//   const { isConnected } = useSocket();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [conversations, setConversations] = useState([]);
//   const [filteredConversations, setFilteredConversations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [currentConversation, setCurrentConversation] = useState(null);

//   // Track the last joined conversation to prevent duplicate joins
//   const lastJoinedRef = useRef(null);

//   // ------------------------------------
//   // FETCH CONVERSATIONS ON MOUNT
//   // ------------------------------------
//   useEffect(() => {
//     setCurrentConversation(id);
//     setTimeout(() => {
//       const loadConversations = async () => {
//         try {
//           setIsLoading(true);
//           const response = await fetchConversationList({
//             page: 1,
//             limit: 50,
//             search: ""
//           });
//           setConversations(response?.results || []);
//         } catch (error) {

//           setConversations([]);
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       loadConversations();
//     }, 2000);
//   }, []);

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

//   // leaveConversation

//   useEffect(() => {
//     const conversationId = id || pathname.split("/chat/")[1];

//     if (conversationId && conversationId !== lastJoinedRef.current) {
//       lastJoinedRef.current = conversationId;
//       const joinRoom = async () => {
//         try {
//           await joinConversation(conversationId);
//         } catch (error) {
//           console.error("Error auto-joining conversation:", error);
//         }
//       };
//       joinRoom();
//     }
//   }, [id, pathname]);

//   const handlLeaveConversation = async (conversationId) => {
//     if (currentConversation === conversationId) return;
//     try {
//       await leaveConversation({ conversationId: currentConversation });
//       console.log('Leave Convesesion ', currentConversation)
//       setCurrentConversation(id);
//     } catch (error) {
//       console.error("Error leaving conversation:", error);
//     }
//   };

//   const handleSearch = async (query) => {
//     setSearchQuery(query);

//     // If search query is not empty, fetch from server
//     if (query.trim()) {
//       try {
//         const response = await fetchConversationList({
//           page: 1,
//           limit: 50,
//           search: query
//         });
//         setConversations(response?.results || []);
//       } catch (error) {
//         console.error("Error searching conversations:", error);
//       }
//     } else {
//       // Reload all conversations when search is cleared
//       try {
//         const response = await fetchConversationList({
//           page: 1,
//           limit: 50,
//           search: ""
//         });
//         setConversations(response?.results || []);
//       } catch (error) {
//         console.error("Error fetching conversations:", error);
//       }
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
//         />
//       </div>

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

//             return (
//               <Link
//                 onClick={() => handlLeaveConversation(conversationId)}
//                 key={conversationId}
//                 href={`/chat/${conversationId}`}
//                 className={`px-2 py-5 flex gap-3 rounded-lg hover:bg-gray-200 ${isActive ? "bg-blue-200" : ""
//                   }`}
//               >
//                 <img
//                   className="w-10 h-10 rounded-full"
//                   src={
//                     conv?.userId?.profileImage?.imageUrl?.includes(
//                       "amazonaws.com"
//                     )
//                       ? conv?.userId?.profileImage?.imageUrl
//                       : url + conv?.userId?.profileImage?.imageUrl
//                   }
//                   alt="profile"
//                 />

//                 <div className="flex-1">
//                   <h2 className="font-semibold text-sm">
//                     {conv?.userId?.name}
//                   </h2>
//                   <p className="text-sm text-gray-600 truncate">
//                     {conv?.conversations?.[0]?.lastMessage}
//                   </p>
//                 </div>

//                 <p className="text-xs text-gray-500">
//                   {moment(
//                     conv?.conversations?.[0]?.updatedAt
//                   ).fromNow()}
//                 </p>
//               </Link>
//             );
//           })
//         ) : (
//           <p className="p-4 text-gray-500">No conversations found</p>
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
import { joinConversation, fetchConversationList, leaveConversation } from "@/utils/messagingService";
import { useSocket } from "@/context/SocketContext";

const MessageSidebar = () => {
  const { id } = useParams();
  const pathname = usePathname();
  const { isConnected } = useSocket();

  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentConversation, setCurrentConversation] = useState(null);

  // Track the last joined conversation to prevent duplicate joins
  const lastJoinedRef = useRef(null);

  // ------------------------------------
  // FETCH CONVERSATIONS WHEN SOCKET CONNECTS
  // ------------------------------------
  useEffect(() => {
    setCurrentConversation(id);
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

  // ------------------------------------
  // FILTER SEARCH
  // ------------------------------------
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

  // ------------------------------------
  // AUTO JOIN/LEAVE WHEN ROUTE CHANGES
  // ------------------------------------
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

  // ------------------------------------
  // SEARCH HANDLER
  // ------------------------------------
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

  const handleLeaveConversation = async (conversationId) => {
    if (currentConversation === conversationId) return;
    try {
      await leaveConversation({ conversationId: currentConversation });
      console.log('Leave Convesesion ', currentConversation)
      setCurrentConversation(id);
    } catch (error) {
      console.error("Error leaving conversation:", error);
    }
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
        <div className="my-3 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
          Connecting to server...
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

            return (
              <Link
                onClick={() => handleLeaveConversation(conversationId)}
                key={conversationId}
                href={`/chat/${conversationId}`} 
                className={`px-2 py-5 flex gap-3 rounded-lg hover:bg-gray-200 ${isActive ? "bg-blue-200" : ""
                  }`}
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    conv?.userId?.profileImage?.imageUrl?.includes(
                      "amazonaws.com"
                    )
                      ? conv?.userId?.profileImage?.imageUrl
                      : url + conv?.userId?.profileImage?.imageUrl
                  }
                  alt="profile"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-sm">
                    {conv?.userId?.name}
                  </h2>
                  <p className="text-sm text-gray-600 truncate">
                    {conv?.conversations?.[0]?.lastMessage}
                  </p>
                </div>

                <p className="text-xs text-gray-500">
                  {moment(
                    conv?.conversations?.[0]?.updatedAt
                  ).fromNow()}
                </p>
              </Link>
            );
          })
        ) : (
          <p className="p-4 text-gray-500">
            {!isConnected ? "Waiting for connection..." : "No conversations found"}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageSidebar;