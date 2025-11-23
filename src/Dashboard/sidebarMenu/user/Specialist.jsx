"use client"
import React, { useState } from "react";
import { Button, Image as AntImage } from "antd";
import { LaptopOutlined } from "@ant-design/icons";
import CustomButton from "@/components/customComponent/CustomButton";
import { useRouter } from "next/navigation";
import { useGetAllSpecialistPatientsPaginateOthersQuery, useGetAllSpecialistPatientsPaginateQuery } from "@/redux/fetures/patient/specialist";
import url from "@/redux/api/baseUrl";
import toast, { Toaster } from "react-hot-toast";

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
  console.log(specialistData?.data?.additionalResponse?.subscriptionType);

  const { data: otherSpecialistData } = useGetAllSpecialistPatientsPaginateOthersQuery();
  const fullOtherSpecialistData = otherSpecialistData?.data?.attributes?.results || [];
  console.log(fullOtherSpecialistData);


  const router = useRouter()
  const [activeTab, setActiveTab] = useState("your");

  const data = activeTab === "your" ? fullSpecialistData : fullOtherSpecialistData;

  const ViewFull = (id) => {
    if (specialistData?.data?.additionalResponse?.subscriptionType == 'none' || specialistData?.data?.additionalResponse?.subscriptionType == 'none') {
      return toast.error('Please Buy Subscription to View Full Details')
    }
    router.push(`/dashboard/specialist/${id}`)
  }

  return (
    <div className="p-6">
      <Toaster />
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
        {data?.map((spec) => (
          <div
            key={spec.id}
            className="bg-white border rounded-lg shadow-sm p-4 max-w-xs w-full"
          >
            {
              activeTab !== "your" ?
                <AntImage
                  // src={spec.specialistId?.profileImage?.imageUrl}
                  src={spec?.profileImage?.imageUrl.includes("amazonaws") ? spec?.profileImage?.imageUrl : url + spec?.profileImage?.imageUrl}
                  alt={spec.name}
                  width="100%"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  preview={false}
                  className="max-h-[250px] min-h-[250px]"
                /> :
                <AntImage
                  // src={spec.specialistId?.profileImage?.imageUrl}
                  src={spec?.specialistId?.profileImage?.imageUrl.includes("amazonaws") ? spec?.specialistId?.profileImage?.imageUrl : url + spec?.specialistId?.profileImage?.imageUrl}
                  alt={spec.name}
                  width="100%"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  preview={false}
                  className="max-h-[250px] min-h-[250px]"
                />
            }

            <h3 className="mt-4 font-semibold text-lg">{activeTab !== "your" ? spec.name : spec.specialistId.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {
                activeTab !== "your" ?
                  spec?.profile?.description?.length > 100 ? `${spec?.profile?.description.slice(0, 100)}...` : spec?.profile?.description :
                  spec?.specialistId?.profileId?.description?.length > 100 ? `${spec?.specialistId?.profileId?.description.slice(0, 100)}...` : spec?.specialistId?.profileId?.description
              }
              {spec?.specialistId?.profileId?.description?.length > 100 ? `${spec?.specialistId?.profileId?.description.slice(0, 100)}...` : spec?.specialistId?.profileId?.description}
            </p>

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
