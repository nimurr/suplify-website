"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, Button, Tag, List, Modal, Image } from "antd";
import { CheckCircleOutlined, PlayCircleOutlined, CloseOutlined, LeftOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetFullPatientStatusDataForSpecialistQuery } from "@/redux/fetures/patient/specialist";

export default function SpecialistProgramDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const programId = searchParams.get("programId");
  const [selectItem, setSelectItem] = useState(null);

  // Fetch data using the API
  const { data, error, isLoading } = useGetFullPatientStatusDataForSpecialistQuery({
    trainingProgramId: programId,
    specialistId: id,
  });

  // Extract session details from the API response
  const mainFullData = data?.data?.attributes?.result?.results;
  const specialistInfo = data?.data?.attributes?.specialistInfo;

  console.log(mainFullData);
  console.log(specialistInfo);

  // State variables for managing session and modal visibility
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false);
  const [selectModalVideo, setSelectModalVideo] = useState(null);
  const videoRef = useRef(null);

  // Get selected session from the session list
  const selectedSession = mainFullData?.find((session) => session._TrainingSessionId === selectedId);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectModalVideo(null); // Reset video when modal closes
  };

  const handleVideoEnded = () => {
    // Close the video modal and show the congratulations modal
    setIsModalOpen(false);
    setIsCongratsModalOpen(true);
  };

  const handleCongratsClose = () => {
    setIsCongratsModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl font-semibold flex items-center gap-2 my-12">
        <LeftOutlined onClick={() => router.back()} className="cursor-pointer" />
        View Full Program Session
      </h1>

      <div className="grid lg:grid-cols-4 items-start gap-2">
        {/* Specialist Info Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <Image
            src={specialistInfo?.profileImage.imageUrl}
            alt={specialistInfo.name}
            layout="fill"
            objectFit="cover"
          />
          <h2 className="text-2xl font-semibold mt-4">{specialistInfo.name}</h2>
          <p className="text-gray-500 mt-1">{specialistInfo.profileId.address}</p>

          <div className="grid md:grid-cols-2 gap-2 mt-3">
            {specialistInfo?.profileId?.protocolNames?.map((role, i) => (
              <div key={i} className="">
                <Tag className="text-black text-xs font-medium rounded-lg py-1 border border-gray-300">{role}</Tag>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-sm  my-4">{specialistInfo?.profileId.description}</p>

          <div className="w-full space-y-3 text-sm font-semibold text-gray-800">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span>Programs</span>
              <span>{specialistInfo?.profileId.howManyPrograms}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span>Protocol</span>
              <span>{specialistInfo?.profileId.howManyProtocol}</span>
            </div>
          </div>
        </div>

        {/* Session List Panel */}
        <div className="md:col-span-2 bg-white capitalize rounded-lg shadow px-4">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-xl">Gain chest</h2>
            <div className="text-xs text-gray-500">
              Total Session: {mainFullData?.length} | Complete Session:{" "}
              {mainFullData?.filter((s) => s.status === "complete").length}
            </div>
          </div>

          <List
            dataSource={mainFullData}
            itemLayout="horizontal"
            split={false}
            className="overflow-auto"
            renderItem={(item) => {
              const isSelected = item._TrainingSessionId === selectItem?._TrainingSessionId;
              const baseBorder = "border rounded-lg p-3 cursor-pointer flex items-center";
              const borderColor = isSelected
                ? "border-red-300 bg-gray-100"
                : "border-gray-200 bg-gray-100 hover:border-red-300";
              return (
                <List.Item
                  key={item._TrainingSessionId}
                  onClick={() => {
                    setSelectedId(item._TrainingSessionId);
                    setSelectModalVideo(item);
                    setSelectItem(item);
                  }}
                  className={`${baseBorder} ${borderColor} mb-3`}
                >
                  <List.Item.Meta
                    avatar={
                      <div className=" p-2 rounded-md flex items-center gap-2">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden ml-4">
                          <video
                            className="w-full h-full object-cover"
                            src={item?.attachments[0]?.attachment}
                            muted
                            poster={item?.coverPhotos[0]?.attachment}
                            preload="metadata"
                            controls={false}
                          >
                            Your browser does not support the video tag.
                          </video>
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <PlayCircleOutlined className="text-white text-xl" />
                          </div>
                        </div>
                        <p>{item?.title}</p>
                      </div>
                    }
                  />
                  <div className="ml-auto text-xs mr-4">
                    {!item.unlockDateForPatient || new Date(item?.unlockDateForPatient) < new Date() ? (
                      <Button
                        type="primary"
                        className="h-10"
                        danger
                        icon={<PlayCircleOutlined />}
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectModalVideo(item);
                          showModal();
                        }}
                      >
                        Play
                      </Button>
                    ) : (
                      <Button className="h-10" type="default" icon={<PlayCircleOutlined />} size="small" disabled>
                        Play
                      </Button>
                    )}
                  </div>
                </List.Item>
              );
            }}
          />
        </div>

        {/* Right Panel with Session Details */}
        {selectItem ? (
          <div className="bg-white rounded-lg shadow capitalize px-6 py-3">
            <h3 className="font-semibold text-lg mb-5 text-center">Details Session</h3>

            <div className="relative mb-5">
              <img
                src={selectItem?.coverPhotos[0]?.attachment} // Replace with your image path
                alt={selectedId?.title}
                className="rounded-md w-full h-48 object-cover"
              />
            </div>

            <div className="mb-4">
              <h4 className="font-semibold">Title</h4>
              <p className="font-semibold">{selectItem?.title}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold">Duration</h4>
              <p>{selectItem?.duration + selectItem?.durationUnit || "0 minute/day"}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold">Benefits</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                {selectItem?.benefits?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <Button
                type="default"
                icon={<CheckCircleOutlined />}
                className="border border-green-300 text-green-600 rounded-md w-full"
              >
                Complete
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-blue-500 border rounded-lg border-gray-200 p-5 text-center">Please Select a Item </p>
        )}
      </div>

      {/* Video Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false); // Close the modal
          setSelectModalVideo(null); // Reset the selected video
        }}
        footer={null}
        width={1200}
        closeIcon={<CloseOutlined onClick={() => {
          setIsModalOpen(false); // Close the modal
          setSelectModalVideo(null); // Reset the selected video
        }} />}
        centered
      >
        <div className="aspect-video bg-black rounded-lg w-full overflow-hidden">
          <video
            ref={videoRef}
            key={selectModalVideo?._TrainingSessionId} // Ensure the video reloads on new selection
            controls
            className="w-full h-full"
            autoPlay
            muted
            onEnded={handleVideoEnded}
          >
            <source src={selectModalVideo?.attachments[0]?.attachment} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold text-lg mb-2">{selectedSession?.title}</h4>
        </div>
      </Modal>

    </div>
  );
}