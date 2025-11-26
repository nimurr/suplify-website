'use client'

import React, { useState } from 'react';
import { Button, Form, Input, Upload, Radio, Space, Tooltip } from 'antd';
import { UploadOutlined, DeleteOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import BackHeader from '@/components/customComponent/BackHeader';
import { useCreateTrainingSessionMutation } from '@/redux/fetures/Specialist/traningProgram';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CreateSession() {
  const [benefits, setBenefits] = useState([""]);
  const [form] = Form.useForm();

  const navigate = useRouter();

  const addBenefit = () => {
    setBenefits([...benefits, '']);
  };

  const removeBenefit = (index) => {
    const newBenefits = [...benefits];
    newBenefits.splice(index, 1);
    setBenefits(newBenefits);
  };

  const updateBenefit = (index, value) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };
  

  const searchParams = useSearchParams();
  const programId = searchParams.get('programId');

  const [createSession] = useCreateTrainingSessionMutation();

  const handleSubmit = async (values) => {
    const fromData = new FormData();

    fromData.append('trainingProgramId', programId);
    fromData.append('title', values.name);
    fromData.append('duration', values.duration);
    fromData.append('durationUnit', values.durationUnit);



    // Append each benefit separately
    benefits.forEach((benefit, index) => {
      fromData.append('benefits', benefit);  // Append each benefit individually
    });

    // Handle file uploads (photo and video)
    if (values.photo && values.photo[0]) {
      fromData.append('coverPhotos', values.photo[0].originFileObj);
    }

    if (values?.video[0]?.originFileObj) {
      fromData.append('attachments', values.video[0].originFileObj);
    }

    if (!values.video) {
      fromData.append('external_link', values.videoLink);
    }

    if (!values.video && !values.video && !videoLink) {
      return toast.error('Add Video Link');
    }

    try {
      const response = await createSession(fromData);
      console.log(response);

      if (response?.error?.data?.message) {
        toast.error(response?.error?.data?.message);
      }

      if (response?.data?.message) {
        toast.success(response?.data?.message);
        form.resetFields(); // Reset form fields on success
        navigate.push(`/specialistDs/program/view?programId=${programId}&specialistId=${response?.data?.data?.attributes?.specialistId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || 'Something went wrong!');
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      <BackHeader title={"Create Session"} />

      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
        <h2 className='text-2xl font-semibold my-5'>Create Session</h2>
        <div className="border-t border-gray-200 pt-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={true}
          >
            <div className="">
              {/* Photo Upload */}
              <div>
                <p className="mb-2 font-medium">Photo</p>
                <Form.Item
                  name="photo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    listType="picture-card"
                    maxCount={1}
                    beforeUpload={() => false}
                    accept="image/*"
                  >
                    <div className="text-center">
                      <UploadOutlined className="text-lg" />
                      <div className="mt-2">Upload Photo</div>
                      <div className="text-xs text-gray-400">PNG, JPEG or JPG up to 10MB</div>
                    </div>
                  </Upload>
                </Form.Item>
              </div>

              {/* Video Upload */}
              <div>
                <p className="mb-2 font-medium">Video</p>
                <Form.Item
                  name="video"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    listType="picture-card"
                    maxCount={1}
                    beforeUpload={() => false}
                    accept="video/*"
                  >
                    <div className="text-center">
                      <UploadOutlined className="text-lg" />
                      <div className="mt-2">Upload Video</div>
                      <div className="text-xs text-gray-400">MP4, MOV or AVI up to 100MB</div>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            </div>

            {/* <Form.Item
              label={<span className="font-medium">Video Link</span>}
              name="videoLink"
            >
              <Input placeholder="video Link" />
            </Form.Item> */}

            {/* Session Name */}
            <Form.Item
              label={<span className="font-medium">Name</span>}
              name="name"
              rules={[{ required: true, message: 'Please enter the session name' }]}
            >
              <Input placeholder="Session Name" />
            </Form.Item>

            {/* Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Form.Item
                  label={<span className="font-medium">Duration</span>}
                  name="duration"
                  rules={[{ required: true, message: 'Please enter the duration' }]}
                >
                  <div className="flex">
                    <Input type="number" name='duration' placeholder="1" className="flex-grow" />
                    <Form.Item name="durationUnit" noStyle initialValue="minutes">
                      <Radio.Group className="ml-2 flex items-center">
                        <Radio.Button value="minutes">Minutes</Radio.Button>
                        <Radio.Button value="hours">Hours</Radio.Button> {/* Fixed from 'hour' to 'hours' */}
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </Form.Item>
              </div>

              {/* Total Days */}
              {/* <div>
                <Form.Item
                  label={<span className="font-medium">Total day</span>}
                  name="totalDays"
                  rules={[{ required: true, message: 'Please enter total days' }]}
                >
                  <Input placeholder="5" />
                </Form.Item>
              </div> */}
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <p className="font-medium">
                Benefits
                <Tooltip title="Add benefits of this session">
                  <InfoCircleOutlined className="ml-1 text-gray-400" />
                </Tooltip>
              </p>

              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Input
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    placeholder="Strengthens the Chest"
                    className="flex-grow"
                  />
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeBenefit(index)}
                    className="ml-2"
                  />
                </div>
              ))}

              <Button
                type="dashed"
                onClick={addBenefit}
                className="w-full mt-2"
                icon={<PlusOutlined />}
              >
                Add new
              </Button>
            </div>

            {/* Submit Button */}
            <Form.Item className="mt-6">
              <Button type="primary" htmlType="submit" className="bg-red-600 hover:bg-red-700 border-red-600 w-32">
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
