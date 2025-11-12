'use client'
import React from 'react';
import { Button, Card, Typography, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { LuMonitorPlay } from 'react-icons/lu';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { useGetAllWorkoutClassQuery } from '@/redux/fetures/Specialist/workoutClass';
import url from '@/redux/api/baseUrl';
import moment from 'moment/moment';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';

const { p, Text, Paragraph } = Typography;

const WorkoutSpecialistClass = () => {

  const { data } = useGetAllWorkoutClassQuery();
  const fullData = data?.data?.attributes;
  console.log(fullData);



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex lg:flex-row flex-col items-start gap-6">
        {/* Left Panel: Trainer Info */}
        <div className="w-64 bg-white rounded-md shadow p-4">
          <img
            // src="trainer_image_url_here" // Update with actual trainer image URL
            src={url + fullData?.specialistInfo?.profileImage?.imageUrl}
            alt="Trainer"
            className="w-full h-auto object-cover rounded-md mb-4"
          />
          <div className="text-center mb-4">
            <p className="text-lg font-semibold capitalize">{fullData?.specialistInfo?.name}</p>
            {/* <p type="secondary" className="text-xs">New Yorke, America</p> */}
          </div>
          {
            fullData?.specialistInfo?.profileId?.protocolNames?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-2">

                {
                  fullData?.specialistInfo?.profileId?.protocolNames?.map((role, index) => (
                    <span
                      key={index}
                      className="text-xs border border-gray-300 px-2 py-1 rounded-md"
                    >
                      {role}
                    </span>
                  ))
                }
              </div>
            )
          }
          <p className="text-xs text-gray-600 ">
            {fullData?.specialistInfo?.profileId?.description || "No description provided."}
          </p>
        </div>

        {/* Right Panel: Available Workouts */}
        <div className="flex-1 bg-white rounded-md shadow p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <p className="text-2xl font-semibold">Available Workout Schedule</p>
            <Link href="/specialistDs/workoutClass/create" className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
            >
              <PlusCircleOutlined />
              Create New
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {
              fullData?.results.map((item, index) => (
                <div className="space-y-5 border border-gray-200 rounded-md p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Icon Placeholder */}
                  <div className="mb-4 flex items-start justify-between gap-5 ">
                    <LuMonitorPlay className="text-6xl text-gray-800" />
                    <Link href={`/specialistDs/workoutClass/update?id=${item?._id}`}>
                      <FaRegEdit className='text-green-500 text-4xl cursor-pointer' />
                    </Link>
                  </div>

                  {/* Workout Title */}
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">{item?.scheduleName}</p>
                    <p className="text-lg flex items-center gap-2 font-semibold text-red-600">
                      ${item?.price} <span className="line-through text-gray-500">$200</span>
                    </p>
                  </div>

                  {/* Session and Duration Info */}
                  {/* <div className="flex justify-between mb-4">
                    <p className="text-sm text-gray-600">Total Session: <strong>{item?.bookingCount}</strong></p>
                    <p className="text-sm text-gray-600">Total Duration: <strong>4h</strong></p>
                  </div> */}

                  {/* Start Date and Platform */}
                  <div className="grid grid-cols-2 gap-4 text-base text-gray-600 mb-4">
                    <p><strong>Start Date:</strong> {moment(item?.startTime).format('DD MMM YYYY')}</p>
                    <p className='capitalize'><strong>Platform:</strong> {item?.typeOfLink}</p>
                  </div>

                  {/* Start and End Time */}
                  <div className="grid grid-cols-2 gap-4 text-base text-gray-600 mb-4">
                    <p><strong>Start Time:</strong> {moment(item?.startTime).format('hh:mm A')}</p>
                    <p><strong>End Time:</strong> {moment(item?.endTime).format('hh:mm A')}</p>
                  </div>

                  {/* Description */}
                  <p className="text-base text-gray-500 mb-4">
                    {item?.description?.length > 100 ? item?.description?.slice(0, 100) + '...' : item?.description}
                  </p>

                  {/* Booking Info */}
                  <div className="flex justify-between items-center mb-4">
                    <p className={` text-xl font-semibold underline capitalize ${item?.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>{item?.status}</p>
                    <tag className={`text-base font-semibold  px-2 py-1 rounded-md capitalize ${item?.sessionType !== 'private' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}>{item?.sessionType}</tag>
                  </div>

                  <span className='mt-2 block text-red-600 font-semibold'>{item?.bookingCount} Booked</span>

                  <Link href={item?.meetingLink} className="text-xl flex items-center cursor-pointer gap-2 text-purple-700  mb-4">
                    <IoDocumentTextOutline /> {item?.meetingLink?.slice(0, 40) + '...'}
                  </Link>

                </div>
              ))
            }
            {/* Workout Session Card */}

          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkoutSpecialistClass;
