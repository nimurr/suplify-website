
import { getSocket } from "./socket-io";

export const joinConversation = (conversationId) => {
    return new Promise((resolve, reject) => {
        const socket = getSocket();
        if (!socket) {
            reject(new Error("Socket not connected"));
            return;
        }
        // console.log("Conversation", conversationId)
        socket.emit("join", { conversationId }, (response) => {
            if (response.success) {
                resolve(response.data);
            } else {
                reject(
                    new Error(response.message || "Failed to join conversation")
                );
            }
        });
    });
}
export const fetchConversationList = (
    params
) => {
    return new Promise((resolve, reject) => {
        const socket = getSocket();
        if (!socket) {
            reject(new Error("Socket not connected"));
            return;
        }

        socket.emit(
            "get-all-conversations-with-pagination",
            {
                page: params.page || 1,
                limit: params.limit || 50,
                search: params.search || "",
            },
            (response) => {
                if (response.success) {
                    // console.log("Response data", response.data)
                    resolve(response.data);
                } else {
                    reject(
                        new Error(response.message || "Failed to fetch conversation list")
                    );
                }
            }
        );
    });
};


export const fetchMessages = (
    conversationId,
    params
) => {
    return new Promise((resolve, reject) => {
        const socket = getSocket();
        if (!socket) {
            reject(new Error("Socket not connected"));
            return;
        }

        socket.emit(
            "get-all-message-by-conversationId",
            {
                conversationId,
                page: params.page || 1,
                limit: params.limit || 50,
            },
            (response) => {
                if (response.success) {
                    // console.log("fetchMessages: Received response", response);
                    resolve(response.data);
                } else {
                    reject(new Error(response.message || "Failed to fetch messages"));
                }
            }
        );
    });
};

// For operations that return just success + maybe minimal payload (e.g., ID or boolean)
export const sendMessage = (messageData) => {
    return new Promise((resolve, reject) => {
        const socket = getSocket();

        if (!socket) {
            console.error("sendMessage: Socket is null");
            reject(new Error("Socket not connected"));
            return;
        }
        socket.emit(
            "send-new-message",
            messageData,
            (response) => {
                clearTimeout(timeout);
                console.log("sendMessage: Received response", response);

                if (response && response.success) {
                    resolve(response.data);
                } else {
                    const errorMsg = response?.message || "Failed to send message";
                    console.error("sendMessage: Server returned error:", errorMsg);
                    reject(new Error(errorMsg));
                }
            }
        );
    });
};

export const leaveConversation = (conversationId) => {
    return new Promise((resolve, reject) => {
        const socket = getSocket();
        if (!socket) {
            reject(new Error("Socket not connected"));
            return;
        }
        socket.emit("leave", { conversationId }, (response) => {
            console.log("leave Conversation: Received response", response)

            if (response.success) {
                resolve(response.data);
            } else {
                reject(new Error(response.message || "Failed to leave conversation"));
            }
        });
    });
}

