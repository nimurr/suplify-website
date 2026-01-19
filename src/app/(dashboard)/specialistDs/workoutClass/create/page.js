'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { useCreateWorkoutClassMutation, useGetAllHospotsQuery } from '@/redux/fetures/Specialist/workoutClass';

// Week days mapping (BACKEND FORMAT)
const WEEK_DAYS = [
    { label: 'Monday', value: 'MONDAY' },
    { label: 'Tuesday', value: 'TUESDAY' },
    { label: 'Wednesday', value: 'WEDNESDAY' },
    { label: 'Thursday', value: 'THURSDAY' },
    { label: 'Friday', value: 'FRIDAY' },
    { label: 'Saturday', value: 'SATURDAY' },
    { label: 'Sunday', value: 'SUNDAY' },
];

const Page = () => {
    const router = useRouter();
    const { data } = useGetAllHospotsQuery();
    const [createWorkoutClass] = useCreateWorkoutClassMutation();
    const fullData = data?.data?.attributes || [];


    const [formData, setFormData] = useState({
        scheduleType: '',
        weekDays: [],
        durationWeeks: 1,

        hotspotId: '',

        scheduleDate: '',
        startTime: '',
        endTime: '',
        classType: 'online',

        scheduleName: '',
        description: '',
        typeOfLink: '',
        sessionType: '',
        meetingLink: '',
        price: '',
    });

    // ------------------ HELPERS ------------------
    const toISODateWithZ = (date) => {
        return new Date(date).toISOString(); // YYYY-MM-DDTHH:mm:ssZ
    };

    const toUTCTimeNoZ = (datetime) => {
        return new Date(datetime).toISOString().split('.')[0]; // YYYY-MM-DDTHH:mm:ss
    };

    const onlyDate = (date) => {
        return new Date(date).toISOString().split('T')[0]; // YYYY-MM-DD
    };

    // ------------------ HANDLERS ------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleWeekDayToggle = (day) => {
        setFormData(prev => ({
            ...prev,
            weekDays: prev.weekDays.includes(day)
                ? prev.weekDays.filter(d => d !== day)
                : [...prev.weekDays, day],
        }));
    };

    // ------------------ SUBMIT ------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.scheduleType) {
            return toast.error('Select schedule type');
        }

        const payload = {
            scheduleName: formData.scheduleName,
            scheduleType: formData.scheduleType,
            scheduleDate: toISODateWithZ(formData.scheduleDate),

            classType: formData.classType,

            startTime: toUTCTimeNoZ(formData.startTime),
            endTime: toUTCTimeNoZ(formData.endTime),

            description: formData.description,


            sessionType: formData.sessionType,
            price: formData.price,
        };

        // ONE TIME
        if (formData.scheduleType === 'oneTime') {
            payload.scheduleDate = toISODateWithZ(formData.scheduleDate);
        }

        if(formData.classType === 'online'){
            payload.meetingLink = formData.meetingLink;
            payload.typeOfLink = formData.typeOfLink;
        }

        // REPEAT
        if (formData.scheduleType === 'repeat') {
            if (!formData.weekDays.length) {
                return toast.error('Select at least one weekday');
            }

            payload.repeatRule = {
                weekDays: formData.weekDays,
                startDate: onlyDate(formData.scheduleDate),
                durationWeeks: Number(formData.durationWeeks),
            };
        }
        if (formData.classType === 'inPerson') {
            payload.hotspotId = formData.hotspotId;
            delete payload.meetingLink;
            delete payload.typeOfLink;
        }

        try {
            const res = await createWorkoutClass(payload).unwrap();
            console.log(res)
            toast.success(res?.message || 'Workout created successfully');
            router.push('/specialistDs/workoutClass');
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    // ------------------ UI ------------------
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
            <Toaster />
            <h2 className="text-2xl font-semibold mb-6 text-center">Create Workout Session</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <span className='mt-2 font-semibold block'>Schedule Type</span>

                {/* Schedule Type */}
                <select
                    name="scheduleType"
                    value={formData.scheduleType}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                >
                    <option value="">Select Schedule Type</option>
                    <option value="oneTime">One Time</option>
                    <option value="repeat">Repeat</option>
                </select>



                {/* Week Days */}
                {formData.scheduleType === 'repeat' && (
                    <div>
                        <p className="font-medium mb-2">Select Days</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {WEEK_DAYS.map(day => (
                                <label key={day.value} className="flex items-center gap-2 border p-2 rounded">
                                    <input
                                        type="checkbox"
                                        checked={formData.weekDays.includes(day.value)}
                                        onChange={() => handleWeekDayToggle(day.value)}
                                    />
                                    {day.label}
                                </label>
                            ))}
                        </div>
                        <span className='mt-2 font-semibold block'>Schedule Duration ( Weeks )</span>
                        <input
                            type="number"
                            name="durationWeeks"
                            min="1"
                            value={formData.durationWeeks}
                            onChange={handleChange}
                            className="w-full mt-3 p-3 border rounded"
                            placeholder="Duration Weeks"
                        />
                    </div>
                )}

                <span className='mt-2 font-semibold block'>Class Type</span>
                <select
                    name="classType"
                    value={formData.classType}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                >
                    <option value="">Select Class Type</option>
                    <option value="online">Online</option>
                    <option value="inPerson">In Person</option>
                </select>

                {
                    /* class type is inPerson then show derp down all the fields below */
                    formData.classType === 'inPerson' && (
                        <>
                            <span className='mt-2 font-semibold block'>Hospots</span>
                            <select
                                name="hotspotId"
                                value={formData.hotspotId}
                                onChange={handleChange}
                                className="w-full p-3 border rounded"
                                required
                            >

                                <option disabled value="">Select Hotspot</option>
                                {
                                    fullData.map(hotspot => (
                                        <option key={hotspot._SuplifyHotspotId} value={hotspot._SuplifyHotspotId}>{hotspot.name}</option>
                                    ))
                                }
                            </select>
                        </>
                    )
                }

                <span className='mt-2 font-semibold block'>Schedule Date</span>
                <input type="date" name="scheduleDate" onChange={handleChange} required className="w-full p-3 border rounded" />
                <span className='mt-2 font-semibold block'>Schedule Start Time</span>
                <input type="datetime-local" name="startTime" onChange={handleChange} required className="w-full p-3 border rounded" />
                <span className='mt-2 font-semibold block'>Schedule End Time</span>
                <input type="datetime-local" name="endTime" onChange={handleChange} required className="w-full p-3 border rounded" />

                <span className='mt-2 font-semibold block'>Schedule Name</span>
                <input name="scheduleName" placeholder="Schedule Name" onChange={handleChange} required className="w-full p-3 border rounded" />
                <span className='mt-2 font-semibold block'>Schedule Description</span>
                <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full p-3 border rounded" />

                {
                    formData.classType === 'online' && (
                        <>
                            <span className='mt-2 font-semibold block'>Schedule Link</span>
                            <select name="typeOfLink" onChange={handleChange} required className="w-full p-3 border rounded">
                                <option value="">Select Link Type</option>
                                <option value="googleMeet">Google Meet</option>
                                <option value="zoom">Zoom</option>
                            </select>

                            <input name="meetingLink" placeholder="Meeting Link" onChange={handleChange} required className="w-full p-3 border rounded" />
                        </>
                    )
                }

                <span className='mt-2 font-semibold block'>Session Type</span>
                <select name="sessionType" onChange={handleChange} required className="w-full p-3 border rounded">
                    <option value="">Session Type</option>
                    <option value="private">Private</option>
                    <option value="group">Group</option>
                </select>
                <input name="price" type="number" placeholder="Price" onChange={handleChange} required className="w-full p-3 border rounded" />

                <button className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Page;
