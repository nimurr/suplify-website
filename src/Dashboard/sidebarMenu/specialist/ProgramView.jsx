"use client";

import { useEffect, useState } from "react";
import {
  Button,
  InputNumber,
  Tag,
  Typography,
  Divider,
  Space,
  Card,
  Modal,
} from "antd";
import {
  EditOutlined,
  PlusCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { GoPlus } from "react-icons/go";

import BackHeader from "@/components/customComponent/BackHeader";
import CustomButton from "@/components/customComponent/CustomButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllProgramBySpecialistIdQuery } from "@/redux/fetures/Specialist/traningProgram";
import url from "@/redux/api/baseUrl";
import Link from "next/link";

const { Title, Text, Paragraph } = Typography;

export default function ProgramView() {
  const router = useRouter();
  const [sessions, setSessions] = useState([]); // Empty array initially
  const [selectedSession, setSelectedSession] = useState(null); // Null initially
  const [isModalVisible, setIsModalVisible] = useState(false); // State for controlling modal visibility
  const [videoUrl, setVideoUrl] = useState(""); // State for storing the video URL

  const searchParams = useSearchParams();
  const programId = searchParams.get("programId");
  const specialistId = searchParams.get("specialistId");

  // RTK Query call (skip until both params are available)
  const { data, isLoading, isError } = useGetAllProgramBySpecialistIdQuery(
    { programId, specialistId },
    { skip: !programId || !specialistId }
  );

  const programs = data?.data?.attributes || [];
  console.log("Programs:", programs);

  // Update sessions and selectedSession once data is fetched
  useEffect(() => {
    if (programs?.result?.results?.length > 0) {
      setSessions(programs.result.results);
      setSelectedSession(programs.result.results[0]); // Set the first session as the default
    }
  }, [programs]);

  if (isLoading) return <div className="text-center text-blue-500 ">Loading programs...</div>;

  // Function to show the video modal
  const howVideoInaModal = (videoUrl) => {
    setVideoUrl(videoUrl); // Set the video URL
    setIsModalVisible(true); // Show the modal
  };

  // Close modal function
  const handleCancel = () => {
    setIsModalVisible(false);
    setVideoUrl(""); // Clear the video URL when the modal is closed
  };
  console.log(selectedSession?.attachments[0]?.attachment);

  return (
    <div>
      <BackHeader title={"Session"} />
      <div className="min-h-screen flex items-start xl:flex-row flex-col gap-5 p-6 bg-gray-50">
        {/* Left Panel: Trainer Info */}
        <div className="w-64  bg-white rounded-md shadow p-4 flex flex-col items-center gap-4">
          <img
            src={programs?.specialistInfo?.profileImage?.imageUrl?.includes("amazonaws")
              ? programs?.specialistInfo?.profileImage?.imageUrl
              : url + programs?.specialistInfo?.profileImage?.imageUrl}
            alt="Trainer"
            className="  rounded-lg object-cover"
          />
          <div className="text-center">
            <Title level={5} className="mb-0">{programs?.specialistInfo?.name}</Title>
            <Text type="secondary" className="text-xs">{programs?.specialistInfo?.profileId?.address}</Text>
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            {programs?.specialistInfo?.profileId?.protocolNames?.map((name, index) => (
              <Tag key={index} color="default" className="text-xs">
                {name}
              </Tag>
            ))}
          </div>
          <Divider className="my-2" />
          <Paragraph className="text-xs px-2 text-gray-600">
            {programs?.specialistInfo?.profileId?.description.length > 100
              ? `${programs?.specialistInfo?.profileId?.description.slice(0, 100)}...`
              : programs?.specialistInfo?.profileId?.description}
          </Paragraph>

          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between">
              <Text>Programs</Text>
              <InputNumber min={0} max={100} defaultValue={programs?.specialistInfo?.profileId?.howManyPrograms} size="small" />
            </div>
          </div>

          <button className="bg-red-600 hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition gap-2 w-full text-center flex items-center justify-center" type="primary" block >
            Save
          </button>
        </div>

        {/* Middle Panel: Sessions List */}
        <div className="flex-1 bg-white rounded-md shadow p-6 flex flex-col">
          <div className="md:flex justify-between items-center mb-6">
            <div>
              <h2 level={5} className="mb-0 font-semibold">{programs?.trainingProgramInfo?.programName.length > 50 ? `${programs?.trainingProgramInfo?.programName.slice(0, 50)}...` : programs?.trainingProgramInfo?.programName}</h2>
            </div>
            <div>
              <p className="text-xs">
                Total Session : {programs?.result?.results?.length}
              </p>
            </div>
            <div>
              <Link href={`/specialistDs/program/create-session?programId=${programId}`} className="text-xs ml-2 bg-red-600 hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition flex items-center gap-2"><GoPlus className="text-2xl" /> Create Session</Link>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            {sessions?.map((session, idx) => (
              <Card
                key={idx}
                hoverable
                className="gap-4 w-full"
                onClick={() => setSelectedSession(session)}
              >
                <div className="flex justify-between w-full gap-4">
                  <img
                    src={session.coverPhotos[0]?.attachment}
                    alt={session.exercise}
                    className="w-20 h-16 object-cover rounded"
                  />
                  <div className="flex w-full justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">
                        Session :  {session.sessionCount}
                      </p>
                      <p className="my-2 text-xl font-semibold">
                        {session.title}
                      </p>
                      <Space size="small" className="text-xs text-gray-600">
                        <Text><span className="font-semibold">Duration :</span> {session.duration}</Text>
                        <Text>{session.durationUnit}</Text>
                      </Space>
                    </div>
                    <div>
                      <Button
                        icon={<EditOutlined />}
                        // go this route edit-session
                        onClick={() => router.push(`/specialistDs/program/edit-session?sessionId=${session._TrainingSessionId}&programId=${programId}`)}
                        size="small"
                        className="flex justify-end"
                        danger
                        type="default"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Panel: Session Details */}
        {selectedSession && (
          <div className="w-80 bg-white rounded-md shadow p-4 flex flex-col">
            <>
              <div className="cursor-pointer" onClick={() => howVideoInaModal(selectedSession.videoUrl)}>
                <img
                  src={selectedSession?.coverPhotos[0]?.attachment}
                  alt={selectedSession.tokenCount}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              </div>
              <div>
                <Text type="secondary" className="text-[18px] ">
                  Session :  {selectedSession.sessionCount}
                </Text>
                <Title level={5} className="mb-0 text-[22px]">
                  {selectedSession.title}
                </Title>
                <Space size="small" className="text-xs text-gray-600">
                  <Text><span className="font-semibold">Duration :</span> {selectedSession.duration}</Text>
                  <Text>{selectedSession.durationUnit}</Text>
                </Space>
              </div>

              <Text className="mt-2" strong>Benefits</Text>
              <ul className="list-disc space-y-2 mt-2 list-inside text-xs text-gray-700 mb-4">
                {
                  selectedSession.benefits.map((benefit, index) => (
                    <li className="flex items-center" key={index}>
                      <CheckOutlined className="text-green-500 mr-1" /> {benefit}
                    </li>
                  ))
                }
              </ul>

              <Button
                icon={<EditOutlined />}
                size="small"
                danger
                type="default"
                className="mt-auto h-14"
              >
                Edit
              </Button>
            </>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <Modal
        title="Session Video"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <iframe
            width="100%"
            height="500"
            src={selectedSession?.attachments[0]?.attachment}
            title="Session Video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </div>
  );
}
