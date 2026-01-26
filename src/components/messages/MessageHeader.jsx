'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import url from '@/redux/api/baseUrl';
import { useGetChatUserInfoQuery } from '@/redux/fetures/messaging/getChatlist';
import { getSocket } from '@/utils/socket-io';

const MessageHeader = () => {
    const { id } = useParams(); // Get chat ID from URL 
    const socket = getSocket();
    const [isOnline, setIsOnline] = useState(false);

    const { data, isLoading } = useGetChatUserInfoQuery(id);
    const fullUserInfo = data?.data?.attributes[0]?.userId;
    const otherUserId = fullUserInfo?._userId; // The person I'm chatting with

    // Request and listen for user online status
    useEffect(() => {
        if (!socket || !otherUserId) {
            console.log("Not ready - socket:", !!socket, "otherUserId:", otherUserId);
            return;
        }
        // console.log("🔍 Requesting online status for user:", otherUserId);

        // Emit event to request user's online status
        // setinterval to request status every 2 minure seconds
        setInterval(() => {
            socket.emit('isOnline', { userId: otherUserId }, (response) => {
                // console.log(" User status response:", response?.messageDetails);
                setIsOnline(response?.messageDetails?.isOnline || response?.messageDetails?.isOnline === 'online');
            });
        }, 120000);

        socket.emit('isOnline', { userId: otherUserId }, (response) => {
            // console.log(" User status response:", response?.messageDetails);
            setIsOnline(response?.messageDetails?.isOnline || response?.messageDetails?.isOnline === 'online');
        });

      
    }, [socket, otherUserId, fullUserInfo?.name]);

    return (
        <div>
            <div className='w-full border-b-2'>
                {isLoading ? (
                    <div className="animate-pulse w-full max-w-sm rounded-md border border-gray-300 p-2 m-1">
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
                ) : (
                    fullUserInfo?.profileImage?.imageUrl && (
                        <div className='flex items-center gap-2 p-5'>
                            <div className="bg-gray-500 w-10 rounded-full h-10 relative">
                                <img
                                    className="bg-gray-200 w-10 rounded-full h-10"
                                    src={
                                        fullUserInfo?.profileImage?.imageUrl.includes("amazonaws")
                                            ? fullUserInfo?.profileImage?.imageUrl
                                            : url + fullUserInfo?.profileImage?.imageUrl
                                    }
                                    alt={fullUserInfo?.name || 'User'}
                                />
                                {/* Online/Offline Status Indicator */}
                                <span
                                    className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'
                                        }`}
                                    title={isOnline ? 'Online' : 'Offline'}
                                ></span>
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='font-semibold'>{fullUserInfo?.name || ''}</h2>
                                <span className='text-xs text-gray-500'>
                                    {isOnline ? 'Active now' : 'Offline'}
                                </span>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default MessageHeader;