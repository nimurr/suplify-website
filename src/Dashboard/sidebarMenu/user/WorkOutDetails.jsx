"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Button, Image } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookNowSheduleWorkoutClassMutation, useGetAllScheduleWorkoutClassQuery } from "@/redux/fetures/patient/specialist";
import moment from "moment";
import Link from "next/link";
import toast from "react-hot-toast";
import url from "@/redux/api/baseUrl";
import { IoDocumentTextOutline } from "react-icons/io5";

// Schedule card component
const ScheduleCard = ({ schedule }) => {

  const [bookNow] = useBookNowSheduleWorkoutClassMutation();
  console.log(schedule)

  const id = schedule._id;

  const handleBookNow = async () => {
    try {
      const res = await bookNow(id).unwrap();
      console.log(res);
      if (res?.code == 200) {
        toast.success(res?.message);
        if (res?.data?.attributes?.url) {
          window.location.href = `${res?.data?.attributes?.url}`;
        }
      }
      else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">

      {/* apply this component only here  */}
      <div className="p-4 flex flex-col justify-between h-full">
        {/* Video icon and workout title */}
        <div className="flex justify-between items-start mb-3">
          <div className=" items-center gap-2">
            <div className="bg-gray-100 w-14 h-14 flex items-center justify-center p-2 rounded-md">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        <p className='flex items-center justify-between capitalize my-2'>
          <strong>Schedule Type:</strong> <span className={`border px-2 py-1 text-sm rounded-full ${schedule.scheduleType == "oneTime" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>{schedule.scheduleType == "oneTime" ? "One Time" : "Repeat"}</span>
        </p>
        <hr />

        {/* Conditional Rendering */}
        {schedule.scheduleType === 'repeat' && schedule.repeatRule && (
          <div className="text-gray-600 mb-4">
            <p className='flex items-center justify-between my-2'>
              <strong>Start Date:</strong> {moment(schedule.scheduleDate).format('DD MMM YYYY')}
            </p>
            <p className='flex items-center justify-between my-2'>
              <strong>End Date :</strong> {moment(schedule.repeatRule?.endDate).format('DD MMM YYYY')}
            </p>

            <p className='flex items-center justify-between my-2'>
              <strong>Start Time:</strong> {moment(schedule.startTime).format('hh:mm A')}
            </p>
            <p className='flex items-center justify-between my-2'>
              <strong>End Time:</strong> {moment(schedule.endTime).format('hh:mm A')}
            </p>
            <p className='flex items-center justify-between my-2'>
              <strong>Duration (weeks):</strong> {schedule.repeatRule.durationWeeks}
            </p>
            <p className='flex items-center justify-between my-2'>
              <strong>Weekdays:</strong>
              <div className='flex items-center gap-2'>
                {schedule?.repeatRule?.weekDays?.map((day) => (
                  <span key={day} className="border px-2 py-1 text-sm rounded-full text-gray-600">
                    {day}
                  </span>
                ))}
              </div>
            </p>
          </div>
        )}
        {
          schedule?.scheduleType === 'oneTime' && (
            <div>
              <p className='flex items-center justify-between my-2'>
                <strong>Schedule Date:</strong> {moment(schedule.scheduleDate).format('DD MMM YYYY')}
              </p>
              <p className='flex items-center justify-between my-2'>
                <strong>Schedule Start Time:</strong> {moment(schedule.startTime).format('hh:mm A')}
              </p>
              <p className='flex items-center justify-between my-2'>
                <strong>Schedule Start Time:</strong> {moment(schedule.endTime).format('hh:mm A')}
              </p>
            </div>
          )
        }

        {schedule.hotspot && schedule?.classType !== 'online' && (
          <div className="text-gray-600 mb-4">
            <hr />
            <p className='flex items-center justify-between my-2'>
              <strong>Hotspot Name:</strong> {schedule.hotspot.name}
            </p>
            <p className='flex items-center justify-between my-2'>
              <strong>Hotspot Address:</strong> {schedule.hotspot.address}
            </p>
            <br />
            {
              schedule.hotspot.attachments?.attachment && (
                <Image className='' width={100} height={100} src={schedule.hotspot.attachments?.attachment?.includes('amazonaws') ? schedule.hotspot.attachments?.attachment : (url + schedule.hotspot.attachments?.attachment)} alt="" />
              )
            }
            <hr />
          </div>
        )}



        {/* {schedule.classType === 'online' && schedule.isPaidByPatient && (
          <div className="text-gray-600 mb-4 ">
            <hr />
            <p className='flex items-center justify-between my-2'>
              <strong>Platform:</strong> {schedule.typeOfLink || 'N/A'}
            </p>
            <Link
              href={schedule?.meetingLink || '#'}
              className="text-base py-2 underline flex mt-2 items-center cursor-pointer gap-2 text-purple-700"
            >
              <IoDocumentTextOutline className="text-xl" /> Go to Meeting Link
            </Link>
            <hr />
          </div>
        )} */}


        {/* Description */}
        <div className="text-xs text-gray-600 mb-4">
          {schedule.description?.length > 300 ? `${schedule.description.slice(0, 300)}...` : schedule.description}
        </div>

        <div className="flex items-center justify-between my-3">
          <p className="underline text-red-500 font-semibold">{schedule?.totalPatientBookings || "0"} Booked</p>
          <span className="bg-red-100 text-red-600 p-2 capitalize rounded-lg">{schedule?.sessionType || "Online"}</span>
        </div>




        {

          schedule?.sessionType == "private" || schedule?.sessionType == "group" && !schedule?.hasPatientBooking ? (
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
            schedule?.hasPatientBooking &&
            schedule?.classType !== "inPerson" &&
            // schedule?.sessionType !== "group" &&
            (
              <Link Link target="_blank" href={`${schedule.meetingLink}`}>
                <button
                  className="h-9 text-purple-700 underline font-semibold italic"
                >
                  Meeting Link
                </button>
              </Link>
            )
        }



        {/* {
          schedule?.sessionType == "group" && !schedule?.hasPatientBooking && !schedule?.isBookedByPatient ? (
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
                className="h-9 text-purple-700"
              >
                {schedule.meetingLink}
              </button>
            </Link>
        } */}

      </div>
    </div >
  );
};

const WorkOutDetails = () => {
  const router = useRouter();
  const perams = useSearchParams();
  const specialistId = perams.get('specialistId');
  const { data, error, isLoading } = useGetAllScheduleWorkoutClassQuery({ specialistId });
  const schedules = data?.data?.attributes?.result?.results;
  const specialistInfo = data?.data?.attributes?.specialistInfo;

  console.log(schedules)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data...</div>;

  return (
    <div className="bg-gray-50 p-4 md:p-6">
      <h1 className='text-2xl font-semibold flex items-center gap-2 my-12'>
        <LeftOutlined onClick={() => router.back()} className='cursor-pointer' />
        View Full Schedule
      </h1>
      <div className="mx-auto">
        {/* Trainer info section */}
        <div className="flex flex-col items-start md:flex-row gap-6 mb-6">
          {/* Trainer image */}
          <div className="w-full bg-white p-2 rounded-lg md:w-1/4 lg:w-1/5">
            <div className="rounded-lg overflow-hidden">
              <img
                src={specialistInfo?.profileImage?.imageUrl?.includes('amazonaws') ? specialistInfo?.profileImage?.imageUrl : url + specialistInfo?.profileImage?.imageUrl}
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
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-gray-600">{specialistInfo?.profileId?.description?.length > 100 ? `${specialistInfo?.profileId?.description.slice(0, 100)}...` : specialistInfo?.profileId?.description}</p>
            </div>
          </div>

          {/* Schedule section */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Available Schedule</h2>
              <span className="text-sm text-gray-600">Total Schedule: {data?.data?.attributes?.result?.results?.length}</span>
            </div>

            {/* Schedule grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedules?.map((schedule, index) => (
                <ScheduleCard key={index} specialistId={specialistId} schedule={schedule} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuspenseWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkOutDetails />
    </Suspense>
  );
};

export default SuspenseWrapper;