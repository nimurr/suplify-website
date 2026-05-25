'use client'
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Upload, Radio, Tooltip, Image } from 'antd';
import { UploadOutlined, DeleteOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import BackHeader from '@/components/customComponent/BackHeader';
import {
    useCreateTrainingSessionMutation,
    useUpdateTrainingSessionMutation,
    useGetSessionByIdQuery,
} from '@/redux/fetures/Specialist/traningProgram';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const [benefits, setBenefits] = useState(['']);
    const [existingPhoto, setExistingPhoto] = useState(null);   // { url, id }
    const [existingVideo, setExistingVideo] = useState(null);   // { url, id }
    const [form] = Form.useForm();

    /* ─── URL params ─────────────────────────────────────────── */
    const searchParams = useSearchParams();
    const programId = searchParams.get('programId');
    const sessionId = searchParams.get('sessionId');
    const isEditMode = Boolean(sessionId);

    /* ─── Queries / mutations ────────────────────────────────── */
    const [createSession] = useCreateTrainingSessionMutation();
    const [updateSession] = useUpdateTrainingSessionMutation();
    const { data: sessionData } = useGetSessionByIdQuery(sessionId, { skip: !sessionId });

    /* ─── Pre-populate form when session data loads ──────────── */
    useEffect(() => {
        const d = sessionData?.data?.attributes ?? sessionData?.data;
        if (!d) return;

        // Text fields
        form.setFieldsValue({
            name: d.title ?? '',
            duration: d.duration ?? '',
            durationUnit: d.durationUnit ?? 'minutes',
            // totalDays: d.totalDays ?? '',
            videoLink: d.externalLink ?? d.external_link ?? '',
        });

        // Benefits
        if (Array.isArray(d.benefits) && d.benefits.length > 0) {
            setBenefits(d.benefits);
        }

        // Existing cover photo
        if (Array.isArray(d.coverPhotos) && d.coverPhotos.length > 0) {
            setExistingPhoto({
                url: d.coverPhotos[0].attachment,
                id: d.coverPhotos[0]._attachmentId,
            });
        }

        // Existing video attachment
        if (Array.isArray(d.attachments) && d.attachments.length > 0) {
            setExistingVideo({
                url: d.attachments[0].attachment,
                id: d.attachments[0]._attachmentId,
            });
        }
    }, [sessionData, form]);

    /* ─── Benefits helpers ───────────────────────────────────── */
    const addBenefit = () => setBenefits(prev => [...prev, '']);
    const removeBenefit = (i) => setBenefits(prev => prev.filter((_, idx) => idx !== i));
    const updateBenefit = (i, value) => setBenefits(prev => prev.map((b, idx) => idx === i ? value : b));

    /* ─── Form submit ────────────────────────────────────────── */
    const handleSubmit = async (values) => {
        // Validate: must have a video source
        const hasNewVideo = values.video?.[0]?.originFileObj;
        const hasOldVideo = Boolean(existingVideo);
        const hasVideoLink = Boolean(values.videoLink?.trim());

        // if (!hasNewVideo && !hasOldVideo && !hasVideoLink) {
        //     return toast.error('Please upload a video or provide a video link.');
        // }

        const formData = new FormData();

        if (!isEditMode) {
            formData.append('trainingProgramId', programId);
        }
        formData.append('title', values.name);
        formData.append('duration', values.duration);
        formData.append('durationUnit', values.durationUnit);

        // if (values.totalDays) {
        //     formData.append('totalDays', values.totalDays);
        // }

        benefits.filter(Boolean).forEach(b => formData.append('benefits', b));

        // New photo upload
        if (values.photo?.[0]?.originFileObj) {
            formData.append('coverPhotos', values.photo[0].originFileObj);
        }

        // New video upload
        if (hasNewVideo) {
            formData.append('attachments', values.video[0].originFileObj);
        }

        // Video link (only when no file)
        if (!hasNewVideo && hasVideoLink) {
            formData.append('external_link', values.videoLink.trim());
        }

        try {
            const response = isEditMode
                ? await updateSession({ id: sessionId, data: formData })
                : await createSession(formData);

            console.log(response)

            if (response?.error?.data?.message) {
                return toast.error(response.error.data.message);
            }


            if (response?.data?.message) {
                toast.success(response.data.message);
                if (!isEditMode) {
                    form.resetFields();
                    setBenefits(['']);
                    setExistingPhoto(null);
                    setExistingVideo(null);
                }
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong!');
        }
    };

    const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

    /* ─── Render ─────────────────────────────────────────────── */
    return (
        <div>
            <BackHeader title={isEditMode ? 'Update Session' : 'Create Session'} />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <div className="border-t border-gray-200 pt-6">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        requiredMark
                    >
                        {/* ── Media uploads ── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">

                            {/* Photo */}
                            <div>
                                <p className="mb-2 font-medium">Photo</p>

                                {/* Show existing photo when no new file chosen */}
                                {existingPhoto && (
                                    <div className="mb-2 relative inline-block">
                                        <Image
                                            src={existingPhoto.url}
                                            alt="Current cover"
                                            width={102}
                                            height={102}
                                            className="rounded object-cover border"
                                        />
                                        <Button
                                            size="small"
                                            danger
                                            icon={<DeleteOutlined />}
                                            className="absolute -top-2 -right-2"
                                            onClick={() => setExistingPhoto(null)}
                                        />
                                    </div>
                                )}

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
                                            <div className="mt-2 text-sm">
                                                {existingPhoto ? 'Replace Photo' : 'Upload Photo'}
                                            </div>
                                            <div className="text-xs text-gray-400">PNG, JPEG or JPG up to 10 MB</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                            </div>

                            {/* Video */}
                            <div>
                                <p className="mb-2 font-medium">Video</p>

                                {/* Show existing video preview */}
                                {existingVideo && (
                                    <div className="mb-2 flex items-center gap-2">
                                        <video
                                            src={existingVideo.url}
                                            className="w-[102px] h-[102px] rounded border object-cover"
                                            controls={false}
                                            muted
                                        />
                                        <Button
                                            size="small"
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => setExistingVideo(null)}
                                        />
                                    </div>
                                )}

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
                                            <div className="mt-2 text-sm">
                                                {existingVideo ? 'Replace Video' : 'Upload Video'}
                                            </div>
                                            <div className="text-xs text-gray-400">MP4, MOV or AVI up to 100 MB</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                            </div>
                        </div>

                        {/* Video Link */}
                        <Form.Item
                            label={<span className="font-medium">Video Link</span>}
                            name="videoLink"
                        >
                            <Input placeholder="https://youtube.com/..." />
                        </Form.Item>

                        {/* Session Name */}
                        <Form.Item
                            label={<span className="font-medium">Name</span>}
                            name="name"
                            rules={[{ required: true, message: 'Please enter the session name' }]}
                        >
                            <Input placeholder="Session Name" />
                        </Form.Item>

                        {/* Duration + Total Days */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Form.Item
                                label={<span className="font-medium">Duration</span>}
                                name="duration"
                                rules={[{ required: true, message: 'Please enter the duration' }]}
                            >
                                <div className="flex">
                                    <Input
                                        type="number"
                                        placeholder="1"
                                        className="flex-grow"
                                        // Forward onChange to the Form.Item correctly
                                        onChange={(e) => form.setFieldValue('duration', e.target.value)}
                                    />
                                    <Form.Item name="durationUnit" noStyle initialValue="minutes">
                                        <Radio.Group className="ml-2 flex items-center">
                                            <Radio.Button value="minutes">Minutes</Radio.Button>
                                            <Radio.Button value="hours">Hours</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                            </Form.Item>

                            {/* <Form.Item
                                label={<span className="font-medium">Total Days</span>}
                                name="totalDays"
                                rules={[{ required: true, message: 'Please enter total days' }]}
                            >
                                <Input type="number" placeholder="5" />
                            </Form.Item> */}
                        </div>

                        {/* Benefits */}
                        <div className="mb-6">
                            <p className="font-medium mb-2">
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
                                        placeholder="e.g. Strengthens the Chest"
                                        className="flex-grow"
                                    />
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => removeBenefit(index)}
                                        disabled={benefits.length === 1}
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

                        {/* Submit */}
                        <Form.Item className="mt-6">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-red-600 hover:bg-red-700 border-red-600 w-32"
                            >
                                {isEditMode ? 'Update' : 'Create'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};