'use client';
import React, { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import moment from 'moment/moment';
import { FaRegEdit } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { LuMonitorPlay } from 'react-icons/lu';
import toast, { Toaster } from 'react-hot-toast';

import {
    useGetSingleWorkoutClassQuery,
    useUpdateWorkoutClassMutation,
} from '@/redux/fetures/Specialist/workoutClass';
import url from '@/redux/api/baseUrl';

const { p } = Typography;

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    // Fetch single workout class
    const { data: single, refetch, isFetching } = useGetSingleWorkoutClassQuery(id);
    const workoutClass = single?.data?.attributes;

    // Update mutation
    const [updateWorkoutClass] = useUpdateWorkoutClassMutation();

    /* =======================
       Form State
    ======================= */
    const [formData, setFormData] = useState({
        scheduleName: '',
        description: '',
        sessionType: '',
        classType: '',
        price: '',
        status: '',
        typeOfLink: '',
        meetingLink: '',
        scheduleDate: '',
        startTime: '',
        endTime: '',
    });

    /* =======================
       Populate Form
    ======================= */
    useEffect(() => {
        if (!workoutClass) return;

        setFormData({
            scheduleName: workoutClass.scheduleName || '',
            description: workoutClass.description || '',
            sessionType: workoutClass.sessionType || '',
            classType: workoutClass.classType || '',
            price: workoutClass.price || '',
            status: workoutClass.status || '',
            typeOfLink: workoutClass.typeOfLink || '',
            meetingLink: workoutClass.meetingLink || '',
            scheduleDate: workoutClass.scheduleDate
                ? workoutClass.scheduleDate.split('T')[0]
                : '',
            startTime: workoutClass.startTime
                ? new Date(workoutClass.startTime).toISOString().slice(0, 16)
                : '',
            endTime: workoutClass.endTime
                ? new Date(workoutClass.endTime).toISOString().slice(0, 16)
                : '',
        });
    }, [workoutClass]);

    /* =======================
       Handlers
    ======================= */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toUTCNoZ = (value) => {
        if (!value) return null;
        return new Date(value).toISOString().split('.')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            price: Number(formData.price),
            scheduleDate: toUTCNoZ(formData.scheduleDate),
            startTime: toUTCNoZ(formData.startTime),
            endTime: toUTCNoZ(formData.endTime),
        };

        try {
            const res = await updateWorkoutClass({ id, submissionData: payload }).unwrap();
            toast.success(res?.message || 'Workout class updated');
            refetch();
            router.push('/specialistDs/workoutClass');
        } catch (error) {
            toast.error(error?.data?.message || 'Update failed');
        }
    };

    if (isFetching) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    /* =======================
       UI
    ======================= */
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <Toaster />

            <div className="flex lg:flex-row flex-col items-start gap-6">

                <div className="flex-1 bg-white rounded-md shadow p-6 w-full">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-2xl font-semibold">Edit Workout Session</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Schedule Name */}
                        <div>
                            <label className="block text-sm font-medium">Schedule Name</label>
                            <input
                                type="text"
                                name="scheduleName"
                                value={formData.scheduleName}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="mt-1 w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        {/* Session Type */}
                        <div>
                            <label className="block text-sm font-medium">Session Type</label>
                            <select
                                name="sessionType"
                                value={formData.sessionType}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded-md"
                                required
                            >
                                <option value="">Select</option>
                                <option value="private">Private</option>
                                <option value="group">Group</option>
                            </select>
                        </div>

                        {/* Class Type */}
                        <div>
                            <label className="block text-sm font-medium">Class Type</label>
                            <select
                                name="classType"
                                value={formData.classType}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded-md"
                                required
                            >
                                <option value="">Select</option>
                                <option value="online">Online</option>
                                <option value="inPerson">In Person</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded-md"
                                required
                            >
                                <option value="">Select</option>
                                <option value="available">Available</option>
                                <option value="booked">Booked</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Type of Link */}
                        <div>
                            <label className="block text-sm font-medium">Platform</label>
                            <select
                                name="typeOfLink"
                                value={formData.typeOfLink}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded-md"
                                required
                            >
                                <option value="">Select Platform</option>
                                <option value="googleMeet">Google Meet</option>
                                <option value="zoom">Zoom</option>
                                <option value="teams">Microsoft Teams</option>
                                <option value="skype">Skype</option>
                            </select>
                        </div>

                        {/* Meeting Link */}
                        <div>
                            <label className="block text-sm font-medium">Meeting Link</label>
                            <input
                                type="url"
                                name="meetingLink"
                                value={formData.meetingLink}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        {/* Schedule Date */}
                        <div>
                            <label className="block text-sm font-medium">Schedule Date</label>
                            <input
                                type="date"
                                name="scheduleDate"
                                value={formData.scheduleDate}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        {/* Start Time */}
                        <div>
                            <label className="block text-sm font-medium">Start Time</label>
                            <input
                                type="datetime-local"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        {/* End Time */}
                        <div>
                            <label className="block text-sm font-medium">End Time</label>
                            <input
                                type="datetime-local"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Update Workout
                        </button>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default Page;
