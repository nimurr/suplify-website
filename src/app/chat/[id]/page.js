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
    const [page, setPage] = useState(1);
    const [chatLoading, setChatLoading] = useState(false);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const { id } = useParams();
    const { socket, isConnected } = useSocket();

    // Get current user ID from localStorage or your auth context
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                setCurrentUserId(user?.id || user?._id || user?._userId);
            }
        }
    }, []);

    // Load messages when conversation changes
    useEffect(() => {
        if (!id || !isConnected) return;

        const loadMessages = async () => {
            setChatLoading(true);
            try {
                const response = await fetchMessages(id, { page: 1, limit: 50 });
                setTotalPages(response?.totalPages || 1);
                setFullMessage(response?.results?.reverse() || []);
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setChatLoading(false);
            }
        };

        loadMessages();
    }, [id, isConnected]);

    

    // Listen for new messages
    useEffect(() => {
        if (!socket || !id) return;

        const messageListener = (message) => { 
            // console.log("New message received:", message);
            setFullMessage(prev => [...prev, message]);
        };

        socket.on(`new-message-received::${id}`, messageListener);

        return () => {
            socket.off(`new-message-received::${id}`, messageListener);
        };

    }, [socket, id]);

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [fullMessage]);

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
            const response = await sendMessage(messageData);

            // Remove temp message and add real message
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
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f9fafb]" style={{ height: "75vh", paddingBottom: "50px" }}>
                    {chatLoading && <IsLoadingComponent />}

                    {fullMessage.length > 0 ? (
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
                                        <span className="text-xs text-gray-500">{moment(msg.createdAt).fromNow()}</span>
                                        {/* <div className="flex justify-between items-center mt-1">
                                            <p className="text-xs text-gray-500">{moment(msg.createdAt).fromNow()}</p>
                                            {msg.pending && <span className="text-xs text-blue-500 ml-2">Sending...</span>}
                                            {msg.error && <span className="text-xs text-gray-200 ml-2">Failed to send</span>}
                                        </div> */}
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
                    ) : (
                        <div className="text-center text-gray-500 mt-10">No messages yet. Start the conversation!</div>
                    )}
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