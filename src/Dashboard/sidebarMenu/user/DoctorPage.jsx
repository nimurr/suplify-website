"use client";

import CustomButton from "@/components/customComponent/customButton";
import url from "@/redux/api/baseUrl";
import { useGetAllOthersQuery, useGetAllYourDoctorsQuery } from "@/redux/fetures/patient/patient";
import { Card, Button, Radio, Row, Col, Divider, Tabs, Image } from "antd";
import { useRouter } from "next/navigation";

import { useState } from "react";

const { TabPane } = Tabs;

const yourDoctors = [
  {
    id: 1,
    name: "Sakib Ahmed",
    description: "Description for this item is very important for the user",
    imageUrl: "/images/doctor.png",
  },
  {
    id: 2,
    name: "John Doe",
    description: "Another doctor description here for the user",
    imageUrl: "/images/doctor.png",
  },
];

const otherDoctors = [
  {
    id: 3,
    name: "Jane Smith",
    description: "Description for other doctor",
    imageUrl: "/images/doctor.png",
  },
  {
    id: 4,
    name: "Alice Johnson",
    description: "Description for other doctor",
    imageUrl: "/images/doctor.png",
  },
  {
    id: 5,
    name: "Bob Brown",
    description: "Description for other doctor",
    imageUrl: "/images/doctor.png",
  },
  {
    id: 6,
    name: "Charlie White",
    description: "Description for other doctor",
    imageUrl: "/images/doctor.png",
  },
];

const schedules = [
  {
    id: 1,
    title: "Schedule 1",
    date: "12-Jan-2025, Saturday",
    startTime: "10:00 pm",
    endTime: "11:00 pm",
    price: 180,
    oldPrice: 200,
    description:
      "This description is very important for a user, they can Acknowledge the full program on this schedule. This description is very important for a user.",
  },
  // add more schedules if needed
];

export default function DoctorPage() {
  const router = useRouter()
  // Select the first doctor from "yourDoctors" by default for full view

  const { data } = useGetAllYourDoctorsQuery()
  const yourFullData = data?.data?.attributes?.results

  const { data: data2 } = useGetAllOthersQuery()
  const othersFullData = data2?.data?.attributes?.results;

  console.log(data2);


  const ViewFull = (id) => {
    if (data?.data?.additionalResponse?.subscriptionType == 'none' || data2?.data?.additionalResponse?.subscriptionType == 'none') {
      return toast.error('Please subscribe to use this feature')
    }
    router.push(`/dashboard/specialist/${id}`)
  }

  return (
    <div className=" mx-auto p-6 space-y-10">
      {/* Doctors Tabs: Your Doctor & Others Doctor */}
      <Tabs defaultActiveKey="your" size="middle" tabBarGutter={50}>
        <TabPane
          tab={<span className=" font-semibold">Your Doctor</span>}
          key="your"
        >
          <div className="grid xl:grid-cols-6 grid-cols-1 md:grid-cols-2 gap-4">
            {yourFullData?.map((doc) => (
              <Card
                key={doc.id}
                hoverable
                className="rounded-lg shadow-md cursor-pointer "
                cover={
                  <div className="relative rounded-t-lg overflow-hidden">
                    <img
                      src={url + doc?.doctorId?.profileImage.imageUrl}
                      alt={doc?.doctorId?.name}
                      className=" w-full "
                    />
                  </div>
                }
              >
                <div className="flex flex-col justify-between h-full w-full">
                  <h3 className="font-semibold text-lg mb-1">{doc?.doctorId?.name}</h3>
                  <p className="text-gray-600 text-sm my-2">
                    {doc?.doctorId?.profileId?.description?.length > 60 ? doc?.doctorId?.profileId?.description.slice(0, 60) + "..." : doc?.doctorId?.profileId?.description || "No description available"}
                  </p>
                  <CustomButton
                    onClick={() => ViewFull(doc?.doctorId?._userId)}
                    text="View Full"
                    className="p-2"
                  />
                </div>
              </Card>
            ))}
          </div>
        </TabPane>

        <TabPane
          tab={<span className="font-semibold">Others Doctor</span>}
          key="others"
        >
          <div className="grid xl:grid-cols-6 grid-cols-1 md:grid-cols-2 gap-4">
            {othersFullData?.map((doc) => (
              <Card
                key={doc._id}
                hoverable
                className="rounded-lg shadow-md cursor-pointer"
                cover={
                  <div className="relative rounded-t-lg overflow-hidden">
                    <img
                      src={url + doc?.profileImage.imageUrl}
                      alt={doc.name}
                      className="  w-full "
                    />
                  </div>
                }
              >
                <h3 className="font-semibold text-lg mb-1">{doc?.name}</h3>
                <p className="text-gray-600 text-sm my-2">
                  {doc?.doctorId?.profileId?.description?.length > 60 ? doc?.doctorId?.profileId?.description.slice(0, 60) + "..." : doc?.doctorId?.profileId?.description || "No description available"}
                </p>
                <CustomButton
                  onClick={() => ViewFull(doc._id)}
                  text="View Full"
                  className="p-2"
                />
              </Card>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
