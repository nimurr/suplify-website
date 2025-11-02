"use client";

import React, { useState } from "react";
import { Button, Form, Input, Upload, message, Image, Space } from "antd";
import { useRouter } from "next/navigation";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

const EditProfile = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  // Fake initial user data, including profile image URL
  const initialValues = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    company: "Acme Corporation",
    phoneNumber: "+1 (555) 123-4567",
  };

  // State for profile image upload
  const [imageFileList, setImageFileList] = useState([
    {
      uid: "-1",
      name: "profile.png",
      status: "done",
      url: "/images/user4.jpg", // initial image preview (fake)
    },
  ]);

  const [documentFileList, setDocumentFileList] = useState([]);

  const handleBack = () => {
    router.push("/profile");
  };

  const onFinish = (values) => {
    console.log("Form Values:", values);
    console.log("New Profile Image File:", imageFileList[0] || null);
    console.log("Uploaded Document File:", documentFileList[0] || null);

    message.success("Profile updated (demo). Implement API call here.");

    router.push("/profile");
  };

  // Validate image before upload (only jpg/png)
  const beforeImageUpload = (file) => {
    const isValid =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isValid) {
      message.error("You can only upload JPG/PNG files!");
    }
    return isValid || Upload.LIST_IGNORE;
  };

  const beforeDocumentUpload = (file) => {
    const isPdf = file.type === "application/pdf";
    if (!isPdf) {
      message.error("You can only upload PDF files!");
    }
    return isPdf || Upload.LIST_IGNORE;
  };

  const handleImageChange = ({ fileList }) => {
    // Limit to 1 file only
    setImageFileList(fileList.slice(-1));
  };

  const handleDocumentChange = ({ fileList }) => {
    setDocumentFileList(fileList.slice(-1));
  };

  return (
    <div className="md:w-[70%] mx-auto md:py-24 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl mt-5 font-bold text-green-700 text-center md:mb-8">
        Edit Profile
      </h1>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item label="Profile Image">
          <Upload
            listType="picture-card"
            accept=".jpg,.jpeg,.png"
            beforeUpload={beforeImageUpload}
            onChange={handleImageChange}
            fileList={imageFileList}
            maxCount={1}
            showUploadList={{ showRemoveIcon: true }}
            // no action prop means no auto upload
          >
            {imageFileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item label="Company" name="company">
          <Input placeholder="Company" />
        </Form.Item>

        <Form.Item label="Phone Number" name="phoneNumber">
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Form.Item label="Upload Document (PDF)">
          <Upload
            accept=".pdf"
            beforeUpload={beforeDocumentUpload}
            onChange={handleDocumentChange}
            fileList={documentFileList}
            maxCount={1}
            showUploadList={{ showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Select PDF</Button>
          </Upload>
        </Form.Item>

        <Form.Item className="flex justify-between mt-8">
          <Button onClick={handleBack}>Back to Profile</Button>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
