'use client';
import { useGetAlldoctorPatientsProtacolQuery } from '@/redux/fetures/patient/specialist';
import { Button, Card } from 'antd';
import React, { useEffect, useState } from 'react';

const ViewSuggestPage = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [patientId, setPatientId] = useState(null);

  console.log(doctorId, patientId);

  useEffect(() => {
    const pasaintId = localStorage.getItem('user');
    const { id } = JSON.parse(pasaintId);
    setPatientId(id);
    // get doctorId from search params
    const searchParams = new URLSearchParams(window.location.search);
    const doctorId = searchParams.get('id');
    setDoctorId(doctorId);

  }, []);


  const { data } = useGetAlldoctorPatientsProtacolQuery({ patientId, doctorId });
  const fullData = data?.data?.attributes;
  console.log(fullData);



  return (
    <div className='grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 p-5 bg-gray-100 max-w-5xl mx-auto gap-4'>
      {
        fullData?.map((plan) => (
          <Card key={plan.id} className="shadow-sm" bodyStyle={{ padding: '1rem' }}>
            <div className="mb-1">
              <p className="capitalize text-xl font-semibold" strong>{plan?.name}</p>
            </div>
            <div className="mb-3">
              <p className="text-gray-500 capitalize">Total Plan: {plan.totalPlanCount}</p>
            </div>
            <Button
              type="primary"
              href={`/dashboard/suggest-specialist/protacal?protocolId=${plan._id}`}
              className="w-full bg-red-600 hover:bg-red-700 border-red-600"
            >
              View
            </Button>
          </Card>
        ))
      }
    </div>
  );
}

export default ViewSuggestPage;
