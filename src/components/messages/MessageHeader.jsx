'use client';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import socketUrl from "@/utils/socket";
import { useParams } from 'next/navigation';
import url from '@/redux/api/baseUrl';


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
            // console.log('✅ Joined conversation:', response?.data?.results);
            setFullMessage(response?.data?.results);
        });

    }, []);




    return (
        <div>


            <div className='w-full border-b-2  '>
                {
                    id && (
                        <div className='flex items-center gap-2 p-5 '>
                            <div className=" bg-gray-500 w-10 rounded-full h-10 ">
                                {
                                    fullMessage[0]?.senderId?._userId === user?.id && (
                                        <img className="bg-gray-200 w-10 rounded-full h-10 " src={fullMessage[0]?.senderId?.profileImage?.imageUrl.includes("amazonaws") ? fullMessage[0]?.senderId?.profileImage?.imageUrl : url + fullMessage[0]?.senderId?.profileImage?.imageUrl} alt="" />
                                    )
                                }
                            </div>

                            <h2>{fullMessage[0]?.senderId?.name || 'N/A'}</h2>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default MessageHeader;
