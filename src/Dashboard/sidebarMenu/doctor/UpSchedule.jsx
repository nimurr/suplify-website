"use client"

import React from 'react';
import { Card, Typography, Badge, Tooltip } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, LinkOutlined, CopyOutlined } from '@ant-design/icons';
import { useGetUpcommingSchedulesQuery } from '@/redux/fetures/doctor/doctor';
import moment from 'moment';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function UpcomingSchedule() {
  const schedules = [
    {
      id: 1,
      title: 'Schedule 1',
      price: '180$',
      status: '10 Minute left',
      bookedBy: 'Mahmud',
      date: '12-Jan-2025, Saturday',
      startTime: '10 : 00 pm',
      endTime: '11 : 00 pm',
      description: 'This description is very important for a user, they can Acknowledge the full program on this schedule. This description is very important for',
      meetingType: 'Zoom meeting',
      link: 'https://www.youtube.com/watch?...'
    },
    {
      id: 2,
      title: 'Schedule 2',
      price: '180$',
      status: 'After 1 Day',
      bookedBy: 'Mahmud',
      date: '12-Jan-2025, Saturday',
      startTime: '10 : 00 pm',
      endTime: '11 : 00 pm',
      description: 'This description is very important for a user, they can Acknowledge the full program on this schedule. This description is very important for',
      meetingType: 'Zoom meeting',
      link: 'https://www.youtube.com/watch?...'
    },
    {
      id: 3,
      title: 'Schedule 3',
      price: '180$',
      status: 'After 2 Days',
      bookedBy: 'Mahmud',
      date: '12-Jan-2025, Saturday',
      startTime: '10 : 00 pm',
      endTime: '11 : 00 pm',
      description: 'This description is very important for a user, they can Acknowledge the full program on this schedule. This description is very important for',
      meetingType: 'Zoom meeting',
      link: 'https://www.youtube.com/watch?...'
    }
  ];

  const { data, isLoading } = useGetUpcommingSchedulesQuery();
  const upcomingSchedules = data?.data?.attributes || [];
  console.log(upcomingSchedules);

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    // You could add a notification here
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {
        isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )
      }

      <div className="flex justify-between items-center mb-4">
        <Title level={4} className="m-0">Upcoming Schedule</Title>
        <Text className="font-medium">Total Upcoming Schedule : {upcomingSchedules?.length}</Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingSchedules?.map((schedule) => (
          <Card
            key={schedule.id}
            className="border border-red-100 rounded-lg bg-red-50"
            bodyStyle={{ padding: '1rem' }}
          >
            <div className="flex justify-between items-start mb-1">
              <Title level={5} className="m-0 capitalize text-xl">{schedule?.doctorSchedule?.scheduleName}</Title>
              <div className="text-red-600 font-semibold">
                {schedule?.price}$ <Text delete type="secondary" className="ml-1">{schedule?.doctorSchedule?.oldPrice}</Text>
              </div>
            </div>
            <p className='text-red-600 font-semibold text-center'>{schedule?.remainingText}</p>


            <div className="mb-4">
              <Text className="block font-semibold text-center text-xl">Booked by {schedule?.patient?.name}</Text>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <p>Status </p>
              <Text className={`font-semibold capitalize ${schedule.paymentStatus !== 'unpaid' ? 'text-green-600' : 'text-red-600'}`}>{schedule.paymentStatus}</Text>
            </div>
            <div className='flex items-center justify-between gap-2'>
              <div className="flex items-center mb-2">
                <CalendarOutlined className="text-gray-500 mr-2" />
                <Text className="text-gray-500">Date</Text>
              </div>
              <div className="ml-6 mb-3">
                <span>{moment(schedule.scheduleDate).format('dddd, MMMM Do YYYY')}</span>
              </div>
            </div>

            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <ClockCircleOutlined className="text-gray-500 mr-2" />
                <Text className="text-gray-500">Start Time</Text>
              </div>
              <span className=" ">{moment(schedule.startTime).format('hh:mm A')}</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <ClockCircleOutlined className="text-gray-500 mr-2" />
                <Text className="text-gray-500">End Time</Text>
              </div>
              <span className="ml-6">{moment(schedule.endTime).format('hh:mm A')}</span>
            </div>

            <div className="mb-4">
              <span className="text-gray-700 text-sm">
                {schedule?.doctorSchedule?.description?.length > 100
                  ? `${schedule.doctorSchedule.description.slice(0, 100)}...`
                  : schedule?.doctorSchedule?.description}
              </span>

            </div>

            <div className="mb-2">
              <Link href={schedule?.doctorSchedule?.meetingLink} className="text-gray-500 text-sm cursor-pointer">Type of link : {schedule?.doctorSchedule?.typeOfLink}</Link>
            </div>

            <div className="flex items-center">
              <Text className="text-blue-500 text-sm mr-1">link : </Text>
              <Link href={schedule?.doctorSchedule?.meetingLink} className="text-blue-500 text-sm truncate flex-1">
                {schedule?.doctorSchedule?.meetingLink}
              </Link>
              <Tooltip title="Copy link">
                <CopyOutlined
                  className="text-gray-500 cursor-pointer ml-2"
                  onClick={() => handleCopyLink(schedule?.doctorSchedule?.meetingLink)}
                />
              </Tooltip>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}