
// 'use client';
// import { useState, useRef, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { LuImagePlus } from "react-icons/lu";
// import { IoIosSend } from "react-icons/io";
// import moment from "moment";
// import url from "@/redux/api/baseUrl";
// import { fetchMessages, sendMessage } from "@/utils/messagingService";
// import { useSocket } from "@/context/SocketContext";

// const Page = () => {
//     const [showSidebar, setShowSidebar] = useState(false);
//     const [newMessage, setNewMessage] = useState("");
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [fullMessage, setFullMessage] = useState([]);
//     const [currentUserId, setCurrentUserId] = useState(null);
//     const [totalPages, setTotalPages] = useState(1);
//     const [chatLoading, setChatLoading] = useState(false);
//     const [loadingMore, setLoadingMore] = useState(false);
//     const inputRef = useRef(null);
//     const messagesEndRef = useRef(null);
//     const messagesContainerRef = useRef(null);
//     const [page, setPage] = useState(1);
//     const limit = 50; // Fixed limit of 50 messages per page
//     const [hasMore, setHasMore] = useState(true);
//     const [isInitialLoad, setIsInitialLoad] = useState(true);

//     const { id } = useParams();
//     const { socket, isConnected } = useSocket();

//     // Get current user ID from localStorage or your auth context
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             const userData = localStorage.getItem('user');
//             if (userData) {
//                 const user = JSON.parse(userData);
//                 setCurrentUserId(user?.id || user?._id || user?._userId);
//             }
//         }
//     }, []);

//     // Load messages when conversation changes
//     useEffect(() => {
//         if (!id || !isConnected) return;

//         const loadMessages = async () => {
//             setChatLoading(true);
//             setIsInitialLoad(true);
//             try {
//                 const response = await fetchMessages(id, { page: 1, limit: 50 });
//                 setTotalPages(response?.totalPages || 1);
//                 setFullMessage(response?.results?.reverse() || []);
//                 setPage(1);
//                 setHasMore(response?.totalPages > 1);
//             } catch (error) {
//                 console.error("Error fetching messages:", error);
//             } finally {
//                 setChatLoading(false);
//                 setIsInitialLoad(false);
//             }
//         };

//         loadMessages();
//     }, [id, isConnected]);

//     // Load more messages function
//     const loadMoreMessages = async () => {
//         if (loadingMore || !hasMore || page >= totalPages) return;

//         setLoadingMore(true);
//         const nextPage = page + 1;

//         try {
//             const response = await fetchMessages(id, { page: nextPage, limit });

//             if (response?.results && response.results.length > 0) {
//                 const newMessages = response.results.reverse();

//                 // Save current scroll position
//                 const container = messagesContainerRef.current;
//                 const previousScrollHeight = container.scrollHeight;

//                 // Add new messages at the beginning
//                 setFullMessage(prev => [...newMessages, ...prev]);
//                 setPage(nextPage);
//                 setHasMore(nextPage < response.totalPages);

//                 // Restore scroll position after new messages are added
//                 setTimeout(() => {
//                     const newScrollHeight = container.scrollHeight;
//                     container.scrollTop = newScrollHeight - previousScrollHeight;
//                 }, 0);
//             } else {
//                 setHasMore(false);
//             }
//         } catch (error) {
//             console.error("Error loading more messages:", error);
//         } finally {
//             setLoadingMore(false);
//         }
//     };

//     // Scroll event handler for infinite scroll
//     useEffect(() => {
//         const container = messagesContainerRef.current;
//         if (!container) return;

//         const handleScroll = () => {
//             // Check if user scrolled to top (with small threshold)
//             if (container.scrollTop < 100 && hasMore && !loadingMore) {
//                 loadMoreMessages();
//             }
//         };

//         container.addEventListener('scroll', handleScroll);
//         return () => container.removeEventListener('scroll', handleScroll);
//     }, [hasMore, loadingMore, page, totalPages]);

//     // Listen for new messages
//     useEffect(() => {
//         if (!socket || !id) return;

//         const messageListener = (message) => {
//             setFullMessage(prev => [...prev, message]);
//         };

//         socket.on(`new-message-received::${id}`, messageListener);

//         return () => {
//             socket.off(`new-message-received::${id}`, messageListener);
//         };
//     }, [socket, id]);

//     // Auto scroll to bottom only on initial load and new messages
//     useEffect(() => {
//         if (isInitialLoad || fullMessage.length > 0) {
//             messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [fullMessage.length, isInitialLoad]);

//     const handleSendMessage = async () => {
//         if (!newMessage.trim() || !isConnected) return;

//         const messageData = {
//             conversationId: id,
//             text: newMessage,
//         };

//         // Optimistically add message to UI
//         const tempMessage = {
//             _messageId: Date.now().toString(),
//             text: newMessage,
//             senderId: { _userId: currentUserId },
//             createdAt: new Date().toISOString(),
//             pending: true,
//         };

//         setFullMessage(prev => [...prev, tempMessage]);
//         setNewMessage('');

//         try {
//             const response = await sendMessage(messageData);

//             // Remove temp message and add real message
//             setFullMessage(prev =>
//                 prev.filter(msg => msg._messageId !== tempMessage._messageId)
//             );
//         } catch (error) {
//             console.error('Message failed to send', error);

//             // Mark message as failed
//             setFullMessage(prev =>
//                 prev.map(msg =>
//                     msg._messageId === tempMessage._messageId
//                         ? { ...msg, pending: false, error: true }
//                         : msg
//                 )
//             );
//         }
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) setSelectedFile(file);
//     };

//     return (
//         <div className="p-5">
//             <div className={`${!showSidebar ? "block" : "hidden"} w-full md:h-[700px] h-[550px] md:mt-10 flex flex-col md:block`}>
//                 <div 
//                     ref={messagesContainerRef}
//                     className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f9fafb]" 
//                     style={{ height: "75vh", paddingBottom: "50px" }}
//                 >
//                     {/* Loading more indicator at top */}
//                     {loadingMore && (
//                         <div className="flex justify-center py-2">
//                             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
//                         </div>
//                     )}

//                     {/* Initial loading */}
//                     {chatLoading && <IsLoadingComponent />}

//                     {/* Messages */}
//                     {!chatLoading && fullMessage.length > 0 ? (
//                         fullMessage.map((msg, index) => {
//                             const isCurrentUser = msg.senderId?._userId === currentUserId;

//                             return (
//                                 <div key={msg._messageId || index} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
//                                     {!isCurrentUser && msg.senderId?.profileImage && (
//                                         <div className="mr-2">
//                                             <img
//                                                 className="w-5 rounded-full h-5"
//                                                 src={
//                                                     msg?.senderId?.profileImage?.imageUrl?.includes('amazonaws')
//                                                         ? msg?.senderId?.profileImage?.imageUrl
//                                                         : (url + msg?.senderId?.profileImage?.imageUrl)
//                                                 }
//                                                 alt="sender"
//                                             />
//                                         </div>
//                                     )}
//                                     <div className={`px-4 py-2 rounded-lg break-words max-w-[70%] ${msg.pending
//                                         ? "bg-blue-100 text-gray-600"
//                                         : msg.error
//                                             ? "bg-red-500 text-white"
//                                             : isCurrentUser
//                                                 ? "bg-red-200 text-black"
//                                                 : "bg-gray-200 text-gray-800"
//                                         }`}>
//                                         <p>{msg?.text}</p>
//                                         <span className="text-xs text-gray-500">{moment(msg.createdAt).fromNow()}</span>
//                                     </div>
//                                     {isCurrentUser && msg.senderId?.profileImage && (
//                                         <div className="ml-2">
//                                             <img
//                                                 className="w-5 rounded-full h-5"
//                                                 src={
//                                                     msg?.senderId?.profileImage?.imageUrl?.includes('amazonaws')
//                                                         ? msg?.senderId?.profileImage?.imageUrl
//                                                         : (url + msg?.senderId?.profileImage?.imageUrl)
//                                                 }
//                                                 alt="sender"
//                                             />
//                                         </div>
//                                     )}
//                                 </div>
//                             );
//                         })
//                     ) : !chatLoading ? (
//                         <div className="text-center text-gray-500 mt-10">No messages yet. Start the conversation!</div>
//                     ) : null}

//                     <div ref={messagesEndRef} />
//                 </div>

//                 {/* Input and file upload */}
//                 <div className="p-3 md:p-4 border-t bg-gray-50 flex items-center gap-2 md:gap-4">
//                     <div className="relative w-auto flex items-center">
//                         <input
//                             type="file"
//                             className="opacity-0 z-[999] absolute inset-0 w-full h-full cursor-pointer"
//                             onChange={handleFileChange}
//                         />
//                         <div className="flex items-center justify-center p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 cursor-pointer w-[40px] h-[40px]">
//                             <LuImagePlus className="text-4xl text-gray-600" />
//                         </div>
//                         {selectedFile && (
//                             <div className="text-sm absolute bottom-0 text-gray-500 mt-2">
//                                 {selectedFile.type.startsWith("image/") && (
//                                     <img
//                                         src={URL.createObjectURL(selectedFile)}
//                                         alt="Preview"
//                                         className="mt-2 w-10 h-10 object-cover"
//                                     />
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                     <input
//                         ref={inputRef}
//                         type="text"
//                         className="flex-1 border rounded-lg px-3 md:px-4 py-2 outline-none focus:border-blue-400 text-sm md:text-base"
//                         placeholder="Type your message"
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                         disabled={!isConnected}
//                     />
//                     <button
//                         className="bg-red-600 text-white cursor-pointer rounded-lg text-xl p-2 md:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
//                         onClick={handleSendMessage}
//                         disabled={!isConnected || !newMessage.trim()}
//                     >
//                         <IoIosSend className="text-2xl" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Page;

// // Loading component
// const IsLoadingComponent = () => {
//     return (
//         <div>
//             {Array.from({ length: 5 }).map((_, i) => (
//                 <div key={i} className="space-y-1">
//                     <div className="animate-pulse w-full max-w-lg rounded-md border border-gray-300 p-4">
//                         <div className="flex space-x-4">
//                             <div className="w-10 h-10 rounded-full bg-gray-200"></div>
//                             <div className="flex-1 space-y-6 py-1">
//                                 <div className="h-2 rounded bg-gray-200"></div>
//                                 <div className="space-y-3">
//                                     <div className="grid grid-cols-3 gap-4">
//                                         <div className="col-span-2 h-2 rounded bg-gray-200"></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex items-center justify-end w-full">
//                         <div className="animate-pulse w-full max-w-lg right-0 rounded-md border border-gray-300 p-4">
//                             <div className="flex space-x-4">
//                                 <div className="w-10 h-10 rounded-full bg-gray-200"></div>
//                                 <div className="flex-1 space-y-6 py-1">
//                                     <div className="h-2 rounded bg-gray-200"></div>
//                                     <div className="space-y-3">
//                                         <div className="grid grid-cols-3 gap-4">
//                                             <div className="col-span-2 h-2 rounded bg-gray-200"></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };


'use client';
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { LuImagePlus } from "react-icons/lu";
import { IoIosSend } from "react-icons/io";
import moment from "moment";
import url from "@/redux/api/baseUrl";
import { fetchMessages, sendMessage } from "@/utils/messagingService";
import { useSocket } from "@/context/SocketContext";

const Page = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [fullMessage, setFullMessage] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [chatLoading, setChatLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const [page, setPage] = useState(1);
    const limit = 50;
    const [hasMore, setHasMore] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const previousMessageCount = useRef(0);
    const hasLoadedMessages = useRef(false);

    // if any user reloads the page the route to go back to /chat 
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', '/chat');
        }
    }, []);

    const { id } = useParams();
    const { socket, isConnected } = useSocket();

    // Get current user ID from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                setCurrentUserId(user?.id || user?._id || user?._userId);
            }
        }
    }, []);

    // Load messages when conversation changes or socket connects
    useEffect(() => {
        if (!id) return;

        // Reset state when conversation changes
        const resetAndLoad = async () => {
            // Reset all states
            setFullMessage([]);
            setPage(1);
            setTotalPages(1);
            setHasMore(true);
            setIsInitialLoad(true);
            setChatLoading(true);
            hasLoadedMessages.current = false;
            previousMessageCount.current = 0;

            // Wait a bit for socket to be ready if needed
            const loadWithDelay = async (retryCount = 0) => {
                try {
                    console.log(`Loading messages for conversation: ${id}, retry: ${retryCount}`);
                    const response = await fetchMessages(id, { page: 1, limit: 50 });

                    if (response && response.results) {
                        const messages = response.results.reverse() || [];
                        setFullMessage(messages);
                        setTotalPages(response?.totalPages || 1);
                        setHasMore(response?.totalPages > 1);
                        previousMessageCount.current = messages.length;
                        hasLoadedMessages.current = true;
                        // console.log(`✅ Loaded ${messages.length} messages successfully`);
                    }
                } catch (error) {
                    console.error("Error fetching messages:", error);

                    // Retry once if it fails
                    if (retryCount < 2) {
                        console.log("Retrying in 1 second...");
                        setTimeout(() => loadWithDelay(retryCount + 1), 1000);
                    }
                } finally {
                    setChatLoading(false);
                    setTimeout(() => setIsInitialLoad(false), 100);
                }
            };

            // Start loading
            if (isConnected) {
                loadWithDelay();
            } else {
                // If not connected, wait for connection
                console.log("Waiting for socket connection...");
                const checkConnection = setInterval(() => {
                    if (isConnected && !hasLoadedMessages.current) {
                        clearInterval(checkConnection);
                        loadWithDelay();
                    }
                }, 500);

                // Clear interval after 10 seconds to prevent infinite waiting
                setTimeout(() => clearInterval(checkConnection), 10000);
            }
        };

        resetAndLoad();
    }, [id, isConnected]);

    // Load more messages function
    const loadMoreMessages = async () => {
        if (loadingMore || !hasMore || page >= totalPages) return;

        setLoadingMore(true);
        const nextPage = page + 1;

        try {
            console.log(`Loading more messages - Page ${nextPage}`);
            const response = await fetchMessages(id, { page: nextPage, limit });

            if (response?.results && response.results.length > 0) {
                const newMessages = response.results.reverse();

                // Save current scroll position
                const container = messagesContainerRef.current;
                const previousScrollHeight = container.scrollHeight;
                const previousScrollTop = container.scrollTop;

                // Add new messages at the beginning
                setFullMessage(prev => [...newMessages, ...prev]);
                setPage(nextPage);
                setHasMore(nextPage < response.totalPages);

                // Restore scroll position after new messages are added
                requestAnimationFrame(() => {
                    const newScrollHeight = container.scrollHeight;
                    const scrollDifference = newScrollHeight - previousScrollHeight;
                    container.scrollTop = previousScrollTop + scrollDifference;
                });

                console.log(`✅ Loaded ${newMessages.length} more messages (Page ${nextPage})`);
            } else {
                setHasMore(false);
                console.log("No more messages to load");
            }
        } catch (error) {
            console.error("Error loading more messages:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    // Scroll event handler for infinite scroll
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (container.scrollTop < 100 && hasMore && !loadingMore && !chatLoading) {
                loadMoreMessages();
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [hasMore, loadingMore, page, totalPages, chatLoading]);

    // Listen for new messages
    useEffect(() => {
        if (!socket || !id) return;

        const messageListener = (message) => {
            console.log("New message received:", message);
            setFullMessage(prev => [...prev, message]);
        };

        socket.on(`new-message-received::${id}`, messageListener);

        return () => {
            socket.off(`new-message-received::${id}`, messageListener);
        };
    }, [socket, id]);

    // Smart auto-scroll
    useEffect(() => {
        if (loadingMore || chatLoading) return;

        const container = messagesContainerRef.current;
        if (!container) return;

        const shouldScrollToBottom = () => {
            if (isInitialLoad) return true;

            if (fullMessage.length > previousMessageCount.current) {
                const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 200;
                return isNearBottom;
            }

            return false;
        };

        if (shouldScrollToBottom()) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({
                    behavior: isInitialLoad ? "auto" : "smooth"
                });
            }, 100);
        }

        if (!loadingMore) {
            previousMessageCount.current = fullMessage.length;
        }
    }, [fullMessage, isInitialLoad, loadingMore, chatLoading]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !isConnected) return;

        const messageData = {
            conversationId: id,
            text: newMessage,
        };

        // Optimistically add message to UI
        const tempMessage = {
            _messageId: Date.now().toString(),
            text: newMessage,
            senderId: { _userId: currentUserId },
            createdAt: new Date().toISOString(),
            pending: true,
        };

        setFullMessage(prev => [...prev, tempMessage]);
        setNewMessage('');

        try {
            await sendMessage(messageData);

            // Remove temp message (real message will come through socket)
            setFullMessage(prev =>
                prev.filter(msg => msg._messageId !== tempMessage._messageId)
            );
        } catch (error) {
            console.error('Message failed to send', error);

            // Mark message as failed
            setFullMessage(prev =>
                prev.map(msg =>
                    msg._messageId === tempMessage._messageId
                        ? { ...msg, pending: false, error: true }
                        : msg
                )
            );
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    };

    return (
        <div className="p-5">
            <div className={`${!showSidebar ? "block" : "hidden"} w-full md:h-[700px] h-[550px] md:mt-10 flex flex-col md:block`}>
                <div
                    ref={messagesContainerRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f9fafb]"
                    style={{ height: "75vh", paddingBottom: "50px" }}
                >
                    {/* Loading more indicator at top */}
                    {loadingMore && (
                        <div className="flex justify-center py-2">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                        </div>
                    )}

                    {/* Initial loading */}
                    {chatLoading && <IsLoadingComponent />}

                    {/* Messages */}
                    {!chatLoading && fullMessage.length > 0 ? (
                        fullMessage.map((msg, index) => {
                            const isCurrentUser = msg.senderId?._userId === currentUserId;

                            return (
                                <div key={msg._messageId || index} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                                    {!isCurrentUser && msg.senderId?.profileImage && (
                                        <div className="mr-2">
                                            <img
                                                className="w-5 rounded-full h-5"
                                                src={
                                                    msg?.senderId?.profileImage?.imageUrl?.includes('amazonaws')
                                                        ? msg?.senderId?.profileImage?.imageUrl
                                                        : (url + msg?.senderId?.profileImage?.imageUrl)
                                                }
                                                alt="sender"
                                            />
                                        </div>
                                    )}
                                    <div className={`px-4 py-2 rounded-lg break-words max-w-[70%] ${msg.pending
                                        ? "bg-blue-100 text-gray-600"
                                        : msg.error
                                            ? "bg-red-500 text-white"
                                            : isCurrentUser
                                                ? "bg-red-200 text-black"
                                                : "bg-gray-200 text-gray-800"
                                        }`}>
                                        <p>{msg?.text}</p>
                                        <span className="text-xs text-gray-500">
                                            {moment(msg.createdAt).fromNow()}
                                        </span>
                                    </div>
                                    {isCurrentUser && msg.senderId?.profileImage && (
                                        <div className="ml-2">
                                            <img
                                                className="w-5 rounded-full h-5"
                                                src={
                                                    msg?.senderId?.profileImage?.imageUrl?.includes('amazonaws')
                                                        ? msg?.senderId?.profileImage?.imageUrl
                                                        : (url + msg?.senderId?.profileImage?.imageUrl)
                                                }
                                                alt="sender"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : !chatLoading ? (
                        <div className="text-center text-gray-500 mt-10">
                            No messages yet. Start the conversation!
                        </div>
                    ) : null}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input and file upload */}
                <div className="p-3 md:p-4 border-t bg-gray-50 flex items-center gap-2 md:gap-4">
                    <div className="relative w-auto flex items-center">
                        <input
                            type="file"
                            className="opacity-0 z-[999] absolute inset-0 w-full h-full cursor-pointer"
                            onChange={handleFileChange}
                        />
                        <div className="flex items-center justify-center p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 cursor-pointer w-[40px] h-[40px]">
                            <LuImagePlus className="text-4xl text-gray-600" />
                        </div>
                        {selectedFile && (
                            <div className="text-sm absolute bottom-0 text-gray-500 mt-2">
                                {selectedFile.type.startsWith("image/") && (
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Preview"
                                        className="mt-2 w-10 h-10 object-cover"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 border rounded-lg px-3 md:px-4 py-2 outline-none focus:border-blue-400 text-sm md:text-base"
                        placeholder="Type your message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        disabled={!isConnected}
                    />
                    <button
                        className="bg-red-600 text-white cursor-pointer rounded-lg text-xl p-2 md:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={handleSendMessage}
                        disabled={!isConnected || !newMessage.trim()}
                    >
                        <IoIosSend className="text-2xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;

// Loading component
const IsLoadingComponent = () => {
    return (
        <div>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-1">
                    <div className="animate-pulse w-full max-w-lg rounded-md border border-gray-300 p-4">
                        <div className="flex space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 rounded bg-gray-200"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end w-full">
                        <div className="animate-pulse w-full max-w-lg right-0 rounded-md border border-gray-300 p-4">
                            <div className="flex space-x-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 rounded bg-gray-200"></div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};