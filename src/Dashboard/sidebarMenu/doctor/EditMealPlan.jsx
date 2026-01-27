'use client';

import { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Tooltip, Select, Upload } from 'antd';
import { DeleteOutlined, PlusOutlined, InfoCircleOutlined, ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useGetSinglePlaneQuery, useUpdatePlaneMutation } from '@/redux/fetures/doctor/createPlane';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

const { Title } = Typography;
const { TextArea } = Input;

export default function EditMealPlan() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  // Fetch the existing plan data
  const { data, refetch } = useGetSinglePlaneQuery(id);
  const mainData = data?.data?.attributes?.results[0] || {};

  // Form state
  const [formData, setFormData] = useState({
    planType: 'mealPlan', // default to avoid backend errors
    planName: '',
    link: '',
    description: '',
    keyPoints: [''],
    image: null
  });

  // Set initial values once data is fetched
  useEffect(() => {
    if (mainData) {
      setFormData({
        planType: mainData.planType || 'mealPlan',
        planName: mainData.title || '',
        link: mainData.link || '',
        description: mainData.description || '',
        keyPoints: mainData.keyPoints?.length ? mainData.keyPoints : [''],
        image: null // keep image null; user can upload new one
      });
    }
  }, [mainData]);

  const [updatePlane] = useUpdatePlaneMutation();

  // KeyPoints handlers
  const addKeyPoint = () => setFormData(prev => ({ ...prev, keyPoints: [...prev.keyPoints, ''] }));
  const removeKeyPoint = (index) => {
    const updated = [...formData.keyPoints];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, keyPoints: updated }));
  };
  const handleKeyPointChange = (value, index) => {
    const updated = [...formData.keyPoints];
    updated[index] = value;
    setFormData(prev => ({ ...prev, keyPoints: updated }));
  };

  // Input change handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (value) => setFormData(prev => ({ ...prev, planType: value }));

  // Image handler
  const handleImageChange = (file) => {
    setFormData(prev => ({ ...prev, image: file }));
    return false; // prevent auto-upload
  };

  // Form submission
  const onFinish = async () => {
    if (!['mealPlan', 'workOut', 'suppliment', 'lifeStyleChanges'].includes(formData.planType)) {
      return toast.error('Please select a valid plan type');
    }
    if (!formData.planName || !formData.description || formData.keyPoints.some(k => !k.trim())) {
      return toast.error('Please fill all required fields');
    }

    const submissionData = new FormData();
    submissionData.append('planType', formData.planType);
    submissionData.append('title', formData.planName);
    submissionData.append('link', formData.link);
    submissionData.append('description', formData.description);
    formData.keyPoints.forEach((point) => {
      submissionData.append('keyPoints[]', point);
    });

    if (formData.image) submissionData.append('attachments', formData.image);

    try {
      const res = await updatePlane({ submissionData, id });

      if (res?.data?.code === 200) {
        toast.success(res.data.message);
        refetch();
        setTimeout(() => router.push('/doctorDs/create-plan'), 1000);
      } else {
        toast.error(res?.error?.data?.message || 'Failed to update plan');
      }
    } catch {
      toast.error('Failed to update plan');
    }
  };

  const isFormValid =
    formData.planName &&
    formData.planType &&
    formData.description &&
    formData.keyPoints.every(k => k.trim() !== '');

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toaster />
      <Link href="/doctorDs/create-plan">
        <Button icon={<ArrowLeftOutlined />} className="mb-4 flex items-center">Back</Button>
      </Link>
      <Title level={2} className="mb-6 text-center">Edit Meal Plan</Title>

      <Form layout="vertical" onFinish={onFinish} requiredMark="optional">

        {/* Plan Name */}
        <Form.Item label="Plan Name" className="mb-4">
          <Input
            name="planName"
            value={formData.planName}
            onChange={handleInputChange}
            placeholder="Enter plan name"
          />
        </Form.Item>

        {/* Link */}
        <Form.Item label="Link" className="mb-4">
          <Input
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Enter plan link"
          />
        </Form.Item>

        {/* Plan Type */}
        <Form.Item label="Plan Type" className="mb-4">
          <Select
            value={formData.planType}
            onChange={handleSelectChange}
          >
            <Select.Option value="mealPlan">Meal Plan</Select.Option>
            <Select.Option value="workOut">Workout</Select.Option>
            <Select.Option value="suppliment">Supplement</Select.Option>
            <Select.Option value="lifeStyleChanges">Lifestyle Changes</Select.Option>
          </Select>
        </Form.Item>

        {/* Key Points */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Key Points</label>
          {formData.keyPoints.map((kp, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <Input
                value={kp}
                onChange={(e) => handleKeyPointChange(e.target.value, idx)}
                placeholder={`Key Point ${idx + 1}`}
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => removeKeyPoint(idx)}
                disabled={formData.keyPoints.length === 1}
              />
            </div>
          ))}
          <Button type="dashed" onClick={addKeyPoint} icon={<PlusOutlined />} className="w-full mt-2">Add new</Button>
        </div>

        {/* Description */}
        <Form.Item label={
          <span>
            Description
            <Tooltip title="Provide details about this plan">
              <InfoCircleOutlined className="ml-1" />
            </Tooltip>
          </span>
        } className="mb-4">
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Enter description"
          />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item label="Image" className="mb-4">
          <Upload
            beforeUpload={handleImageChange}
            maxCount={1}
            accept="image/*"
            showUploadList={formData.image ? [{ name: formData.image.name }] : false}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-red-600 hover:bg-red-700"
            disabled={!isFormValid}
          >
            Update
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
}
