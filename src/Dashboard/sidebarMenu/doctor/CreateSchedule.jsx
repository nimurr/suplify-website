"use client";
import { useState } from "react";
import { Form, Input, Button, DatePicker, TimePicker, Select, message } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import BackHeader from "@/components/customComponent/BackHeader";
import { useCreateScheduleMutation } from "@/redux/fetures/doctor/doctor";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import { useRouter } from "next/navigation";

dayjs.extend(utc);

export default function CreateSchedule() {
  const [form] = Form.useForm();
  const [createSchedule, { isLoading }] = useCreateScheduleMutation();

  // Helper: merge a date + a time, convert to UTC, and return "YYYY-MM-DDTHH:mm:ss" (no Z)
  const combineToUTCNoZ = (date, time) => {
    const merged = dayjs(date)
      .hour(time.hour() + 6)
      .minute(time.minute())
      .second(time.second() || 0);
    return merged.utc().format("YYYY-MM-DDTHH:mm:ss"); // NOTE: no trailing "Z"
  };

  const route = useRouter();

  const onFinish = async (values) => {
 
    try { 
      const s = dayjs(values.date)
        .hour(values.startTime.hour() + 6)
        .minute(values.startTime.minute())
        .second(values.startTime.second() || 0);
      const e = dayjs(values.date)
        .hour(values.endTime.hour() + 6)
        .minute(values.endTime.minute())
        .second(values.endTime.second() || 0);
        console.log("sdfsdf");

      if (e.isBefore(s)) {
        toast.error("End time must be after start time");
        return;
      }

      // Build EXACT backend payload
      const payload = {
        scheduleName: values.scheduleName?.trim(),
        scheduleDate: combineToUTCNoZ(values.date, moment("00:00:00", "HH:mm:ss")) + "Z", // has trailing "Z"
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

      if (res?.code == 200) {
        console.log(res);
        toast.success("Schedule created");
        form.resetFields();
        route.push("/doctorDs/schedule");
      }
      else {
        console.log(res);
        toast.error(res?.message);
      }

    } catch (err) {
      console.log(err);
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


// "use client";
// import { Form, Input, Button, DatePicker, TimePicker, Select, message } from "antd";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import BackHeader from "@/components/customComponent/BackHeader";
// import { useCreateScheduleMutation } from "@/redux/fetures/doctor/doctor";
// import toast, { Toaster } from "react-hot-toast";

// dayjs.extend(utc);

// export default function CreateSchedule() {
//   const [form] = Form.useForm();
//   const [createSchedule, { isLoading }] = useCreateScheduleMutation();

//   // Helper: Combine local date + time → convert to UTC → format without "Z"
//   const toUTCNoZ = (date, time) => {
//     const local = date
//       .hour(time.hour())
//       .minute(time.minute())
//       .second(time.second() || 0);
//     return local.utc().format("YYYY-MM-DDTHH:mm:ss"); // No Z
//   };

//   const onFinish = async (values) => {
//     try {
//       // --- 1. Validate: End > Start ---
//       const startLocal = dayjs(values.date)
//         .hour(values.startTime.hour())
//         .minute(values.startTime.minute())
//         .second(values.startTime.second() || 0);

//       const endLocal = dayjs(values.date)
//         .hour(values.endTime.hour())
//         .minute(values.endTime.minute())
//         .second(values.endTime.second() || 0);

//       if (!endLocal.isAfter(startLocal)) {
//         message.error("End time must be after start time.");
//         return;
//       }

//       // --- 2. Build EXACT payload ---
//       const payload = {
//         scheduleName: values.scheduleName?.trim(),
//         // Midnight UTC of selected date → with Z
//         scheduleDate: toUTCNoZ(values.date) + "Z",
//         // Full UTC datetime strings (no Z)
//         startTime: toUTCNoZ(values.date, values.startTime),
//         endTime: toUTCNoZ(values.date, values.endTime),
//         description: values.description?.trim(),
//         price: String(values.price ?? "").trim(),
//         typeOfLink: values.linkType?.trim(),
//         meetingLink: values.link?.trim(),
//       };

//       console.log("Submitting payload:", payload);
//       return
//       // --- 3. Send to backend ---
//       const res = await createSchedule(payload).unwrap();
//       toast.success("Schedule created successfully!");
//       form.resetFields();

//     } catch (err) {
//       console.error("Create schedule error:", err);
//       toast.error(err?.data?.message || "Failed to create schedule");
//     }
//   };

//   return (
//     <div>
//       <Toaster />
//       <BackHeader title="Back" />
//       <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
//         <h3 className="text-lg font-semibold mb-6">Create Schedule</h3>

//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//           requiredMark="optional"
//           colon={false}
//         >
//           {/* Row 1: Name + Price */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Form.Item
//               label={<>Schedule name <span className="text-red-600">*</span></>}
//               name="scheduleName"
//               rules={[{ required: true, message: "Enter schedule name" }]}
//             >
//               <Input placeholder="Enter schedule name" />
//             </Form.Item>

//             <Form.Item
//               label={<>Price <span className="text-red-600">*</span></>}
//               name="price"
//               rules={[{ required: true, message: "Enter price" }]}
//             >
//               <Input prefix="$" inputMode="numeric" placeholder="80" />
//             </Form.Item>
//           </div>

//           {/* Row 2: Date + Start + End */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Form.Item
//               label={<>Date <span className="text-red-600">*</span></>}
//               name="date"
//               rules={[{ required: true, message: "Select date" }]}
//             >
//               <DatePicker className="w-full" format="YYYY-MM-DD" />
//             </Form.Item>

//             <Form.Item
//               label={<>Start Time <span className="text-red-600">*</span></>}
//               name="startTime"
//               rules={[{ required: true, message: "Select start time" }]}
//             >
//               <TimePicker
//                 className="w-full"
//                 format="HH:mm:ss"
//                 use12Hours={false}
//                 placeholder="16:45:00"
//               />
//             </Form.Item>

//             <Form.Item
//               label={<>End Time <span className="text-red-600">*</span></>}
//               name="endTime"
//               rules={[{ required: true, message: "Select end time" }]}
//             >
//               <TimePicker
//                 className="w-full"
//                 format="HH:mm:ss"
//                 use12Hours={false}
//                 placeholder="16:45:09"
//               />
//             </Form.Item>
//           </div>

//           {/* Description */}
//           <Form.Item
//             label={<>Description <span className="text-red-600">*</span></>}
//             name="description"
//             rules={[{ required: true, message: "Enter description" }]}
//           >
//             <Input.TextArea rows={4} placeholder="Type description" />
//           </Form.Item>

//           {/* Row 3: Link Type + Link */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Form.Item
//               label={<>Type of link <span className="text-red-600">*</span></>}
//               name="linkType"
//               rules={[{ required: true, message: "Choose link type" }]}
//             >
//               <Select
//                 placeholder="Select link type"
//                 options={[
//                   { value: "zoom", label: "Zoom" },
//                   { value: "googleMeet", label: "Google Meet" },
//                   { value: "others", label: "Others" },
//                 ]}
//               />
//             </Form.Item>

//             <Form.Item
//               label={<>Link <span className="text-red-600">*</span></>}
//               name="link"
//               rules={[{ required: true, message: "Enter meeting link" }]}
//             >
//               <Input placeholder="https://meet.google.com/..." />
//             </Form.Item>
//           </div>

//           {/* Submit */}
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={isLoading}
//               className="w-28"
//               danger
//             >
//               Create
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// }