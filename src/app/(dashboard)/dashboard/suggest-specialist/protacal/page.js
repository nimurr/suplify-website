'use client'
import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useGetAllPlanThisUserByIdQuery } from '@/redux/fetures/patient/protocal';
import { useGetAllSuggestionByProtocalIdQuery } from '@/redux/fetures/patient/specialist';

const { Title, Text } = Typography;

export default function Page() {
    const [id, setId] = useState(null); // To store the 'id' from URL
    const [planType, setPlanType] = useState('mealPlan'); // Default to mealPlan

    // Initialize filteredPlanes with 'mealPlan' data by default when the component mounts
    useEffect(() => {
        // Get search params from URL using URLSearchParams
        const searchParams = new URLSearchParams(window.location.search);
        const protocolId = searchParams.get('protocolId');  // Get the 'id' from URL search params
        setId(protocolId);

    }, []); // Only run this once when component mounts


    const { data: planeData, isLoading } = useGetAllSuggestionByProtocalIdQuery({ protocolId: id, type: planType });
    const filteredPlanes = planeData?.data?.attributes || [];

    console.log(filteredPlanes);


    // 4 protocol types: workOut, suppliment, lifeStyleChanges, mealPlan
    const allPlane = [
        {
            id: '1',
            title: 'Meal Plan ',
            _DoctorPlanId: '12345',
            type: 'mealPlan'
        },
        {
            id: '2',
            title: 'Workout Plan ',
            _DoctorPlanId: '67890',
            type: 'workOut'
        },
        {
            id: '3',
            title: 'Supplement',
            _DoctorPlanId: '11223',
            type: 'suppliment'
        },
        {
            id: '4',
            title: 'LifeStyle Changes',
            _DoctorPlanId: '11223',
            type: 'lifeStyleChanges'
        },
    ];

    // Protocol table columns
    const columns = [
        {
            title: 'Sl No',
            render: (text, record, idx) => <span className="font-semibold">{idx + 1}</span>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <span className="font-semibold">{text}</span>,
        }
    ];

    // Handle row click to change planType and filter the planes based on the selected type
    const handleRowClick = (record) => {
        setPlanType(record.type);
    };


    return (
        <div className="mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Protocols Table */}
                <div className="lg:col-span-1">
                    <Card title={<Title level={5} className="m-0">Protocols</Title>} className="shadow-sm" bodyStyle={{ padding: 0 }}>
                        <Table
                            columns={columns}
                            dataSource={allPlane}
                            pagination={false}
                            size="small"
                            rowClassName={() => "bg-pink-50 py-3 px-3 cursor-pointer"}
                            onRow={(record) => ({
                                onClick: () => handleRowClick(record), // Add the row click handler
                            })}
                        />
                    </Card>
                </div>

                <div className="lg:col-span-3 space-y-4">
                    <h2 className='text-2xl font-semibold mb-5 capitalize'>{planType}</h2>
                    {
                        isLoading && (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-lg text-blue-500 font-semibold">Loading...</p>
                            </div>
                        )
                    }
                    {filteredPlanes?.map((plan, index) => (
                        <Card
                            key={index}
                            className="shadow-sm"
                            bodyStyle={{ padding: '1rem' }}
                            title={<h3 className="font-semibold text-xl">{plan.title}</h3>}
                        >
                            {
                                plan?.specialistSuggestions?.length > 0 && (
                                    <div className="my-3">
                                        <div className='bg-red-50 p-5 rounded-lg'>
                                            {/* Table for displaying specialist suggestions */}
                                            <table className="min-w-full table-auto border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th className="border px-4 py-2">SL NO</th>
                                                        <th className="border px-4 py-2">Solution Name</th>
                                                        <th className="border px-4 py-2">Suggested From Store</th>
                                                        <th className="border px-4 py-2">Key Point</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        plan?.specialistSuggestions?.map((suggestion, idx) => (
                                                            <tr key={idx}>
                                                                <td className='border px-4 py-2'>{++idx}</td>
                                                                <td className="border px-4 py-2">{suggestion?.suggestionDetails?.solutionName}</td>
                                                                <td className="border px-4 py-2">{suggestion?.suggestionDetails?.suggestFromStore}</td>
                                                                <td className="border px-4 py-2">{suggestion?.suggestionDetails?.keyPoint}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            }

                            <div className="mb-3">
                                <Text className="text-gray-500">{plan.description}</Text>
                            </div>

                            <div className="mb-4">
                                <Text className="text-sm font-semibold">Key Points:</Text>
                                <ul className="list-disc pl-6">
                                    {plan.keyPoints?.map((point, idx) => (
                                        <li key={idx} className="text-gray-600">{point}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex justify-between items-center">
                                <Text className="font-semibold text-sm">Total Key Points: {plan.totalKeyPoints}</Text>
                            </div>
                        </Card>
                    ))}
                    {
                        filteredPlanes?.length === 0 && (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-lg text-red-500 font-semibold">No Plane found for this {planType} Type !</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}