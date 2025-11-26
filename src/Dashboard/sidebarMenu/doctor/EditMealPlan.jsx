'use client';

import { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Tooltip, Select } from 'antd';
import { DeleteOutlined, PlusOutlined, InfoCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useCreatePlaneMutation, useGetSinglePlaneQuery, useUpdatePlaneMutation } from '@/redux/fetures/doctor/createPlane';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

const { Title } = Typography;
const { TextArea } = Input;

export default function EditMealPlan() {
  // Get the ID from the URL params
  // const searchParams = new URLSearchParams(window.location.search);
  // const id = searchParams.get('id');

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const navigate = useRouter();

  // Fetch data using id
  const { data } = useGetSinglePlaneQuery(id);
  const mainData = data?.data?.attributes?.results[0] || {}; // Safe check for data

  // State management for form fields
  const [formData, setFormData] = useState({
    planType: '',    // Plan Type: mealPlan, lifeStyleChanges, etc.
    title: '',       // Title of the plan
    description: '', // Description of the plan
    keyPoints: []    // Dynamic key points array
  });

  // Set initial values for form data once the mainData is available
  useEffect(() => {
    if (mainData) {
      setFormData({
        planType: mainData.planType || '',
        title: mainData.title || '',
        description: mainData.description || '',
        keyPoints: mainData.keyPoints || [],
      });
    }
  }, [mainData]);

  // Handle adding a new key point
  const addKeyPoint = () => {
    setFormData((prevState) => ({
      ...prevState,
      keyPoints: [...prevState.keyPoints, ''],
    }));
  };

  // Handle removing a key point
  const removeKeyPoint = (index) => {
    const updatedKeyPoints = [...formData.keyPoints];
    updatedKeyPoints.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      keyPoints: updatedKeyPoints,
    }));
  };

  // Handle change for key points
  const handleKeyPointChange = (value, index) => {
    const updatedKeyPoints = [...formData.keyPoints];
    updatedKeyPoints[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      keyPoints: updatedKeyPoints,
    }));
  };

  // Handle form field change (for title, description)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle the Select dropdown change
  const handleSelectChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      planType: value,
    }));
  };

  const [createPlane, { isLoading }] = useUpdatePlaneMutation();

  // Submit the form
  const onFinish = async () => {
    // Format data for submission
    const submissionData = {
      planType: formData.planType,
      title: formData.title,
      description: formData.description,
      keyPoints: formData.keyPoints,
    };

    console.log('Updated Meal Plan:', submissionData);

    try {
      const res = await createPlane({ submissionData, id });  // Send the form data
      console.log(res);
      if (res?.data?.code === 200) {
        toast.success(res?.data?.message);
        navigate.push('/doctorDs/create-plan');
        setFormData({
          planType: '',
          title: '',
          description: '',
          keyPoints: [],
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update meal plan');
    }
  };

  // Check if the form is valid (all fields must be filled)
  const isFormValid =
    formData.title &&
    formData.planType &&
    formData.description &&
    formData.keyPoints.every((point) => point.trim() !== '');

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toaster />
      <Link href="/doctorDs/create-plan" className="mr-4">
        <Button icon={<ArrowLeftOutlined />} className="flex items-center">
          Back
        </Button>
      </Link>
      <Title level={2} className="mb-6 text-center">Edit Meal Plan</Title>
      <div className="border-t border-gray-200 mb-6"></div>

      <Form
        layout="vertical"
        onFinish={onFinish}
        requiredMark="optional"
      >
        {/* Plan Title */}
        <Form.Item
          name="title"
          className="mb-6"
        >
          <label className="block text-sm font-medium mb-2">
            Title
          </label>
          <Input
            name="title"
            value={formData.title} // Bound to state
            onChange={handleInputChange}
            placeholder="LifeStyle Changes One By Doctor"
            className="rounded py-2"
          />
        </Form.Item>

        {/* Plan Type */}
        <Form.Item
          name="planType"
          className="mb-6"
        >
          <label className="block text-sm font-medium mb-2">
            Plan Type
          </label>
          <Select
            value={formData.planType} // Bound to state
            onChange={handleSelectChange}
            className="rounded py-2 h-14"
          >
            <Select.Option value="mealPlan">Meal Plan</Select.Option>
            <Select.Option value="workOut">Workout</Select.Option>
            <Select.Option value="suppliment">Suppliment</Select.Option>
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
          name="description"
          className="mb-6"
        >
          <label className="block text-sm font-medium mb-2">
            Description
          </label>
          <TextArea
            name="description"
            value={formData.description} // Bound to state
            onChange={handleInputChange}
            placeholder="Enter description about the key point"
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
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
