'use client';
import { useGetMealPlanByProtocolIdAndPatientIdQuery } from '@/redux/fetures/Specialist/specialist';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {

    const [patientId, setPatientId] = useState(null);
    const [protocolId, setProtocolId] = useState(null);

    // Get patientId and protocolId from URL, only on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const searchParams = new URLSearchParams(window.location.search);
            setPatientId(searchParams.get("patientId"));
            setProtocolId(searchParams.get("protocolId"));
        }
    }, []); // This runs only once, after the component mounts on the client side

    const { data, isLoading } = useGetMealPlanByProtocolIdAndPatientIdQuery({ protocolId, patientId });
    const mealPlanData = data?.data?.attributes?.results || [];
    console.log("Meal Plan Data:", mealPlanData);



    return (
        <div>
            <h2 className='text-2xl font-semibold my-5'>All Plans</h2>
            <p>Click a Plan to give a suggestion </p>
            <div className=' bg-white rounded-lg border border-gray-200 mt-2 p-5'>
                {
                    mealPlanData?.map((plan) => (
                        <Link href={`/specialistDs/members/mealplan?planByDoctorId=${plan._planByDoctorId}`} key={plan._id} className='flex justify-between rounded hover:bg-blue-50 gap-20 border w-full p-2 mb-3'>
                            <span>{plan.title}</span>
                            <span>{plan.totalKeyPoints} key points</span>
                        </Link>
                    ))
                }
                {
                    isLoading && <p className='text-center font-semibold text-blue-600'>Loading...</p>
                }
            </div>
        </div>
    );
}

export default Page;
