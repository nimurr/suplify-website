"use client"

import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

export default function DoctorEarning() {
  const earningsData = [
    {
      period: 'Today',
      type: 'Program',
      amount: '$190',
      subtitle: '',
    },
    {
      period: 'Last week',
      type: 'Program',
      amount: '$100',
      subtitle: '1 Jan - 6 Jan',
    },
    {
      period: 'This month',
      type: 'Program',
      amount: '$105',
      subtitle: 'January',
    },
    {
      period: 'Previous month',
      type: 'Program',
      amount: '$113',
      subtitle: 'February',
    },
    {
      period: 'Total',
      type: 'Program',
      amount: '$2500',
      subtitle: '',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
        <h1>Earnings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {earningsData.map((item, index) => (
          <Card 
            key={index}
            className="bg-red-50 border-0 shadow-sm rounded-lg"
            bodyStyle={{ padding: '1.25rem' }}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <Text className="text-gray-600 font-medium">{item.period}</Text>
                  <Text className="text-gray-500 ml-1">{item.type}</Text>
                </div>
                <div className="mt-1">
                  <Text className="text-gray-600">•</Text>
                </div>
                {item.subtitle && (
                  <div className="mt-6 pt-2 border-t border-gray-200">
                    <Text className="text-gray-500">{item.subtitle}</Text>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-gray-500 mb-1">Earn</div>
                <Title level={3} className="m-0">{item.amount}</Title>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}