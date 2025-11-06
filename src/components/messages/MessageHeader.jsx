'use client';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import socketUrl from "@/utils/socket";
import { useParams } from 'next/navigation';


const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGViM2Q5MDIyMDMzODQ2YzNjYjIyZWQiLCJ1c2VyTmFtZSI6InBhdGllbnQgdGhyZWUiLCJlbWFpbCI6InAzQGdtYWlsLmNvbSIsInJvbGUiOiJwYXRpZW50Iiwic3RyaXBlX2N1c3RvbWVyX2lkIjoiY3VzX1RKMlhicTJTQ0Z5RU9RIiwiaWF0IjoxNzYxOTY3ODg4LCJleHAiOjE3NjIzOTk4ODh9.4U2Xgs3F5WHZJlZHh8JhutCjyTUpSB02QL_Uk_1l120';

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

const MessageHeader = () => {
    const { id } = useParams(); // Get chat ID from URL
    const [user, setUser] = useState(null);
    const [msg, setMsg] = useState(null);
    const [fullMessage, setFullMessage] = useState([]);


    useEffect(() => {
        const user = localStorage.getItem('user');
        const fullUser = JSON.parse(user);
        setUser(fullUser);

        const socket = initializeSocket();

        socket.emit('get-all-message-by-conversationId', { conversationId: id, page: 1, limit: 10 }, (response) => {
            console.log('✅ Joined conversation:', response?.data?.results);
            setFullMessage(response?.data?.results);
        });

    }, []);

    return (
        <div>
            <div className='w-full border-b-2 flex items-center gap-2 p-5'>
                <div className=" bg-gray-500 w-10 rounded-full h-10 ">
                    {
                        fullMessage.senderId?._userId === user?.id && (
                            <img className="bg-gray-200 w-10 rounded-full h-10 " src={fullMessage?.senderId?.profileImage?.imageUrl} alt="" />
                        )
                    }
                </div>

                <h2>{fullMessage?.senderId?.name || 'N/A'}</h2>
            </div>
        </div>
    );
}

export default MessageHeader;
