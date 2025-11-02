"use client";
import { useState } from "react";
import { Form, Input, Button, DatePicker, TimePicker, Select, message } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import BackHeader from "@/components/customComponent/BackHeader";
import { useCreateScheduleMutation } from "@/redux/fetures/doctor/doctor";
import toast, { Toaster } from "react-hot-toast";

dayjs.extend(utc);

export default function CreateSchedule() {
  const [form] = Form.useForm();
  const [createSchedule, { isLoading }] = useCreateScheduleMutation();

  // Helper: merge a date + a time, convert to UTC, and return "YYYY-MM-DDTHH:mm:ss" (no Z)
  const combineToUTCNoZ = (date, time) => {
    const merged = dayjs(date)
      .hour(time.hour())
      .minute(time.minute())
      .second(time.second() || 0);
    return merged.utc().format("YYYY-MM-DDTHH:mm:ss"); // NOTE: no trailing "Z"
  };

  const onFinish = async (values) => {
    try {
      // Basic guard: End time must be >= start time (same selected date)
      const s = dayjs(values.date)
        .hour(values.startTime.hour())
        .minute(values.startTime.minute())
        .second(values.startTime.second() || 0);
      const e = dayjs(values.date)
        .hour(values.endTime.hour())
        .minute(values.endTime.minute())
        .second(values.endTime.second() || 0);

      if (e.isBefore(s)) {
        message.error("End time must be after or equal to start time.");
        return;
      }

      // Build EXACT backend payload
      const payload = {
        scheduleName: values.scheduleName?.trim(),
        scheduleDate: dayjs(values.date).utc().startOf("day").toISOString(), // has trailing "Z"
        startTime: combineToUTCNoZ(values.date, values.startTime), // UTC, no "Z"
        endTime: combineToUTCNoZ(values.date, values.endTime),     // UTC, no "Z"
        description: values.description?.trim(),
        price: String(values.price ?? "").trim(),
        typeOfLink: values.linkType?.trim(), // rename
        meetingLink: values.link?.trim(),    // rename
      };

      // (Optional) See the exact result:
      console.log("Submitting payload:", payload);

      const res = await createSchedule(payload).unwrap();
      console.log(res);
      toast.success("Schedule created");
      form.resetFields();
      
    } catch (err) {
      console.log(err);
      // message.error(err?.data?.message || "Failed to create schedule");
      toast.error("Failed to create schedule");
    }
  };

  return (
    <div>
      <Toaster />
      <BackHeader title={"Back"} />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Create Schedule</h3>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          // initialValues={{
          //   scheduleName: "schedule one doc one",
          //   price: "60",
          //   date: dayjs("2025-11-04"),
          //   startTime: dayjs("14:45:00", "HH:mm:ss"),
          //   endTime: dayjs("14:45:09", "HH:mm:ss"),
          //   linkType: "zoom",
          //   link: "meeting link",
          //   description: "schedule one doc one description",
          // }}
          requiredMark="optional"
          colon={false}
        >
          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label={
                <>
                  Schedule name <span className="text-red-600">*</span>
                </>
              }
              name="scheduleName"
              rules={[{ required: true, message: "Please input schedule name" }]}
            >
              <Input placeholder="Enter schedule name" />
            </Form.Item>

            <Form.Item
              label={
                <>
                  Price <span className="text-red-600">*</span>
                </>
              }
              name="price"
              rules={[{ required: true, message: "Please input price" }]}
            >
              <Input prefix="$" inputMode="numeric" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label={
                <>
                  Date <span className="text-red-600">*</span>
                </>
              }
              name="date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-6">
              <Form.Item
                label={
                  <>
                    Start Time <span className="text-red-600">*</span>
                  </>
                }
                name="startTime"
                rules={[{ required: true, message: "Please select start time" }]}
              >
                <TimePicker className="w-full" format="h:mm:ss a" use12Hours />
              </Form.Item>

              <Form.Item
                label={
                  <>
                    End Time <span className="text-red-600">*</span>
                  </>
                }
                name="endTime"
                rules={[{ required: true, message: "Please select end time" }]}
              >
                <TimePicker className="w-full" format="h:mm:ss a" use12Hours />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label={
              <>
                Description <span className="text-red-600">*</span>
              </>
            }
            name="description"
            rules={[{ required: true, message: "Please type description" }]}
          >
            <Input.TextArea rows={4} placeholder="Type description" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label={
                <>
                  Type of link <span className="text-red-600">*</span>
                </>
              }
              name="linkType"
              rules={[{ required: true, message: "Please choose link type" }]}
            >
              <Select
                placeholder="Select a link type"
                options={[
                  { value: "zoom", label: "Zoom" },
                  { value: "googleMeet", label: "Google Meet" },
                  { value: "others", label: "Others" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  Link <span className="text-red-600">*</span>
                </>
              }
              name="link"
              rules={[{ required: true, message: "Please input link" }]}
            >
              <Input placeholder="https://..." />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              danger
              htmlType="submit"
              className="mt-4 w-28"
              loading={isLoading}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
