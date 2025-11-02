'use client';
import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Typography, Avatar } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';
import { useGetAllPlanThisUserQuery, useGetAllProtocalQuery } from '@/redux/fetures/patient/protocal';
import url from '@/redux/api/baseUrl';

const { Title, Text } = Typography;

export default function ProtocolPage() {
  const router = useRouter();

  const [planType, setPlanType] = useState('mealPlan'); // Default to mealPlan or use dynamic value
  const [filteredPlanes, setFilteredPlanes] = useState([]); // State to hold filtered planes based on planType
  const [doctorId, setDoctorId] = useState(null);
  const [pasaintId, setPatientId] = useState(null);

  const { data } = useGetAllProtocalQuery();
  const fullPlane = data?.data?.attributes?.results || [];



  const { data: planeData } = useGetAllPlanThisUserQuery({ doctorId, pasaintId });

  console.log(planeData?.data?.attributes);

  useEffect(() => {
    const pasaintId = localStorage.getItem('user');
    const { id } = JSON.parse(pasaintId);
    setPatientId(id);
  }, [planType]);


  // Static demo data for all planes
  const allPlane = [
    {
      id: '1',
      title: 'Meal Plan 1',
      totalKeyPoints: 5,
      _DoctorPlanId: '12345',
      type: 'mealPlan'
    },
    {
      id: '2',
      title: 'Workout Plan 1',
      totalKeyPoints: 3,
      _DoctorPlanId: '67890',
      type: 'workOut'
    },
    {
      id: '3',
      title: 'Supplement Plan 1',
      totalKeyPoints: 4,
      _DoctorPlanId: '11223',
      type: 'suppliment'
    }
  ];

  // Protocol table columns
  const columns = [
    {
      title: 'Sl No',
      render: (text, record, idx) => <span className="font-semibold">{idx + 1}</span>,  // Ensure correct index is displayed
    },
    {
      title: 'Doctor Name',
      dataIndex: 'doctorName',
      key: 'doctorName',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar size={32} src={url + record?.doctorProfileImage?.imageUrl} />
          <span>{record?.doctorName}</span>
        </div>
      ),
    },
    {
      title: 'Protocol Count',
      dataIndex: 'protocolCount',
      key: 'protocolCount',
      render: (text, record) => <span className="font-semibold">{record?.protocolCount}</span>,
    }
  ];

  // Handle row click to change planType and filter the planes based on the selected type
  const handleRowClick = (record) => {
    setDoctorId(record.doctorId);
  };

  // Initialize filteredPlanes with 'mealPlan' data by default when the component mounts
  useEffect(() => {
    const defaultFilteredData = allPlane.filter(plan => plan.type === 'mealPlan');
    setFilteredPlanes(defaultFilteredData);
  }, []);

  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Protocols Table */}
        <div className="lg:col-span-1">
          <Card title={<Title level={5} className="m-0">Protocols</Title>} className="shadow-sm" bodyStyle={{ padding: 0 }}>
            <Table
              columns={columns}
              dataSource={fullPlane}
              pagination={false}
              size="small"
              rowClassName={() => "bg-pink-50 py-2 cursor-pointer"}
              onRow={(record) => ({
                onClick: () => handleRowClick(record), // Add the row click handler
              })}
            />
          </Card>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {
            planeData?.data?.attributes?.length > 0 ? (
              planeData?.data?.attributes?.map((plan) => (
                <Card key={plan.id} className="shadow-sm" bodyStyle={{ padding: '1rem' }}>
                  <div className="mb-1">
                    <Text className="capitalize" strong>{plan?.name}</Text>
                  </div>
                  <div className="mb-3">
                    <Text className="text-gray-500 capitalize">Key Points: {plan.totalPlanCount}</Text>
                  </div>
                  <Button
                    onClick={() => router.push(`/dashboard/protocol/details?id=${plan._id}`)}
                    type="primary"
                    className="w-full bg-red-600 hover:bg-red-700 border-red-600"
                  >
                    View Plan
                  </Button>
                </Card>
              ))
            ) : (
              <div className="flex justify-center w-full">
                <p className="text-2xl font-semibold text-red-600 capitalize">Please Selecet a Doctor!</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
