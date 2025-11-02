"use client";

import React from "react";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

// Sample trainer data
const trainer = {
  id: 1,
  name: "Sakib Ahmed",
  roles: ["Trainer", "Body trainer"],
  image: "/images/trainer.png", // Replace with actual image path
  description: "Lorem ipsum dolor sit amet consectetur. Massa risus eget justo vel urna sapien posuere. Mauris magna eratest vestibulum cum egestas etiam pulvinar orci."
};

// Sample schedule data
const scheduleData = [
  {
    id: 1,
    title: "Push-up workout",
    price: 150,
    totalSession: 4,
    timeDuration: "4h",
    date: "12-Jan-2025, Saturday",
    startTime: "10:00 pm",
    endTime: "11:00 pm",
    description: "This description is very important for a user. They can successfully find full program on this schedule. This description is very important for a user.",
    isBookable: true,
  },
  {
    id: 2,
    title: "Push-up workout",
    price: 180,
    totalSession: 4,
    timeDuration: "4h",
    date: "12-Jan-2025, Saturday",
    startTime: "10:00 pm",
    endTime: "11:00 pm",
    description: "This description is very important for a user. They can successfully find full program on this schedule. This description is very important for a user.",
    isBookable: true,
  },
  {
    id: 3,
    title: "Push-up workout",
    price: 180,
    totalSession: 4,
    timeDuration: "4h",
    date: "12-Jan-2025, Saturday",
    startTime: "10:00 pm",
    endTime: "11:00 pm",
    description: "This description is very important for a user. They can successfully find full program on this schedule. This description is very important for a user.",
    isBookable: true,
  },
  {
    id: 4,
    title: "Push-up workout",
    price: 150,
    totalSession: 4,
    timeDuration: "4h",
    date: "12-Jan-2025, Saturday",
    startTime: "10:00 pm",
    endTime: "11:00 pm",
    description: "This description is very important for a user. They can successfully find full program on this schedule. This description is very important for a user.",
    isBookable: true,
  },
  {
    id: 5,
    title: "Push-up workout",
    price: 180,
    totalSession: 4,
    timeDuration: "4h",
    date: "12-Jan-2025, Saturday",
    startTime: "10:00 pm",
    endTime: "11:00 pm",
    description: "This description is very important for a user. They can successfully find full program on this schedule. This description is very important for a user.",
    isBookable: true,
  },
  {
    id: 6,
    title: "Push-up workout",
    price: 180,
    totalSession: 4,
    timeDuration: "4h",
    date: "12-Jan-2025, Saturday",
    startTime: "10:00 pm",
    endTime: "11:00 pm",
    description: "This description is very important for a user. They can successfully find full program on this schedule. This description is very important for a user.",
    isBookable: true,
  },
];

// Schedule card component
const ScheduleCard = ({ schedule }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="p-4">
      {/* Video icon and workout title */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-2 rounded-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="black" strokeWidth="1.5"/>
              <path d="M10 9L15 12L10 15V9Z" fill="black"/>
            </svg>
          </div>
          <h3 className="text-md font-medium">{schedule.title}</h3>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-bold">{schedule.price}</span>
          <span className="text-xs text-gray-500 ml-1">$USDR</span>
        </div>
      </div>
      
      {/* Session details */}
      <div className="flex justify-between mb-2 text-xs text-gray-600">
        <div>
          <div>Total Session</div>
          <div className="font-semibold">{schedule.totalSession}</div>
        </div>
        <div>
          <div>Time Duration</div>
          <div className="font-semibold">{schedule.timeDuration}</div>
        </div>
      </div>
      
      {/* Date row */}
      <div className="mb-2">
        <div className="text-xs text-gray-600">Date</div>
        <div className="text-sm font-medium">{schedule.date}</div>
      </div>
      
      {/* Time row */}
      <div className="flex justify-between mb-3">
        <div>
          <div className="text-xs text-gray-600">Start Time</div>
          <div className="text-sm font-medium">{schedule.startTime}</div>
        </div>
        <div>
          <div className="text-xs text-gray-600">End Time</div>
          <div className="text-sm font-medium">{schedule.endTime}</div>
        </div>
      </div>
      
      {/* Description */}
      <div className="text-xs text-gray-600 mb-4">
        {schedule.description}
      </div>
      
      {/* Book button */}
      <Button
        type="primary"
        danger
        block
        className="h-9"
      >
        Book Now
      </Button>
    </div>
  </div>
);

export default function WorkoutClassDetails() {
    const router = useRouter()
  return (
    <div className="bg-gray-50 p-4 md:p-6">
        <h1  className='text-2xl font-semibold flex items-center gap-2 my-12'>
        <LeftOutlined onClick={() => router.back()} className=' cursor-pointer' />
        View Full Schedule
        </h1>
      <div className=" mx-auto">
        {/* Trainer info section */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Trainer image */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{trainer.name}</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  {trainer.roles.map((role, index) => (
                    <span 
                      key={index} 
                      className="text-xs border border-gray-300 px-2 py-1 rounded-md"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Description section */}
            <div className="bg-white rounded-lg p-4 mt-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-gray-600">{trainer.description}</p>
            </div>
          </div>
          
          {/* Schedule section */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Available Schedule</h2>
              <span className="text-sm text-gray-600">Total Schedule: 10</span>
            </div>
            
            {/* Schedule grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduleData.map((schedule) => (
                <ScheduleCard key={schedule.id} schedule={schedule} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}