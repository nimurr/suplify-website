'use client';

import { useState } from 'react';
import { Form, Input, Button, Typography, Tooltip, Select, Upload } from 'antd';
import { DeleteOutlined, PlusOutlined, InfoCircleOutlined, ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useCreatePlaneMutation } from '@/redux/fetures/doctor/createPlane';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const { Title } = Typography;
const { TextArea } = Input;

export default function CreateMealPlan() {
  const [form] = Form.useForm();

  // Default planType to 'mealPlan' to avoid undefined error
  const [formData, setFormData] = useState({
    planType: 'mealPlan',   
    planName: '',     
    link: '',
    description: '',
    keyPoints: [''],
    image: null
  });

  const router = useRouter();
  const [createPlane] = useCreatePlaneMutation();

  // Key Points handlers
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

  // Other input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Image handler
  const handleImageChange = (file) => {
    setFormData(prev => ({ ...prev, image: file }));
    return false; // Prevent auto-upload
  };

  // Form submission
  const onFinish = async () => {
    // Safety check for valid planType
    if (!['mealPlan','workOut','suppliment','lifeStyleChanges'].includes(formData.planType)) {
      return toast.error('Please select a valid plan type');
    }

    // Validate required fields
    if (!formData.planName || !formData.description || formData.keyPoints.some(k => !k.trim())) {
      return toast.error('Please fill all required fields');
    }

    console.log(formData.planType)

    const submissionData = new FormData();
    submissionData.append('planType', formData.planType);
    submissionData.append('title', formData.planName);
    submissionData.append('link', formData.link);
    submissionData.append('description', formData.description);
    submissionData.append('keyPoints', JSON.stringify(formData.keyPoints));
    if (formData.image) submissionData.append('attachments', formData.image);

    try {
      const res = await createPlane(submissionData);
      console.log(res);

      if (res?.data?.code === 200) {
        toast.success(res.data.message);

        // Reset form
        setFormData({
          planType: 'mealPlan',
          planName: '',
          link: '',
          description: '',
          keyPoints: [''],
          image: null
        });
        form.resetFields();

        // Navigate back after 1 second
        setTimeout(() => router.push('/doctorDs/create-plan'), 1000);
      } else {
        toast.error(res?.error?.data?.message || 'Failed to create plan');
      }
    } catch {
      toast.error('Failed to create plan');
    }
  };

  // Check if form is valid for submit button
  const isFormValid = formData.planName &&
                      formData.planType &&
                      formData.description &&
                      formData.keyPoints.every(k => k.trim() !== '');

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toaster />

      <Link href="/doctorDs/create-plan">
        <Button icon={<ArrowLeftOutlined />} className="mb-4 flex items-center">Back</Button>
      </Link>

      <Title level={2} className="mb-6 text-center">Create Plan</Title>

      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional">

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
            placeholder="Select plan type"
            value={formData.planType}
            onChange={(value) => handleSelectChange(value, 'planType')}
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
            Create
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
}
