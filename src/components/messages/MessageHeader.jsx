'use client';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import socketUrl from "@/utils/socket";
import { useParams } from 'next/navigation';
import url from '@/redux/api/baseUrl';
import { useGetChatUserInfoQuery } from '@/redux/fetures/messaging/getChatlist';


const MessageHeader = () => {
    const { id } = useParams(); // Get chat ID from URL 

    const { data, isLoading } = useGetChatUserInfoQuery(id);
    const fullUserInfo = data?.data?.attributes[0]?.userId



    return (
        <div>


            <div className='w-full border-b-2  '>
                {
                    isLoading ? (
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
                    ) :
                        <div className='flex items-center gap-2 p-5 '>
                            <div className=" bg-gray-500 w-10 rounded-full h-10 ">
                                <img className="bg-gray-200 w-10 rounded-full h-10 " src={fullUserInfo?.profileImage?.imageUrl.includes("amazonaws") ? fullUserInfo?.profileImage?.imageUrl : url + fullUserInfo?.profileImage?.imageUrl ? fullUserInfo?.profileImage?.imageUrl : "https://cdn4.vectorstock.com/i/1000x1000/96/43/avatar-photo-default-user-icon-picture-face-vector-48139643.jpg"} alt="" />

                            </div>

                            <h2>{fullUserInfo?.name || ''}</h2>
                        </div>
                }
            </div>
        </div>
    );
}

export default MessageHeader;
