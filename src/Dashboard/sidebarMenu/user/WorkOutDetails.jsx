"use client";

import React from "react";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookNowSheduleWorkoutClassMutation, useGetAllScheduleWorkoutClassQuery } from "@/redux/fetures/patient/specialist";
import moment from "moment";
import Link from "next/link";
import toast from "react-hot-toast";

// Sample trainer data
const trainer = {
  id: 1,
  name: "Sakib Ahmed",
  roles: ["Trainer", "Body trainer"],
  image: "/images/trainer.png", // Replace with actual image path
  description: "Lorem ipsum dolor sit amet consectetur. Massa risus eget justo vel urna sapien posuere. Mauris magna eratest vestibulum cum egestas etiam pulvinar orci."
};



// Schedule card component
const ScheduleCard = ({ schedule }) => {

  const [bookNow] = useBookNowSheduleWorkoutClassMutation();

  const id = schedule._id;

  const handleBookNow = async () => {
    try {
      const res = await bookNow(id).unwrap();
      console.log(res);
      if (res?.code == 200) {
        toast.success(res?.message)
        if (res?.data?.attributes?.url) {
          window.location.href = `${res?.data?.attributes?.url}`;
        }
      }
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4">
        {/* Video icon and workout title */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-2 rounded-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="black" strokeWidth="1.5" />
                <path d="M10 9L15 12L10 15V9Z" fill="black" />
              </svg>
            </div>
            <h3 className="text-md font-medium">{schedule.scheduleName}</h3>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-bold">{schedule.price}</span>
            <span className="text-xs text-gray-500 ml-1">$USDR</span>
          </div>
        </div>

        {/* Date row */}
        <div className="mb-2">
          <div className="text-xs text-gray-600">Date</div>
          <div className="text-sm font-medium">{schedule.scheduleDate}</div>
        </div>

        {/* Time row */}
        <div className="flex justify-between mb-3">
          <div>
            <div className="text-xs text-gray-600">Start Time</div>
            <div className="text-sm font-medium">{moment(schedule.startTime).format('hh:mm A')}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">End Time</div>
            <div className="text-sm font-medium">{moment(schedule.endTime).format('hh:mm A')}</div>
          </div>
        </div>



        {/* Description */}
        <div className="text-xs text-gray-600 mb-4">
          {schedule.description}
        </div>

        <div className="flex items-center justify-between my-3">
          <p className="underline text-red-500 font-semibold">{schedule?.totalPatientBookings || "0"} Booked</p>
          <span className="bg-red-100 text-red-600 p-2 capitalize rounded-lg">{schedule?.sessionType || "Online"}</span>
        </div>


        {
          schedule?.latestBookingStatus == null ? (
            <Button
              type="primary"
              danger
              block
              className="h-9"
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          ) :
            <Link target="_blank" href={`${schedule.meetingLink}`}>
              <button
                className="h-9 text-purple-700  "
              >
                {schedule.meetingLink}
              </button>
            </Link>
        }

      </div>
    </div>
  )
};

export default function WorkOutDetails() {
  const router = useRouter()
  const perams = useSearchParams()
  const specialistId = perams.get('specialistId')

  const { data } = useGetAllScheduleWorkoutClassQuery({ specialistId });
  const schedules = data?.data?.attributes?.result?.results;
  const specialistInfo = data?.data?.attributes?.specialistInfo;


  return (
    <div className="bg-gray-50 p-4 md:p-6">
      <h1 className='text-2xl font-semibold flex items-center gap-2 my-12'>
        <LeftOutlined onClick={() => router.back()} className=' cursor-pointer' />
        View Full Schedule
      </h1>
      <div className=" mx-auto">
        {/* Trainer info section */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Trainer image */}
          <div className="w-full bg-white p-2 rounded-lg md:w-1/4 lg:w-1/5">
            <div className=" rounded-lg overflow-hidden">
              <img
                src={specialistInfo?.profileImage?.imageUrl}
                alt={specialistInfo?.name}
                className="w-full h-auto object-cover"
              />
              <div className="my-3">
                <h2 className="text-lg font-semibold">{specialistInfo?.name}</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  {specialistInfo?.profileId?.protocolNames?.map((role, index) => (
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
            <div className="flex items-center my-3 font-semibold justify-between">
              <h2>Programs </h2>
              <span className="text-red-500">{specialistInfo?.profileId?.howManyPrograms}</span>
            </div>

            {/* Description section */}
            <div className="  mt-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-gray-600">{specialistInfo?.profileId?.description?.length > 100 ? `${specialistInfo?.profileId?.description.slice(0, 100)}...` : specialistInfo?.profileId?.description}</p>
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
              {schedules?.map((schedule) => (
                <ScheduleCard key={schedule.id} specialistId={specialistId} schedule={schedule} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}