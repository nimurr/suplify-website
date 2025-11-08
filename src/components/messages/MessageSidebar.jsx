'use client';

import url from '@/redux/api/baseUrl';
import socketUrl from '@/utils/socket';
import moment from 'moment';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaArrowLeft } from 'react-icons/fa6';
import { io } from 'socket.io-client';

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

const MessageSidebar = () => {
    const { id } = useParams();

    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // To track search input

    useEffect(() => {
        const socket = initializeSocket();

        const fetchConversations = () => {
            socket.emit(
                'get-all-conversations-with-pagination',
                { page: 1, limit: 10, search: searchQuery }, // Pass searchQuery in socket request
                (response) => {
                    setLoading(false);

                    if (response && response.success) {
                        const data = Array.isArray(response.data)
                            ? response.data
                            : (response.data && response.data.results) || [];

                        setConversations(data);
                    } else {
                        console.error('Failed to load conversations:', response?.message || 'Unknown error');
                    }
                }
            );
        };

        if (socket.connected) {
            fetchConversations();
        } else {
            const onConnect = () => fetchConversations();
            socket.on('connect', onConnect);

            return () => {
                socket.off('connect', onConnect);
            };
        }
    }, [searchQuery]);  // Re-fetch conversations when searchQuery changes

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update search query as user types
    };

    const handleJoinSocket = () => {
        const socket = initializeSocket();
        const conversationId = {
            conversationId: id,
        };
        socket.emit('join', conversationId, (response) => {
            console.log('✅ Joined conversation:', response);
        });
    };

    const handleClickSearch = (e) => {
        e.preventDefault();
        const socket = initializeSocket();
        const serarchInfo = {
            page: 1,
            limit: 10,
            search: searchQuery,  // Using the state value for search query
        };

        socket.emit('get-all-conversations-with-pagination', serarchInfo, (response) => {
            console.log('✅ Conversations response:', response);
        });

        console.log('clicked', serarchInfo);
    };

    return (
        <div className="p-3">
            <Link href={'/'} className="text-center flex items-center gap-2 bg-gray-200 p-2 rounded text-xl font-semibold my-5">
                <FaArrowLeft /> Back Home
            </Link>
            <div className="relative">
                <CiSearch className="absolute text-[#b8b8b8] top-[14px] text-2xl left-3" />
                <input
                    className="py-3 w-full pl-10 px-2 rounded-lg focus:border-blue-300 outline-none border-2 border-gray-200"
                    type="text"
                    name="search"
                    value={searchQuery} // Bind to state
                    onChange={handleSearchChange} // Update the search query
                    placeholder="Search Here..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleClickSearch(e); // Trigger search on Enter key
                        }
                    }}
                />
            </div>

            <div className="my-5 bg-gray-100 rounded">
                {loading ? (
                    <div className="mx-auto w-full max-w-sm rounded-md border border-gray-300 p-4">
                        <div className="flex animate-pulse space-x-4">
                            <div className="size-10 rounded-full bg-gray-200"></div>
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 rounded bg-gray-200"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                        <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : conversations?.length > 0 ? (
                    conversations?.map((conv) => {
                        const participant = conv.participant || conv.otherUser || {};
                        const lastMessage = conv.lastMessage || {};
                        return (
                            <Link
                                href={`/chat/${conv.conversations[0]?._conversationId || conv.conversationId}`}
                                key={conv._id || conv.conversationId}
                                className={`px-2 py-5 rounded-lg flex items-start hover:bg-gray-200 cursor-pointer justify-between gap-3 ${id === conv.conversations[0]?._conversationId && 'bg-blue-200 hover:bg-blue-200'}`}
                                onClick={handleJoinSocket}
                            >
                                <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src={conv?.userId?.profileImage?.imageUrl.includes('amazonaws.com') ? conv?.userId?.profileImage?.imageUrl : url + conv?.userId?.profileImage?.imageUrl}
                                    alt={conv?.userId?.name}
                                />
                                <div className="flex-1 min-w-0">
                                    <h2 className="font-semibold text-sm truncate">
                                        {conv?.userId?.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 truncate">
                                        {conv?.conversations[0]?.lastMessage?.length > 25 ? conv?.conversations[0]?.lastMessage?.slice(0, 25) + '...' : conv?.conversations[0]?.lastMessage}
                                    </p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    {conv?.conversations[0]?.updatedAt && moment(conv?.conversations[0]?.updatedAt).fromNow()}
                                </p>
                            </Link>
                        );
                    })
                ) : (
                    <p className="px-4 py-3 text-gray-500">No conversations found.</p>
                )}
            </div>
        </div>
    );
};

export default MessageSidebar;
