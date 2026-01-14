"use client";

import socketUrl from "@/utils/socket";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);

    const [connected, setConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typingUser, setTypingUser] = useState(null);
    const [messages, setMessages] = useState([]);

    // Get user safely
    let userId = null;
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        if (user) {
            userId = JSON.parse(user)?.id;
        }
    }

    // 🔹 INITIAL SOCKET CONNECTION
    useEffect(() => {
        if (!userId) return;

        socketRef.current = io(socketUrl, {
            transports: ["websocket"],
            auth: { token: userId },
            extraHeaders: { token: userId },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 10000,
        });

        const socket = socketRef.current;

        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);
            setConnected(true);
            socket.emit("user-online", userId);
        });

        socket.on("online-users", (users) => {
            setOnlineUsers(users);
        });

        socket.on("typing", (data) => {
            setTypingUser(data);
        });

        socket.on("stop-typing", () => {
            setTypingUser(null);
        });

        socket.on("receive-message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on("disconnect", () => {
            console.log("❌ Socket disconnected");
            setConnected(false);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    // 🔹 JOIN CONVERSATION (ROOM)
    const joinConversation = (conversationId) => {
        if (!socketRef.current) return;

        socketRef.current.emit(
            "join",
            { conversationId },
            (response) => {
                console.log("✅ Joined conversation:", response);
            }
        );
    };

    // 🔹 SEND MESSAGE
    const sendMessage = (message) => {
        socketRef.current?.emit("send-message", message);
    };

    // 🔹 TYPING EVENTS
    const startTyping = (data) => {
        socketRef.current?.emit("typing", data);
    };

    const stopTyping = () => {
        socketRef.current?.emit("stop-typing");
    };

    return (
        <SocketContext.Provider
            value={{
                socket: socketRef.current,
                connected,
                onlineUsers,
                typingUser,
                messages,
                joinConversation,
                sendMessage,
                startTyping,
                stopTyping,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
