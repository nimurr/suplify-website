"use client";

import React from "react";
import { Table, Avatar, Spin, Alert } from "antd";
import Link from "next/link";
import { useSpacialistAllPatentsQuery } from "@/redux/fetures/Specialist/specialist";
import url from "@/redux/api/baseUrl";

const Members = () => {
  const { data: membersData, isLoading, isError, error } = useSpacialistAllPatentsQuery();
  const members = membersData?.data?.attributes?.results || [];

  // You can check if there's an error fetching data
  if (isError) {
    return (
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold">Suggest Specialist</h1>
        <div className="p-6 bg-white rounded-lg border border-gray-200 mx-auto mt-10">
          <Alert
            message="Error fetching data"
            description={error?.message || "Something went wrong while loading the data."}
            type="error"
            showIcon
          />
        </div>
      </div>
    );
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (text, record, index) => <span className="font-semibold">{index + 1}</span>,
    },
    {
      title: "Member Name",
      dataIndex: "patient",
      key: "patient",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar size={32} src={url + record.patient?.profileImage?.imageUrl} />
          <span className="font-semibold">{record.patient?.name}</span>
        </div>
      ),
    },
    {
      title: "Connected Doctor",
      dataIndex: "doctors",
      key: "doctors",
      render: (_, record) => (
        <div className="space-y-2">
          {record?.doctors?.map((item, index) => (
            <li key={index} className="font-semibold list-item">{item?.name}</li>
          ))}
        </div>
      ),
    },
    {
      title: "Connect Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
      title: "Subscription",
      dataIndex: "patient",
      key: "patient",
      align: "center",
      render: (_, record) => <span className="capitalize font-semibold">{record?.patient?.subscriptionType || 0}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link href={`/specialistDs/members/view-member?patientId=${record?.patient?._id}`} className="text-blue-600 hover:underline">
          View
        </Link>
      ),
      align: "center",
    },
  ];

  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold">Suggest Specialist</h1>
      <div className="p-6 bg-white rounded-lg border border-gray-200 mx-auto mt-10 overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
            Loading...
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={members}
            rowKey="id"
            pagination={false}
            bordered={false}
            className="ant-table-striped"
            scroll={{ x: 900 }} // horizontal scroll on small screens
          />
        )}
      </div>
    </div>
  );
};

export default Members;
