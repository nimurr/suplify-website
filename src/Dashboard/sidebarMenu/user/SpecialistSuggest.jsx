"use client"

// pages/specialist-suggest.js
import React from "react";
import { Table, Avatar } from "antd";
import Link from "next/link";
import { useGetSpecialistQuery } from "@/redux/fetures/patient/specialist";
import url from "@/redux/api/baseUrl";

const data = [
  {
    id: "01",
    specialistName: "Fuad Ahmed",
    specialistImage: "/images/specialist1.jpg", // replace with actual path or URL
    doctorName: "Sakib Ahmed",
    doctorImage: "/images/doctor.png",
    lastUpdate: "5 Jan, 2025",
    recommendation: 10,
    plan: 5,
  },
  {
    id: "02",
    specialistName: "Fuad Ahmed",
    specialistImage: "/images/specialist1.jpg",
    doctorName: "Sakib Ahmed",
    doctorImage: "/images/doctor.png",
    lastUpdate: "5 Jan, 2025",
    recommendation: 2,
    plan: 2,
  },
  {
    id: "03",
    specialistName: "Fuad Ahmed",
    specialistImage: "/images/specialist1.jpg",
    doctorName: "Sakib Ahmed",
    doctorImage: "/images/doctor.png",
    lastUpdate: "5 Jan, 2025",
    recommendation: 1,
    plan: 1,
  },
  {
    id: "04",
    specialistName: "Fuad Ahmed",
    specialistImage: "/images/specialist1.jpg",
    doctorName: "Sakib Ahmed",
    doctorImage: "/images/doctor.png",
    lastUpdate: "5 Jan, 2025",
    recommendation: 0,
    plan: 0,
  },
];

const SpecialistSuggest = () => {
  const { data: fullData } = useGetSpecialistQuery();
  const allSpacilist = fullData?.data?.attributes;
  console.log(allSpacilist);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (text, record, index) => <span className="font-semibold">{++index}</span>,
    },
    {
      title: "Specialist Name",
      dataIndex: "specialistName",
      key: "specialistName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar size={32} src={record.profileImage?.imageUrl} />
          <span className="font-semibold">{record.specialist?.name}</span>
        </div>
      ),
    },
    {
      title: "Doctor",
      dataIndex: "doctorName",
      key: "doctorName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar size={32} src={url + record.doctor?.profileImage?.imageUrl} />
          <span>{record.doctor?.name}</span>
        </div>
      ),
    },
    // {
    //   title: "Last Update",
    //   dataIndex: "lastUpdate",
    //   key: "lastUpdate",
    // },
    {
      title: "Plan",
      dataIndex: "totalPlans",
      key: "totalPlans",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text) => (
        <Link href={`/dashboard/suggest-specialist/details?id=${text?.doctorId}`} className="text-blue-600 hover:underline">
          View
        </Link>
      ),
      align: "center",
    },
  ];

  return (
    <div>

      <h1 className="text-2xl font-semibold">Suggest SpeciaList</h1>
      <div className="p-6 bg-white rounded-lg border border-gray-200 mx-auto mt-10">
        <Table
          columns={columns}
          dataSource={allSpacilist}
          rowKey="id"
          pagination={false}
          bordered={false}
          className="ant-table-striped"
        />
      </div>
    </div>
  );
};

export default SpecialistSuggest;
