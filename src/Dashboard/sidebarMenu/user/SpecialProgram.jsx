"use client";

import React, { useState } from "react";
import { Card, Button, Tooltip } from "antd";
import { ClockCircleOutlined, CalendarOutlined, LeftOutlined, LaptopOutlined } from "@ant-design/icons";

import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomButton from "@/components/customComponent/CustomButton";
import { useGetTrainingProgramsQuery } from "@/redux/fetures/patient/specialist";
import { IoPaperPlaneSharp } from "react-icons/io5";



const SpecialistProgram = ({ id }) => {

  const { data: program, isLoading } = useGetTrainingProgramsQuery(id)
  const fullData = program?.data?.attributes?.result?.results;
  const specialistInfo = program?.data?.attributes?.specialistInfo;

  console.log(specialistInfo);

  console.log(id)
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = useState(0);
  const back = () => {
    router.push('/dashboard/specialist')
  }



  return (
    <div className="flex items-center gap-10">
      {
        specialistInfo && (
          <div
            key={specialistInfo.id}
            className="bg-white border  rounded-lg shadow-sm p-4 max-w-xs w-full"
          >
            <img
              src={specialistInfo?.profileImage?.imageUrl}
              alt={specialistInfo.name}
              width="100%"
              height={350}
              style={{ objectFit: "cover", borderRadius: "8px" }}
              preview={false}
            />
            <h3 className="mt-4 font-semibold text-lg">{specialistInfo.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {specialistInfo?.profileId?.description?.length > 100 ? `${specialistInfo?.profileId?.description.slice(0, 100)}...` : spec?.specialistId?.profileId?.description}
            </p>
            <div className="flex items-center gap-2 text-sm flex-wrap mb-1">
              {
                specialistInfo?.profileId?.protocolNames?.map((program, index) => (
                  <span key={index} className="border px-2 py-1 rounded-full text-gray-600">
                    {program}
                  </span>
                )) || 'No Programs Available' // Optionally handle if howManyPrograms is empty or undefined
              }
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
              <LaptopOutlined />
              {
                specialistInfo?.profileId?.howManyPrograms
              }
              <span>Programs</span>
            </div>

            <button className=" py-2 w-full bg-red-600 text-white rounded-md flex items-center justify-center gap-2"><IoPaperPlaneSharp className="text-2xl" /> Message </button>

          </div>
        )
      }



      <div>
        <h1 className='text-2xl font-semibold items-center gap-2 mb-6 mt-6'>
          <LeftOutlined onClick={() => back()} className='cursor-pointer' />
          View Full Program
        </h1>
        <div className="p-4 border border-blue-200 rounded-lg overflow-auto">
          {isLoading && (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
            </div>
          )}
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-4">
            {fullData?.map((item, index) => (
              <Card
                key={index}
                hoverable
                className={`border ${index === selectedIndex
                  ? "border-blue-500 shadow-lg"
                  : "border-gray-200"
                  } rounded-md`}
                cover={
                  <img
                    alt="program"
                    src={item?.attachmentDetails[0]?.attachment}
                    className="w-full object-cover rounded-t-md"
                  />
                }
                onClick={() => setSelectedIndex(index)}
              >
                <h3 className="font-semibold text-base mb-2">{item?.programName}</h3>


                <div className="flex items-center justify-between gap-5">
                  <span className="text-xs text-gray-600">
                    <Tooltip title="Sessions">
                      <CalendarOutlined className="text-gray-500 text-xl" />
                    </Tooltip>
                    {item?.totalSessionCount} Session
                  </span>
                  <span className="ml-auto font-semibold">{item?.price}$</span>
                </div>

                <div className="flex items-center space-x-2 my-3">
                  <Tooltip title="Duration">
                    <ClockCircleOutlined className="text-gray-500 text-xl" />
                  </Tooltip>
                  <span className="text-xs text-gray-600 mr-3 font-semibold">{item?.durationInMonths}</span>
                </div>

                {item?.isPurchased === true ? (

                  <Button
                    type="default"
                    block
                    onClick={() => router.push(`/dashboard/specialist/specialist-details?id=${id}&programId=${item?._id}`)}
                    className="border-red-300 mt-5 text-red-500 hover:text-white hover:bg-red-500"
                  >
                    Start
                  </Button>

                ) : (
                  <CustomButton
                    text="Buy"
                    className="mt-5"
                  />
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistProgram;
