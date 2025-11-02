'use client';
import React, { useEffect, useState } from 'react';
import { Card, Button, Table, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import CustomButton from '@/components/customComponent/CustomButton';
import { useCreatePlaneMutation, useGetAllPlanesQuery } from '@/redux/fetures/doctor/createPlane';
import { FiPlus } from 'react-icons/fi';

const { Title, Text } = Typography;

export default function ProtocolsAndMealPlans() {
  const router = useRouter();

  // State to hold the current planType (this can come from URL params, for example)
  const [planType, setPlanType] = useState('mealPlan'); // Default to mealPlan or use dynamic value

  console.log(planType);

  // Fetch data based on planType
  const { data: planesData, error, isLoading } = useGetAllPlanesQuery(planType);

  // Protocol table data (this can be dynamic if needed)
  // mealPlan-lifeStyleChanges-suppliment-workOut
  const protocolData = [
    { key: '1', slNo: 1, type: 'mealPlan', planName: 'Meal plan', keyPoint: 2 },
    { key: '2', slNo: 2, type: 'workOut', planName: 'Workout', keyPoint: 2 },
    { key: '3', slNo: 3, type: 'suppliment', planName: 'Supplement', keyPoint: 2 },
    { key: '4', slNo: 4, type: 'lifeStyleChanges', planName: 'Lifestyle changes', keyPoint: 2 }
  ];

  // Meal plans data (assuming this will come from API)
  const allPlane = planesData?.data?.attributes?.results || [];
  console.log(allPlane);

  // Protocol table columns
  const columns = [
    {
      title: 'Sl No',
      dataIndex: 'slNo',
      key: 'slNo',
      width: '20%',
    },
    {
      title: 'Plan Name',
      dataIndex: 'planName',
      key: 'planName',
      width: '50%',
    }
  ];

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Handle row click to change planType
  const handleRowClick = (record) => {
    const selectedPlanType = record.type; // Dynamically set the planType (e.g., 'mealPlan', 'lifeStyleChanges')
    setPlanType(selectedPlanType);
    console.log(selectedPlanType);
  };

  return (
    <div className="mx-auto p-4">
      <div className="my-4 w-full flex justify-end">
        <div>
          <button
            onClick={() => router.push('/doctorDs/create-plan/added-mealPlan')}
            className="bg-red-600 hover:bg-red-700 text-white font-medium gap-2 py-2 px-4 rounded flex items-center"
          >
            <FiPlus /> Create Plane
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Protocols Table */}
        <div className="lg:col-span-1">
          <Card title={<Title level={5} className="m-0">Protocols</Title>} className="shadow-sm" bodyStyle={{ padding: 0 }}>
            <Table
              columns={columns}
              dataSource={protocolData}
              pagination={false}
              size="small"
              rowClassName={() => "bg-pink-50 py-2 cursor-pointer"}

              onRow={(record) => ({
                onClick: () => handleRowClick(record), // Add the row click handler
              })}
            />
          </Card>
        </div>

        <div className='lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start'>
          {

            allPlane?.map((plan) => (
              <Card key={plan.id} className="shadow-sm" bodyStyle={{ padding: '1rem' }}>
                <div className="mb-1">
                  <Text className='capitalize' strong>{plan.title}</Text>
                </div>
                <div className="mb-3">
                  <Text className="text-gray-500 capitalize">Key Points: {plan.totalKeyPoints}</Text>
                </div>
                <Button
                  onClick={() => router.push(`/doctorDs/create-plan/edit-mealPlan?id=${plan._DoctorPlanId}`)}
                  type="primary"
                  icon={<EditOutlined />}
                  className="w-full bg-red-600 hover:bg-red-700 border-red-600"
                >
                  Edit
                </Button>
              </Card>
            ))
          }
          {
            allPlane?.length == 0 && (
              <div className='flex justify-center w-full'>
                <p className='text-2xl font-semibold text-red-600 capitalize'>No Plan Found !</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
