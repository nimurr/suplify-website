'use client'

import React from 'react';
import { Table, Button, Avatar, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetAllProtocalsQuery } from '@/redux/fetures/doctor/doctor';
import url from '@/redux/api/baseUrl';


const { Title, Text } = Typography;

export default function DoctorProtocol() {

  const { data } = useGetAllProtocalsQuery()
  const fullData = data?.data?.attributes?.results;
  console.log(fullData);

  const router = useRouter()
  // Sample data for the table
  const protocolData = [
    {
      key: '1',
      id: '01',
      memberName: 'Mahmud',
      avatar: '/images/user4.jpg',
      subscriptName: 'subscriptName',
      protocol: 10,
      action: 'View'
    },
    {
      key: '2',
      id: '02',
      memberName: 'Mahmud',
      avatar: '/images/user4.jpg',
      subscriptName: 'subscriptName',
      protocol: 2,
      action: 'View'
    },

  ];
  let idx = 1;
  // Table columns definition
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      render: (index, text) => (
        <div className="flex items-center">
          <Text>{idx++}</Text>
        </div>
      ),
    },
    {
      title: 'Member Name',
      dataIndex: 'memberName',
      key: 'memberName',
      width: '25%',
      render: (_, text) => (
        <div className="flex items-center">
          <Avatar src={url + text?.patientId?.profileImage?.imageUrl} size={36} className="mr-3" />
          <Text>{text?.patientId?.name}</Text>
        </div>
      ),
    },
    {
      title: 'Subscription',
      dataIndex: 'subscriptName',
      key: 'subscriptName',
      width: '25%',
      render: (_, text) => (
        <div className="flex items-center">
          <Text>{text?.patientId?.subscriptionType}</Text>
        </div>
      )
    },
    {
      title: 'Protocol',
      dataIndex: 'protocol',
      key: 'protocol',
      width: '20%',
      render: (_, text) => (
        <div className="flex items-center">
          <Text>{text?.patientId?.profileId?.howManyProtocol}</Text>
        </div>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
      render: (_, text) => (
        <Button type="link"
          onClick={() => router.push(`/doctorDs/doctor-protocol/view?patientId=${text?.patientId?._userId}`)}
          className="text-blue-500 p-0">
          View
        </Button>

      ),
    },
  ];

  return (
    <div className="  mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Title level={4} className="m-0">Protocol</Title>
        <div className="flex items-center">
          <Text className="mr-4 font-medium">Total Schedule : {fullData?.length}</Text>
          {/* <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            className="bg-red-600 hover:bg-red-700 border-red-600"
          >
            Create New
          </Button> */}
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={fullData}
        pagination={false}
        className="border border-gray-200 rounded-lg"
        rowClassName="hover:bg-gray-50"
      />
    </div>
  );
}