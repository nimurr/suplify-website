"use client";

import React, { useState } from "react";
import { Card, Button, Tooltip, Modal } from "antd";
import { ClockCircleOutlined, CalendarOutlined, LeftOutlined, LaptopOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomButton from "@/components/customComponent/CustomButton";
import { useGetTrainingProgramsQuery } from "@/redux/fetures/patient/specialist";
import { IoPaperPlaneSharp } from "react-icons/io5";
import url from "@/redux/api/baseUrl";
import { useCreateNewChatMutation } from "@/redux/fetures/messaging/createChat";
import toast, { Toaster } from "react-hot-toast";

const SpecialistProgram = ({ id }) => {

  const { data: program, isLoading } = useGetTrainingProgramsQuery(id);
  const fullData = program?.data?.attributes?.result?.results;
  const specialistInfo = program?.data?.attributes?.specialistInfo;

  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);  // Track selected program for modal details

  const back = () => {
    router.push('/dashboard/specialist');
  };

  const [createNewChat] = useCreateNewChatMutation();

  const handleCreatNewMessage = async () => {
    const data = {
      participants: [id],
      message: "Conversation started ..."
    };

    try {
      const res = await createNewChat(data).unwrap();
      if (res?.code === 200) {
        toast.success(res?.message);
        router.push(`/chat/${res?.data?.attributes?._conversationId}`);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // Open the modal with full details
  const handleProgramClick = (program) => {
    console.log(program);
    setSelectedProgram(program);
    setIsModalVisible(true);
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex items-start flex-wrap lg:flex-nowrap gap-10">
      <Toaster />
      {
        specialistInfo && (
          <div
            key={specialistInfo.id}
            className="bg-white border rounded-lg shadow-sm p-4 max-w-xs w-full"
          >
            <img
              src={specialistInfo?.profileImage?.imageUrl.includes('amazonaws') ? `${specialistInfo?.profileImage?.imageUrl}` : url + specialistInfo?.profileImage?.imageUrl}
              alt={specialistInfo.name}
              width="100%"
              height={350}
              className="max-h-[250px] min-h-[250px]"
              style={{ objectFit: "cover", borderRadius: "8px" }}
              preview={false}
            />
            <h3 className="mt-4 font-semibold text-lg">{specialistInfo?.name}</h3>
            <h3 className="mb-2 ">{specialistInfo?.profileId?.description}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {specialistInfo?.profileId?.description?.length > 100 ? `${specialistInfo?.profileId?.description.slice(0, 100)}...` : specialistInfo?.specialistId?.profileId?.description}
            </p>
            <div className="flex items-center gap-2 text-sm flex-wrap mb-1">
              {
                specialistInfo?.profileId?.protocolNames?.map((program, index) => (
                  <span key={index} className="border px-2 py-1 rounded-full text-gray-600">
                    {program}
                  </span>
                )) || 'No Programs Available'
              }
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
              <LaptopOutlined />
              {specialistInfo?.profileId?.howManyPrograms}
              <span>Programs</span>
            </div>

            <button onClick={handleCreatNewMessage} className=" py-2 w-full bg-red-600 text-white rounded-md flex items-center justify-center gap-2"><IoPaperPlaneSharp className="text-2xl" /> Message </button>
          </div>
        )
      }

      <div className="w-full">
        <h1 className='text-2xl font-semibold items-center gap-2 mb-6 mt-6'>
          <LeftOutlined onClick={() => back()} className='cursor-pointer' />
          View Full Program
        </h1>
        {isLoading && (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
          </div>
        )}
        {
          fullData?.length > 0 && (
            <div className="p-4 border border-blue-200 rounded-lg overflow-auto">
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-4">
                {fullData?.map((item, index) => (
                  <div  >
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
                          onClick={() => handleProgramClick(item)}
                          src={item?.attachmentDetails[0]?.attachment}
                          className="w-full object-cover rounded-t-md max-h-[250px] min-h-[250px]"
                        />
                      }
                    // Handle program click to show modal
                    >
                      <h3 className="font-semibold text-base mb-2">{item?.programName?.length > 100 ? `${item?.programName?.slice(0, 100)}...` : item?.programName}</h3>

                      <div className="flex items-center justify-between gap-5">
                        <span className="text-xs text-gray-600 flex items-center gap-1">
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
                        <span className="text-xs text-gray-600 mr-3 font-semibold">{item?.durationInMonths} Month</span>
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
                  </div>
                ))}
              </div>
            </div>
          )
        }
        <div className="w-full flex justify-center border border-gray-100 p-2 rounded-lg">
          {
            fullData?.length === 0 && (
              <div className="text-center ">
                <h1 className="py-3 text-red-500 font-semibold">No Programs Found !!</h1>
              </div>
            )
          }
        </div>
      </div>

      {/* Modal to display program full details */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1200}
      >
        <div className="space-y-4">
          <p className="text-2xl font-semibold mb-5">Trailer of Traning Program</p>
          {/* Assuming you have a video URL or source */}
          <div className="w-full">
            {
              selectedProgram?.trailerContentDetails.length > 0 ? (
                <iframe
                  width="100%"
                  height="600"
                  src={selectedProgram?.trailerContentDetails[0]?.attachment?.includes('amazonaws') ? selectedProgram?.trailerContentDetails[0]?.attachment : (url + selectedProgram?.trailerContentDetails[0]?.attachment)}  // Make sure videoUrl is part of your data
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Program Video"
                ></iframe>
              ) :
                <p className="text-center text-red-500 font-semibold">No Trailer Available</p>
            }
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SpecialistProgram;
