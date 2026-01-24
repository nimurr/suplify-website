"use client";

import { initSocket } from "@/utils/socket-io";
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useRef,
} from "react";

const SocketContext = createContext(null);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const reconnectAttempts = useRef(0);
    const maxReconnectAttempts = 5;
    const socketRef = useRef(null);

    const connect = useCallback(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) {
            console.warn("No access token available for socket connection");
            return;
        }

        // Use ref to check connection status to avoid dependency issues
        if (socketRef.current?.connected || isConnecting) {
            console.log("Socket already connected or connecting");
            return;
        }

        setIsConnecting(true);

        try {
            const socketInstance = initSocket(token);
            socketRef.current = socketInstance;
            setSocket(socketInstance);

            socketInstance.on("connect", () => {
                console.log("Socket connected:", socketInstance.id);
                setIsConnected(true);
                setIsConnecting(false);
                reconnectAttempts.current = 0;
            });

            socketInstance.on("disconnect", (reason) => {
                console.log("Socket disconnected:", reason);
                setIsConnected(false);

                // Auto-reconnect logic
                if (reason === "io server disconnect" || reason === "transport close") {
                    if (reconnectAttempts.current < maxReconnectAttempts) {
                        reconnectAttempts.current++;
                        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
                        console.log(`Reconnecting in ${delay}ms (attempt ${reconnectAttempts.current})`);
                        setTimeout(() => {
                            connect();
                        }, delay);
                    } else {
                        console.error("Max reconnect attempts reached");
                    }
                }
            });

            socketInstance.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
                setIsConnecting(false);
                setIsConnected(false);
            });

            // User connected event
            socketInstance.on("user:connected", (data) => {
                console.log("User connected:", data);
            });
        } catch (error) {
            console.error("Failed to initialize socket:", error);
            setIsConnecting(false);
        }
    }, []); // No dependencies - stable function

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
        setSocket(null);
        setIsConnected(false);
        setIsConnecting(false);
        reconnectAttempts.current = 0;
    }, []);

    // Auto-connect on mount if token exists
    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token && !socketRef.current) {
            connect();
        }

        return () => {
            disconnect();
        };
    }, []); // Empty dependency array - only run once on mount/unmount

    const value = {
        socket,
        isConnected,
        isConnecting,
        connect,
        disconnect
    };

    return (
        <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
    );
};

export default SocketProvider;