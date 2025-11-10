'use client';

import { useState } from 'react';
import { Form, Input, Button, Typography, Tooltip, Select } from 'antd';
import { DeleteOutlined, PlusOutlined, InfoCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useCreatePlaneMutation } from '@/redux/fetures/doctor/createPlane';
import toast, { Toaster } from 'react-hot-toast';

const { Title } = Typography;
const { TextArea } = Input;

export default function CreateMealPlan() {
  const [form] = Form.useForm();
  const [keyPoints, setKeyPoints] = useState(['']); // Explicit typing for keyPoints state

  // State to hold the form data
  const [formData, setFormData] = useState({
    planType: '',   // Plan Type: mealPlan, lifeStyleChanges, etc.
    title: '',      // Title of the plan
    description: '', // Description of the plan
    keyPoints: [''],  // Dynamic key points array
  });

  // Handle adding a new key point
  const addKeyPoint = () => {
    setFormData(prevState => ({
      ...prevState,
      keyPoints: [...prevState.keyPoints, ''],
    }));
  };

  // Handle removing a key point
  const removeKeyPoint = (index) => {
    const updatedKeyPoints = [...formData.keyPoints];
    updatedKeyPoints.splice(index, 1);
    setFormData(prevState => ({
      ...prevState,
      keyPoints: updatedKeyPoints,
    }));
  };

  // Handle change for key points
  const handleKeyPointChange = (value, index) => {
    const updatedKeyPoints = [...formData.keyPoints];
    updatedKeyPoints[index] = value;
    setFormData(prevState => ({
      ...prevState,
      keyPoints: updatedKeyPoints,
    }));
  };

  // Handle change for other form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle the Select dropdown change
  const handleSelectChange = (value, name) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [createPlane, { isLoading }] = useCreatePlaneMutation();

  // Submit the form
  const onFinish = async () => {
    // Submit the formData in the desired format
    const submissionData = {
      planType: formData.planType,
      title: formData.title,      // Title field
      description: formData.description, // Description field
      keyPoints: formData.keyPoints,  // Key points array
    };

    console.log(submissionData);  // This will log the data in the desired format

    try {
      const res = await createPlane(submissionData);  // Send the form data
      console.log(res);
      if (res?.data?.code == 200) {
        toast.success(res?.data?.message)
        formData.planType = '';
        formData.title = '';
        formData.description = '';
        formData.keyPoints = [''];
        setTimeout(() => {
          window.location.href = '/doctorDs/create-plan';
        }, 1500);
      }
      else {
        toast.error(res?.data?.message)
      }



    } catch (error) {
      console.log('Error:', error);
      toast.error('Failed to create meal plan');
    }
  };

  // Check if the form is valid (all fields must be filled)
  const isFormValid = formData.title && formData.planType && formData.description && formData.keyPoints.every(point => point.trim() !== '');

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toaster />
      <Link href="/doctorDs/create-plan" className="mr-4">
        <Button icon={<ArrowLeftOutlined />} className="flex items-center">
          Back
        </Button>
      </Link>
      <Title level={2} className="mb-6 text-center">Create Plan</Title>
      <div className="border-t border-gray-200 mb-6"></div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish} // On form submission
        requiredMark="optional" // Optional mark for non-required fields
      >
        {/* Plan Title */}
        <Form.Item
          name="title" // The key should be 'title' to match your format
          className="mb-6"
        >
          <label className="block text-sm font-medium mb-2">
            Title
          </label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter plan title"
            className="rounded py-2"
          />
        </Form.Item>

        {/* Plan Type */}
        <Form.Item
          name="planType" // The key should be 'planType' to match your format
          className="mb-6"
        >
          <label className="block text-sm font-medium mb-2">
            Plan Type
          </label>
          <Select
            placeholder="Select plan type"
            className="rounded py-2 h-14"
            value={formData.planType}
            defaultValue='mealPlan'
            onChange={(value) => handleSelectChange(value, 'planType')}
          >
            <Select.Option value="mealPlan">Meal Plan</Select.Option>
            <Select.Option value="workOut">Workout</Select.Option>
            <Select.Option value="supplement">Supplement</Select.Option>
            <Select.Option value="lifeStyleChanges">Lifestyle Changes</Select.Option>
          </Select>
        </Form.Item>

        {/* Key Points */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Key Points
          </label>

          {formData.keyPoints.map((point, index) => (
            <div key={index} className="flex items-center mb-3">
              <Input
                value={point}
                onChange={(e) => handleKeyPointChange(e.target.value, index)}
                placeholder="Enter key point"
                className="rounded py-2 flex-grow"
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => removeKeyPoint(index)}
                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                disabled={formData.keyPoints.length === 1}
              />
            </div>
          ))}

          <Button
            type="dashed"
            onClick={addKeyPoint}
            className="w-full mt-2 rounded flex items-center justify-center"
            icon={<PlusOutlined />}
          >
            Add new
          </Button>
        </div>

        {/* Description */}
        <Form.Item
          label={
            <span>
              Description
              <Tooltip title="Provide details about this meal plan">
                <InfoCircleOutlined className="ml-1" />
              </Tooltip>
            </span>
          }
          name="description"
          className="mb-6"
        >
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            rows={4}
            className="rounded"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-red-600 hover:bg-red-700 border-red-600 w-full py-2 font-semibold h-auto rounded"
            disabled={!isFormValid} // Disable submit button if the form is not valid
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
