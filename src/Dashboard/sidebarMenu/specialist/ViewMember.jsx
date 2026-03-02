"use client";

import React, { useState, useEffect } from "react";
import { Table, Avatar, Pagination, Image } from "antd";  // ✅ Pagination & Image imported
import CustomButton from "@/components/customComponent/CustomButton";
import Link from "next/link";
import BackHeader from "@/components/customComponent/BackHeader";
import { useSpacialistPatientByIdQuery, useSpacialistPotentialPatientQuery } from "@/redux/fetures/Specialist/specialist";
import url from "@/redux/api/baseUrl";
import { useSearchParams } from "next/navigation";
import { useGetClientDocForDoctorQuery } from "@/redux/fetures/information/myDocuman";

// Protocol card component
const ProtocolCard = ({ protocol, selectedId, patientId }) => (
  <div
    className={`bg-white border rounded-md overflow-hidden shadow-sm ${
      selectedId === protocol._id ? "border-4 border-blue-500" : ""
    }`}
  >
    <div className="p-3">
      <h3 className="font-medium text-base mb-1">{protocol?.name}</h3>
      <p className="text-gray-600 text-sm mb-3">Total Plan: {protocol?.totalPlanCount}</p>
      <Link
        href={`/specialistDs/members/fat-loss-protocol?patientId=${patientId}&protocolId=${protocol._id}`}
        className="w-full"
      >
        <CustomButton text="View Full" />
      </Link>
    </div>
  </div>
);

export default function ViewMember() {
  const routes = useSearchParams();
  const patientId = routes.get("patientId");

  const { data: patientData, isLoading: isPatientLoading } = useSpacialistPatientByIdQuery(patientId);
  const assignedProtocols = patientData?.data?.attributes?.results || [];

  const [selectedProtocolId, setSelectedProtocolId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);

  const { data: protocols, isLoading: protocolsLoading } = useSpacialistPotentialPatientQuery({ patientId, doctorId });
  const protocolsData = protocols?.data?.attributes || [];

  // --- Client Documents Pagination ---
  const [docPage, setDocPage] = useState(1);
  const [docLimit, setDocLimit] = useState(10);

  const { data: clinetDocData } = useGetClientDocForDoctorQuery({ id: patientId, page: docPage, limit: docLimit });
  const fullClinetDocData = clinetDocData?.data?.attributes?.results || [];
  const totalDocs = clinetDocData?.data?.attributes?.totalResults || 0;

  useEffect(() => {
    if (patientData) {
      // handle patientData updates if needed
    }
  }, [patientData]);

  const handleRowClick = (record) => {
    setSelectedProtocolId(record._id);
    setDoctorId(record?.doctorId);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
      render: (text, record, index) => <span className="font-semibold">{index + 1}</span>,
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar src={url + record?.doctorProfileImage?.imageUrl} size="small" className="mr-2" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Protocol",
      dataIndex: "protocol",
      key: "protocol",
      width: 80,
      render: (text, record) => <span className="font-semibold">{record?.protocolCount}</span>,
    },
  ];

  if (isPatientLoading || protocolsLoading) {
    return (
      <div className="p-4 md:p-6 bg-gray-50">
        <BackHeader title={"View full"} />
        <div className="flex justify-center items-center w-full h-full">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50">
      <BackHeader title={"View full"} />

      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Protocols Table */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-medium mb-4">Protocols</h2>
              <Table
                dataSource={assignedProtocols}
                columns={columns}
                pagination={false}
                size="small"
                rowClassName={(record, index) => (index === 0 ? "bg-red-50" : "")}
                rowKey="_id"
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          {/* Right: Protocol Cards */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {protocolsData?.length === 0 && (
                <div className="flex justify-center items-center w-full h-full">
                  <span>No Protocols Available — Select a Protocol</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {protocolsData?.map((protocol) => (
                  <ProtocolCard
                    key={protocol._id}
                    protocol={protocol}
                    patientId={patientId}
                    selectedId={selectedProtocolId}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Documents Section */}
      <div className="px-6 pb-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Client Documents
            {totalDocs > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({totalDocs} total)
              </span>
            )}
          </h2>
        </div>

        {fullClinetDocData.length === 0 ? (
          <p className="text-gray-400 text-sm">No documents found.</p>
        ) : (
          <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {fullClinetDocData.map((doc) => (
              <div key={doc?._id} className="border p-4 rounded bg-white shadow-sm">
                <h3 className="font-semibold text-gray-600 mb-2 truncate">{doc?.title}</h3>
                <Image
                  width="100%"
                  src={doc?.attachments[0]?.attachment}
                  alt={doc?.title}
                  className="!w-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}

        {/* Documents Pagination */}
        {totalDocs > 0 && (
          <div className="flex justify-end mt-6">
            <Pagination
              current={docPage}
              pageSize={docLimit}
              total={totalDocs}
              onChange={(page, pageSize) => {
                setDocPage(page);
                setDocLimit(pageSize);
              }}
              showSizeChanger
              pageSizeOptions={["5", "10", "20", "50"]}
              showTotal={(total, range) =>
                `${range[0]}–${range[1]} of ${total} documents`
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}