"use client";

import { useState } from "react";
import { Button, Card, Row, Col, Typography, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useGetAllschedulesQuery } from "@/redux/fetures/doctor/doctor";
import moment from "moment";

const { Text, Title } = Typography;

const ScheduleCard = ({ schedule, onEdit, onDelete }) => {
  const router = useRouter()
  return (
    <Card className="mb-6" bordered>
      <div className="flex justify-between items-start mb-3">
        <Title level={5} className="mb-0">{schedule.scheduleName}</Title>
        <div className="text-red-600 font-semibold">
          {schedule.price}$ <Text delete type="secondary" className="ml-1">{schedule.oldPrice}</Text>
        </div>
      </div>

      <Space direction="vertical" size={4} className="text-gray-600 text-sm mb-4">
        <div className="flex items-center gap-5 justify-between my-1">
          <Space size={6}><CalendarOutlined /> Date</Space>
          {/* day Name month and year */}
          <Text className="pl-5 font-semibold">{moment(schedule.scheduleDate).format("dddd, MMMM Do YYYY")}</Text>
        </div>
        <div className="flex items-center gap-5 justify-between my-1">
          <Space size={6}><ClockCircleOutlined /> Start Time</Space>
          <Text className="pl-5 font-semibold">{moment(schedule.startTime).format("hh:mm A")}</Text>
        </div>
        <div className="flex items-center gap-5 justify-between my-1">
          <Space size={6}><ClockCircleOutlined /> End Time</Space>
          <Text className="pl-5 font-semibold">{moment(schedule.endTime).format("hh:mm A")}</Text>
        </div>


        <Text className=" text-xs mt-2 cursor-pointer text-gray-400 my-1">{schedule.description > 50 ? `${schedule.description.slice(0, 50)}...` : schedule.description}</Text>
      </Space>

      <Space>
        {/* <Button
          onClick={() => router.push('/doctorDs/schedule/edit-schedule')}
          type="primary" className="!font-semibold" danger icon={<EditOutlined />}  >
          Edit
        </Button> */}
        <Button type="default" className="!font-semibold" danger icon={<DeleteOutlined />} onClick={onDelete}>
          Delete
        </Button>
      </Space>
    </Card>
  );
};

export default function ScheduleList() {
  const router = useRouter()
  const [schedules, setSchedules] = useState(Array(8).fill({
    title: "Schedule 1",
    price: "180$",
    oldPrice: "1200$",
    date: "12-Jan-2025, Saturday",
    startTime: "10:00 pm",
    endTime: "11:00 pm",
    description:
      "This description is very important for a user, they can Acknowledge the full program on this schedule. This description is very important for",
  }));

  const { data, isLoading } = useGetAllschedulesQuery()
  const fullData = data?.data?.attributes?.results;
  console.log(fullData);

  const handleEdit = (index) => {
    console.log("Edit schedule", index);
  };

  const handleDelete = (index) => {
    console.log("Delete schedule", index);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <Text strong>Available Schedule</Text>
        <Text>Total Schedule : {fullData?.length || 0}</Text>
        <Button type="primary"
          onClick={() => router.push('/doctorDs/schedule/create-schedule')}
          icon={<PlusOutlined />} danger>
          Create New
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {fullData?.map((schedule, idx) => (
          <Col key={idx} xs={24} sm={12} md={8} lg={6}>
            <ScheduleCard
              schedule={schedule}
              onEdit={() => handleEdit(idx)}
              onDelete={() => handleDelete(idx)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
