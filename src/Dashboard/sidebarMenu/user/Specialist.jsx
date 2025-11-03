"use client"
import React, { useState } from "react";
import { Button, Image as AntImage } from "antd";
import { LaptopOutlined } from "@ant-design/icons";
import CustomButton from "@/components/customComponent/CustomButton";
import { useRouter } from "next/navigation";
import { useGetAllSpecialistPatientsPaginateOthersQuery, useGetAllSpecialistPatientsPaginateQuery } from "@/redux/fetures/patient/specialist";

const yourSpecialists = [
  {
    id: 1,
    name: "Sakib Ahmed",
    image: "/images/trainer.png",
    description: "Description for this item is very important for the user",
    protocols: ["Protocol Name", "+2"],
    programs: 10,
  },
  {
    id: 2,
    name: "Riyad Khan",
    image: "/images/trainer.png",
    description: "Helping people achieve better health everyday.",
    protocols: ["Fitness Plan", "+3"],
    programs: 8,
  },
];

const otherSpecialists = [
  {
    id: 3,
    name: "Ayesha Noor",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    description: "Expert in nutritional counseling and coaching.",
    protocols: ["Meal Prep", "+1"],
    programs: 5,
  },
  {
    id: 4,
    name: "Rahim Uddin",
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464",
    description: "Specializes in muscle rehab and strength training.",
    protocols: ["Rehab Plan", "+4"],
    programs: 12,
  },
];

const SpecialistsPage = () => {


  const { data: specialistData } = useGetAllSpecialistPatientsPaginateQuery();
  const fullSpecialistData = specialistData?.data?.attributes?.results || [];
  console.log(fullSpecialistData);

  const { data: otherSpecialistData } = useGetAllSpecialistPatientsPaginateOthersQuery();
  const fullOtherSpecialistData = otherSpecialistData?.data?.attributes?.results || [];
  console.log(fullOtherSpecialistData);


  const router = useRouter()
  const [activeTab, setActiveTab] = useState("your");

  const data = activeTab === "your" ? fullSpecialistData : fullOtherSpecialistData;

  const ViewFull = (id) => {

    router.push(`/dashboard/specialist/${id}`)

  }
  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex gap-8 border-b mb-6">
        <button
          onClick={() => setActiveTab("your")}
          className={`pb-2 font-medium ${activeTab === "your"
            ? "text-red-600 border-b-2 border-red-600"
            : "text-gray-500"
            }`}
        >
          Your Specialists
        </button>
        <button
          onClick={() => setActiveTab("other")}
          className={`pb-2 font-medium ${activeTab === "other"
            ? "text-red-600 border-b-2 border-red-600"
            : "text-gray-500"
            }`}
        >
          Others Specialists
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.map((spec) => (
          <div
            key={spec.id}
            className="bg-white border rounded-lg shadow-sm p-4 max-w-xs w-full"
          >
            <AntImage
              // src={spec.specialistId?.profileImage?.imageUrl}
              src={spec?.specialistId?.profileImage?.imageUrl.includes("amazonaws.com") ? spec?.specialistId?.profileImage?.imageUrl : url + spec?.specialistId?.profileImage?.imageUrl}
              alt={spec.name}
              width="100%"
              style={{ objectFit: "cover", borderRadius: "8px" }}
              preview={false}
            />
            <h3 className="mt-4 font-semibold text-lg">{spec.specialistId.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {spec?.specialistId?.profileId?.description?.length > 100 ? `${spec?.specialistId?.profileId?.description.slice(0, 100)}...` : spec?.specialistId?.profileId?.description}
            </p>
            <div className="flex items-center gap-2 text-sm flex-wrap mb-1">
              {
                spec?.specialistId?.profileId?.protocolNames?.map((program, index) => (
                  <span key={index} className="border px-2 py-1 rounded-full text-gray-600">
                    {program}
                  </span>
                )) || 'No Programs Available' // Optionally handle if howManyPrograms is empty or undefined
              }
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
              <LaptopOutlined />
              {
                spec?.specialistId?.profileId?.howManyPrograms
              }
              <span>Programs</span>
            </div>
            <CustomButton
              onClick={() => ViewFull(spec?.specialistId?._userId)}
              text="View Full"
            />
          </div>
        ))}
        {
          data.length === 0 && (
            <p className='text-center text-xl font-semibold text-red-500'>No Specialists Found</p>
          )
        }
      </div>
    </div>
  );
};

export default SpecialistsPage;
