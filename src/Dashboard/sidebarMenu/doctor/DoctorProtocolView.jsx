'use client'
import React, { useState, useEffect } from "react";
import { Card, Button, Avatar, Input, Modal, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import CustomButton from "@/components/customComponent/CustomButton";
import BackHeader from "@/components/customComponent/BackHeader";
import { FiPlusCircle } from "react-icons/fi";
import { useAssignProtocolToPatientMutation, useAssignSpecialistPatientMutation, useGetAllProtocalsByPatientIdQuery, useGetAllSpacialistQuery } from "@/redux/fetures/doctor/doctor";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import url from "@/redux/api/baseUrl";

const { TextArea } = Input;

const DoctorProtocolPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [specialist, setSpecialist] = useState();

  // Get patientId from URL
  const urlParams = new URLSearchParams(window.location.search);
  const patientId = urlParams.get("patientId");

  // Fetch patient protocols and specialists using redux hooks
  const { data: patientData, isLoading: isPatientDataLoading, refetch } = useGetAllProtocalsByPatientIdQuery(patientId);
  const { data: specialistData, isLoading: isSpecialistDataLoading } = useGetAllSpacialistQuery(patientId);

  const fullPatientData = patientData?.data?.attributes || [];
  const fullSpecialistData = specialistData?.data?.attributes || [];

  // Mutation for assigning protocol to patient
  const [assignSpecialist] = useAssignSpecialistPatientMutation();
  const [assignProtocol] = useAssignProtocolToPatientMutation();

  useEffect(() => {
    // You could trigger any data refetch or additional setup here
    if (!patientId) {
      console.log("No patientId found in URL");
    }
    refetch();
  }, [patientId]);

  const handleAssignSpecialist = async () => {
    const data = {
      patientId: patientId,
      specialistId: specialist,
    };

    try {
      const res = await assignSpecialist(data);
      if (res?.data?.code == 200) {
        toast.success(res?.data?.message);
        setIsModalVisible(false);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.error("Error assigning specialist:", error);
      toast.error("Failed to assign specialist");
    }
  };

  const handleCreateNewProtocol = async () => {
    const data = { patientId: patientId };

    try {
      const res = await assignProtocol(data);
      if (res?.data?.code == 200) {
        toast.success(res?.data?.message);
        window.location.href = `/doctorDs/doctor-protocol/create-plane?protocolId=${res?.data?.data?.attributes?._protocolId}&patientId=${patientId}`;
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.error("Error creating new protocol:", error);
      toast.error("Failed to create protocol");
    }
  };



  return (
    <div>
      <Toaster />
      <BackHeader title={"Back"} />

      <div className="flex lg:flex-row flex-col gap-6 p-6 bg-gray-50 min-h-screen">
        {/* Left Sidebar */}
        {
          isPatientDataLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 md:w-72 w-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Avatar
                  size={60}
                  src={url + fullPatientData?.extraNote?.patientId?.profileImage?.imageUrl}
                  alt="Mahmud"
                />
                <span className="font-semibold capitalize text-sm">{fullPatientData?.extraNote?.patientId?.name || "No name found"}</span>
              </div>
              <div className="mb-1 text-sm font-semibold">Extra Note</div>
              <p className="text-xs text-gray-500 mb-4">
                {fullPatientData?.extraNote?.extraNote || "No note found"}
              </p>
              <TextArea
                rows={6}
                placeholder="Type your note ..."
                className="resize-none rounded-md border border-gray-300"
              />
              <button className="bg-red-600 text-white py-2 px-6 rounded-lg mt-3">Save</button>
            </div>
          )
        }

        {/* Right Content */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2>All Protocol</h2>
            <div className="flex gap-2">
              <button
                disabled
                onClick={() => setIsModalVisible(true)}  // Show modal on click
                className={`bg-red-600 text-white py-2 px-6 rounded-lg disabled:bg-red-300 disabled:cursor-not-allowed flex items-center gap-2`}
              >
                Assign a Specialist
              </button>
              <button onClick={handleCreateNewProtocol} className="bg-red-600 text-white py-2 px-6 rounded-lg flex items-center gap-2">
                <FiPlusCircle /> Create New
              </button>
            </div>
          </div>

          {/* Loading States */}
          {isPatientDataLoading || isSpecialistDataLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {fullPatientData?.results?.map(({ id, name, _protocolId }) => (
                <Card
                  key={id}
                  hoverable
                  bodyStyle={{ padding: "12px 16px" }}
                  className="rounded-lg shadow"
                >
                  <Card.Meta
                    title={<div className="truncate font-semibold text-sm capitalize">{name}</div>}
                    description={<div className="text-xs text-gray-600" />}
                  />
                  <Link href={`/doctorDs/doctor-protocol/create-plane?protocolId=${_protocolId}&patientId=${patientId}`} className="bg-red-600 w-full text-white py-2 px-6 rounded-lg mt-5 text-center flex items-center justify-center" size="small">
                    <EditOutlined /> Edit
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Assign Specialist Modal */}
      <Modal
        title="Assign a Specialist"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}  // Close modal
        footer={null}  // No default footer
        width={400}
      >
        <div>
          <div className="mb-4">
            <Select
              value={specialist}
              onChange={(value) => setSpecialist(value)}
              style={{ width: "100%" }}
              placeholder="Select Specialist"
            >
              {fullSpecialistData?.map((specialist) => (
                <Select.Option key={specialist?.profile._id} value={specialist?.profile._id}>
                  {specialist.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <Button
            type="primary"
            block
            className="bg-red-600 text-white"
            onClick={handleAssignSpecialist}
          >
            Assign a Specialist
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorProtocolPage;
