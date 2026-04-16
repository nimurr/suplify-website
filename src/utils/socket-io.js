import { io, Socket } from "socket.io-client";

// const socketUrl = "sheakh6735.sobhoy.com";
const socketUrl = "wss://ws.suplify.life";

let socket  = null;

export const initSocket = (token) => {
  // If socket exists and is connected, return it
  if (socket?.connected) {
    return socket;
  }

  // If socket exists but disconnected, clean it up first
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }

  // Connect to the socket server with authentication
  socket = io(socketUrl, {
    auth: {
      token,
    },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("Socket connected to server:", socket?.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected from server:", reason);
    // Don't null the socket here - let reconnection handle it
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
  });

  return socket;
};

export const getSocket = () => {
  if (socket?.connected) {
    return socket;
  }
  console.warn("Socket not connected, getSocket returning:", socket ? "disconnected socket" : "null");
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
};

// Helper to check socket status
export const isSocketConnected = () => {
  return socket?.connected ?? false;
};
