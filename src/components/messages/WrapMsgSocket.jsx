'use client';
import socketUrl from '@/utils/socket';
import React, { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// 🔑 Replace with your actual token (in real app: from localStorage/context)

let AUTH_TOKEN = '';
if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
        AUTH_TOKEN = token;
    }
}

let socket = null;

const initializeSocket = () => {
    if (!socket) {
        socket = io(socketUrl, {
            // ✅ Method 1: Send via auth (most reliable in browsers)
            auth: {
                token: AUTH_TOKEN,
            },
            // ✅ Method 2: Also send via custom header (for environments that support it)
            extraHeaders: {
                token: AUTH_TOKEN, // 👈 matches `socket.handshake.headers.token`
            },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 10000,
            // transports: ['websocket'], // optional
        });
    }
    return socket;
};
const WrapMsgSocket = ({ children }) => {
    useEffect(() => {
        const socketInstance = initializeSocket();

        const onConnect = () => {
            console.log('✅ Socket connected');
        };

        const onDisconnect = () => {
            console.log('❌ Socket disconnected:');
        };

        const onConnectError = () => {
            console.error('🔴 Socket connection error:', error.message);
            if (error.message.includes('Authentication')) {
                alert('Authentication failed. Please log in again.');
            }
        };

        socketInstance.on('connect', onConnect);
        socketInstance.on('disconnect', onDisconnect);
        socketInstance.on('connect_error', onConnectError);

        return () => {
            socketInstance.off('connect', onConnect);
            socketInstance.off('disconnect', onDisconnect);
            socketInstance.off('connect_error', onConnectError);
        };
    }, []);
    return children;
}

export default WrapMsgSocket;
