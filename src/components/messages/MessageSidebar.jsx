"use client";

import url from "@/redux/api/baseUrl";
import { useGetChatlistQuery } from "@/redux/fetures/messaging/getChatlist";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";
import { useSocket } from "@/context/SocketContext";
import { LuLoader } from "react-icons/lu";

const MessageSidebar = () => {
  const { id } = useParams();
  const page = 1;

  const { joinConversation } = useSocket();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);

  const { data, isLoading } = useGetChatlistQuery(page);
  const getConversations = data?.data?.attributes?.results || [];

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredConversations(getConversations);
    } else {
      const filtered = getConversations.filter((conv) =>
        conv.userId?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [searchQuery, getConversations]);

  const handleJoinSocket = (conversationId) => {
    joinConversation(conversationId);
  };

  return (
    <div className="p-3">
      <Link
        href="/"
        className="flex items-center gap-2 bg-gray-200 p-2 rounded text-xl font-semibold my-5"
      >
        <FaArrowLeft /> Back Home
      </Link>

      <div className="relative">
        <CiSearch className="absolute top-[14px] left-3 text-2xl text-gray-400" />
        <input
          className="py-3 w-full pl-10 rounded-lg border-2 border-gray-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Here..."
        />
      </div>

      <div className="my-5 bg-gray-100 rounded">
        {isLoading ? (
          <LuLoader />
        ) : filteredConversations.length ? (
          filteredConversations.map((conv) => {
            const conversationId =
              conv.conversations?.[0]?._conversationId ||
              conv.conversationId;

            return (
              <Link
                key={conversationId}
                href={`/chat/${conversationId}`}
                onClick={() => handleJoinSocket(conversationId)}
                className={`px-2 py-5 flex gap-3 rounded-lg hover:bg-gray-200 ${
                  id === conversationId && "bg-blue-200"
                }`}
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    conv?.userId?.profileImage?.imageUrl?.includes(
                      "amazonaws.com"
                    )
                      ? conv?.userId?.profileImage?.imageUrl
                      : url + conv?.userId?.profileImage?.imageUrl
                  }
                  alt=""
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-sm">
                    {conv?.userId?.name}
                  </h2>
                  <p className="text-sm text-gray-600 truncate">
                    {conv?.conversations?.[0]?.lastMessage}
                  </p>
                </div>

                <p className="text-xs text-gray-500">
                  {moment(
                    conv?.conversations?.[0]?.updatedAt
                  ).fromNow()}
                </p>
              </Link>
            );
          })
        ) : (
          <p className="p-4 text-gray-500">No conversations found</p>
        )}
      </div>
    </div>
  );
};

export default MessageSidebar;
