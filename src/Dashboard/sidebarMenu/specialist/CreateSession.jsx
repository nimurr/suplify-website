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
  const specialistId = searchParams.get('specialistId');

  const [createSession, { isLoading }] = useCreateTrainingSessionMutation();

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
        navigate.push(`/specialistDs/program/view?programId=${programId}&specialistId=${specialistId}`);
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
              <Button type="primary" htmlType="submit" className="bg-red-600 flex items-center gap-2 justify-center hover:bg-red-700 border-red-600 w-32">
                Create {isLoading && <div role="status">
                  <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
