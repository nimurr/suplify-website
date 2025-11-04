'use client';
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { LuImagePlus } from "react-icons/lu"; // Icon for file upload
import React from "react";
import { IoIosSend } from "react-icons/io";

const Page = () => {
    const { id } = useParams(); // Get chat ID from URL
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const [showSidebar, setShowSidebar] = useState(false);
    const [activeUser, setActiveUser] = useState({
        name: "Nimur Rahman Nerob",
        status: "Active",
    });
    const [messages, setMessages] = useState([
        { _id: "1", text: "Hello, how are you?", sender: { id: "user1", name: "Nimur Rahman Nerob" }, createdAt: new Date(), pending: false, error: false },
        { _id: "2", text: "I'm good, thanks!", sender: { id: "user2", name: "Abu Syad" }, createdAt: new Date(), pending: false, error: false },
        { _id: "3", text: "What are you up to?", sender: { id: "user1", name: "Nimur Rahman Nerob" }, createdAt: new Date(), pending: false, error: false },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // New state to handle file upload

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setIsLoading(true);
            const newMsg = {
                _id: Math.random().toString(),
                text: newMessage,
                sender: { id: "user1", name: activeUser.name },
                createdAt: new Date(),
                pending: true,
                error: false,
            };
            setMessages([...messages, newMsg]);
            setNewMessage("");
            setIsLoading(false);
            setTimeout(() => {
                setMessages((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg._id === newMsg._id ? { ...msg, pending: false } : msg
                    )
                );
            }, 2000);
        }
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
    }, [messages]); // Trigger scroll on messages change

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
                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <div key={msg._id} className={`flex ${msg.sender?.id === "user1" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`px-4 py-2 rounded-lg break-words ${msg.pending
                                        ? "bg-red-100 text-gray-600"
                                        : msg.error
                                            ? "bg-red-500 text-white"
                                            : msg.sender?.id === "user1"
                                                ? "bg-red-200 text-black"
                                                : "bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    <p>{msg.text}</p>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className={`text-xs ${msg.sender?.id === "user1" ? "text-gray-600" : "text-gray-500"}`}>
                                            {formatTime(msg?.createdAt)}
                                        </p>
                                        {msg.pending && (
                                            <span className="text-xs text-blue-500 ml-2">Sending...</span>
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
                        disabled={!activeUser}
                    />
                    <button
                        className={`bg-red-600 text-white cursor-pointer rounded-lg text-xl p-2 md:text-base whitespace-nowrap ${(!activeUser || !newMessage.trim() || isLoading) ? '' : ''}`}
                        onClick={handleSendMessage}
                        disabled={!activeUser || !newMessage.trim()}
                    >
                        <IoIosSend className="text-2xl" />
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default Page;