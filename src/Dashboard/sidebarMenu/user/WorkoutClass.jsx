"use client";

import React, { useState } from "react";
import { Button, Tabs } from "antd";
import CustomButton from "@/components/customComponent/CustomButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetAllSpecialistPatientsPaginateOthersQuery, useGetAllSpecialistPatientsPaginateQuery } from "@/redux/fetures/patient/specialist";


const { TabPane } = Tabs;


// Card component for each specialist
const SpecialistCard = ({ specialist }) => (



  <div className="bg-white rounded-lg shadow overflow-hidden">
    {/* Specialist Image */}
    <div className="w-full overflow-hidden">
      <img
        src={specialist.specialistId?.profileImage?.imageUrl}
        alt={specialist.name}
        className="  object-cover"
      />
    </div>

    {/* Specialist Info */}
    <div className="p-4">
      <h3 className="text-lg font-semibold">{specialist?.specialistId?.name}</h3>
      <p className="text-gray-600 text-sm mt-1">
        {specialist?.specialistId?.profileId?.description?.length > 100
          ? `${specialist?.specialistId?.profileId?.description.slice(0, 100)}...`
          : specialist?.specialistId?.profileId?.description}
      </p>

      {/* Protocol Badge */}
      <div className="flex items-center mt-3 flex-wrap gap-2">
        {specialist?.specialistId?.profileId?.protocolNames?.map((protocol, index) => (
          <span
            className="text-sm text-gray-800 border border-gray-300 px-3 py-1 rounded-md"
            key={index} // Use index as the key if protocol is not guaranteed to be unique
          >
            {protocol}
          </span>
        ))}
      </div>


      {/* View Full Button */}
      <Link href={`/dashboard/workout-class/details?specialistId=${specialist?.specialistId?._userId}`}>

        <CustomButton
          text="View Full"
          className="mt-2"

        />
      </Link>


    </div>
  </div >
);

export default function WorkoutPage() {


  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const { data: specialistData } = useGetAllSpecialistPatientsPaginateQuery();
  const fullSpecialistData = specialistData?.data?.attributes?.results || [];
  console.log(fullSpecialistData);

  const { data: otherSpecialistData } = useGetAllSpecialistPatientsPaginateOthersQuery();
  const fullOtherSpecialistData = otherSpecialistData?.data?.attributes?.results || [];
  console.log(fullOtherSpecialistData);



  return (
    <div className="bg-gray-50 p-4 md:p-6">
      <div className=" mx-auto">
        {/* Custom Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <div
              className={`cursor-pointer px-8 py-3 font-medium text-base ${activeTab === "1"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-500"
                }`}
              onClick={() => handleTabChange("1")}
            >
              Your Specialists
            </div>
            <div
              className={`cursor-pointer px-8 py-3 font-medium text-base ${activeTab === "2"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-500"
                }`}
              onClick={() => handleTabChange("2")}
            >
              Others Specialists
            </div>
          </div>
        </div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {activeTab === "1" && (
            fullSpecialistData?.map(specialist => (
              <SpecialistCard key={specialist.id} specialist={specialist} />
            ))
          )}

          {activeTab === "2" && (
            fullOtherSpecialistData?.map(specialist => (
              <SpecialistCard key={specialist.id} specialist={specialist} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}