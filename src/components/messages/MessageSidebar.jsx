'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';


const MessageSidebar = () => {

 

  return (
    <div className="p-3">
      <h2 className="text-center text-2xl font-semibold my-5">Messages</h2>
      <div className="relative">
        <CiSearch className="absolute text-[#b8b8b8] top-[14px] text-2xl left-3" />
        <input
          className="py-3 w-full pl-10 px-2 rounded-lg focus:border-blue-300 outline-none border-2 border-gray-200"
          type="text"
          placeholder="Search Here..."
        />
      </div>

      <div className="my-5 bg-gray-100 rounded">
        {[...Array(6)].map((_, index) => (
          <Link
            href={`/chat/${index}`}
            key={index}
            className="px-2 py-5 rounded-lg flex items-start hover:bg-red-100 cursor-pointer justify-between gap-1"
          >
            <img
              className="w-10"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User"
            />
            <div>
              <h2 className="font-semibold text-sm">Nimur Rahman Nerob</h2>
              <p className="text-sm">I just said, we may good...</p>
            </div>
            <p className="text-xs">Aug-30</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MessageSidebar;