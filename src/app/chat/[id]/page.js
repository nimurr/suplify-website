'use client';
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { LuImagePlus } from "react-icons/lu"; // Icon for file upload
import React from "react";
import { IoIosSend } from "react-icons/io";
import { io } from 'socket.io-client';
import socketUrl from "@/utils/socket";
import moment from "moment";
import url from "@/redux/api/baseUrl";
import { useGetMessageQuery } from "@/redux/fetures/messaging/getMessage";

// get token from localStorage and set it to AUTH_TOKEN
let AUTH_TOKEN = '';
if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
        AUTH_TOKEN = token;
    }
}

let socketInstance = null;

const initializeSocket = () => {
    if (!socketInstance) {
        socketInstance = io(socketUrl, {
            auth: { token: AUTH_TOKEN },
            extraHeaders: { token: AUTH_TOKEN },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 10000,
        });
    }
    return socketInstance;
};

const Page = () => {



    const [showSidebar, setShowSidebar] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // New state to handle file upload
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [fullMessage, setFullMessage] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const { id } = useParams(); // Get chat ID from URL
    const [user, setUser] = useState(null);

    const page = 1;

    const socket = initializeSocket();
    const { data: chatList, isLoading: chatLoading, refetch } = useGetMessageQuery({ page, id });
    const chatData = chatList?.data?.attributes || [];


    useEffect(() => {
        const user = localStorage.getItem('user');
        const fullUser = JSON.parse(user);
        setUser(fullUser);
        setFullMessage(chatData);

        // Ensure you only join the conversation once
        socket.emit('join', { conversationId: id }, (response) => {
            console.log('✅ Joined conversation successfully:', response);
        });

        // Remove previous listeners to avoid duplicate events
        socket.off(`new-message-received::${id}`);

        // Listen for new messages only for this conversation
        socket.on(`new-message-received::${id}`, (res) => {
            setFullMessage((prevMessages) => [...prevMessages, res]);
            refetch();
        });

        return () => {
            // Cleanup the socket listeners when the component is unmounted
            socket.off(`new-message-received::${id}`);
        };

    }, [chatData, id]); // Listen to changes in chatData and conversation ID


    const handleSendMessage = () => {
        // Ensure the socket is connected

        const messageData = {
            conversationId: id,
            text: newMessage,
        };

        // Send the message to the server
        socket.emit('send-new-message', messageData, (response) => {
            socket.emit('get-all-message-by-conversationId', { conversationId: id, page: 1, limit: 10 }, (response) => {
                // console.log('✅ Joined conversation before:', response?.data?.results);
                setTotalPages(response?.data?.totalPages);
                setFullMessage(response?.data?.results.reverse());
            });
            if (response?.success) {
                setNewMessage('');
                const user = localStorage.getItem('user');
                const fullUser = JSON.parse(user);
                setUser(fullUser);
            }
        });

    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const formatTime = (date) => {
        return `${date.getHours()}:${date.getMinutes()}`;
    };

    // Scroll to the last message when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [fullMessage]); // Trigger scroll on messages change

    return (
        <div className="p-5">
            <div className={`${!showSidebar ? "block" : "hidden"} w-full md:h-[700px] h-[550px] md:mt-10 flex flex-col md:block`}>
                <div
                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f9fafb]"
                    style={{
                        height: "75vh",
                        paddingBottom: "50px",
                    }}
                >
                    {
                        chatLoading && (
                            <IsLoadingComponent />
                        )
                    }
                    {fullMessage ? (
                        fullMessage?.map((msg) => (
                            <div key={msg._id} className={`flex ${msg.senderId?._userId === user?.id ? "justify-end" : "justify-start"}`}>
                                {msg.senderId?._userId !== user?.id && (
                                    <div className="mr-2">
                                        <img className=" w-5 rounded-full h-5 " src={msg?.senderId?.profileImage?.imageUrl.includes('amazonaws') ? msg?.senderId?.profileImage?.imageUrl : (url + msg?.senderId?.profileImage?.imageUrl)} alt="" />
                                    </div>
                                )}
                                <div
                                    className={`px-4 py-2 rounded-lg break-words ${msg.pending
                                        ? "bg-red-100 text-gray-600"
                                        : msg.error
                                            ? "bg-red-500 text-white"
                                            : msg.senderId?._userId === user?.id
                                                ? "bg-red-200 text-black"
                                                : "bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    <p>{msg?.text}</p>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className={`text-xs ${msg.sender?.id === "user1" ? "text-gray-600" : "text-gray-500"}`}>
                                            {moment(msg.createdAt).fromNow()}
                                        </p>
                                        {msg.pending && (
                                            <span className="text-xs text-blue-500 ml-2">Sending...</span>
                                        )}
                                        {msg.error && (
                                            <span className="text-xs text-gray-200 ml-2">Failed to send</span>
                                        )}
                                    </div>
                                </div>
                                {msg.senderId?._userId === user?.id && (
                                    <div className="ml-2">
                                        <img className=" w-5 rounded-full h-5 " src={msg?.senderId?.profileImage?.imageUrl.includes('amazonaws') ? msg?.senderId?.profileImage?.imageUrl : (url + msg?.senderId?.profileImage?.imageUrl)} alt="" />
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>No messages</div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-3 md:p-4 border-t bg-gray-50 flex items-center gap-2 md:gap-4">
                    <div className="relative w-auto flex items-center">
                        {/* File upload input */}
                        <input
                            type="file"
                            className="opacity-0 z-[999] absolute inset-0 w-full h-full cursor-pointer"
                            onChange={handleFileChange}
                        />
                        <div className="flex items-center justify-center p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 cursor-pointer w-[40px] h-[40px]">
                            <LuImagePlus className="text-4xl text-gray-600" />
                        </div>
                        {/* Display selected file */}
                        {selectedFile && (
                            <div className="text-sm absolute button-0 text-gray-500 mt-2">
                                {selectedFile.type.startsWith("image/") && (
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="File Preview"
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
                    />
                    <button
                        className={`bg-red-600 text-white cursor-pointer rounded-lg text-xl p-2 md:text-base whitespace-nowrap `}
                        onClick={handleSendMessage}
                    >
                        <IoIosSend className="text-2xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;


const IsLoadingComponent = () => {
    return (
        <div className="space-y-1">
            <div className="animate-pulse w-full max-w-lg rounded-md border border-gray-300 p-4">
                <div className="flex animate-pulse space-x-4">
                    <div className="size-10 rounded-full bg-gray-200"></div>
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
            <div className="flex items-center justify-end">
                <div className="animate-pulse w-full max-w-lg rounded-md border border-gray-300 p-4">
                    <div className="flex animate-pulse space-x-4">
                        <div className="size-10 rounded-full bg-gray-200"></div>
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
            <div className="animate-pulse w-full max-w-lg rounded-md border border-gray-300 p-4">
                <div className="flex animate-pulse space-x-4">
                    <div className="size-10 rounded-full bg-gray-200"></div>
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
            <div className="flex items-center justify-end">
                <div className="animate-pulse w-full max-w-lg rounded-md border border-gray-300 p-4">
                    <div className="flex animate-pulse space-x-4">
                        <div className="size-10 rounded-full bg-gray-200"></div>
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
            <div className="animate-pulse w-full max-w-lg rounded-md border border-gray-300 p-4">
                <div className="flex animate-pulse space-x-4">
                    <div className="size-10 rounded-full bg-gray-200"></div>
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
            <div className="flex items-center justify-end">
                <div className="animate-pulse w-full max-w-lg rounded-md border border-gray-300 p-4">
                    <div className="flex animate-pulse space-x-4">
                        <div className="size-10 rounded-full bg-gray-200"></div>
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
            <div className="animate-pulse w-full max-w-lg rounded-md border border-gray-300 p-4">
                <div className="flex animate-pulse space-x-4">
                    <div className="size-10 rounded-full bg-gray-200"></div>
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
            <div className="flex items-center justify-end">
                <div className="animate-pulse w-full max-w-lg rounded-md border border-gray-300 p-4">
                    <div className="flex animate-pulse space-x-4">
                        <div className="size-10 rounded-full bg-gray-200"></div>
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
    );
};