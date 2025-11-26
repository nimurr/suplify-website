'use client';
import { useGetSingleWorkoutClassQuery, useUpdateWorkoutClassMutation } from '@/redux/fetures/Specialist/workoutClass';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
    // Get id from URL
    // const searchParams = new URLSearchParams(window.location.search);
    // const id = searchParams.get('id');

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const navigate = useRouter();

    // Fetch workout class data
    const { data: single, refetch } = useGetSingleWorkoutClassQuery(id);
    const workoutClass = single?.data?.attributes;

    // Initialize form data with default values
    const [formData, setFormData] = useState({
        scheduleName: '',
        description: '',
        typeOfLink: '',
        sessionType: '',
        meetingLink: '',
        price: '',
        startTime: '',
        endTime: '',
    });

    // Handle form data change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Update formData as user inputs data
        });
    };

    // Function to convert to UTC format and add 6 hours
    const convertToUTC = (datetime) => {
        const date = new Date(datetime);
        date.setHours(date.getHours() + 6); // Add 6 hours
        return date.toISOString().split('.')[0]; // Converts to 'YYYY-MM-DDTHH:mm:ss' format without 'Z'
    };

    // Populate form data when fetched
    useEffect(() => {
        if (single) {
            setFormData({
                scheduleName: workoutClass.scheduleName,
                description: workoutClass.description,
                typeOfLink: workoutClass.typeOfLink,
                sessionType: workoutClass.sessionType,
                meetingLink: workoutClass.meetingLink,
                price: workoutClass.price,
                startTime: workoutClass.startTime,
                endTime: workoutClass.endTime,
            });
        }
    }, [single]);

    const [createWorkoutClass] = useUpdateWorkoutClassMutation();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data:", formData);

        // Convert start and end times to UTC and add 6 hours
        const formattedData = {
            ...formData,
            startTime: convertToUTC(formData.startTime), // Convert start time to UTC with 6 hours added
            endTime: convertToUTC(formData.endTime),     // Convert end time to UTC with 6 hours added
        };

        console.log('Formatted Data:', formattedData); // Log to check format

        try {
            const response = await createWorkoutClass({ submissionData: formattedData, id }).unwrap();
            console.log(response);
            if (response?.code === 200) {
                toast.success(response?.message);
                refetch();
                navigate.push(`/specialistDs/workoutClass`);

                // window.location.href = `/specialistDs/workoutClass`; // Redirect after success
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 my-5 bg-gray-50 border-[#eee] border rounded-md shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Update Workout Session</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder='Description Here ...'
                        value={formData.description} // Bind input value to formData
                        onChange={handleChange} // Update formData on change
                        rows="4"
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                {/* Type of Link */}
                <div>
                    <label htmlFor="typeOfLink" className="block text-sm font-medium text-gray-700">
                        Type of Link
                    </label>
                    <select
                        id="typeOfLink"
                        name="typeOfLink"
                        value={formData.typeOfLink} // Bind select value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    >
                        <option value="">Select Link Type</option>
                        <option value="googleMeet">Google Meet</option>
                        <option value="zoom">Zoom</option>
                        <option value="teams">Microsoft Teams</option>
                        <option value="skype">Skype</option>
                    </select>
                </div>

                {/* Session Type */}
                <div>
                    <label htmlFor="sessionType" className="block text-sm font-medium text-gray-700">
                        Session Type
                    </label>
                    <select
                        id="sessionType"
                        name="sessionType"
                        value={formData.sessionType} // Bind select value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    >
                        <option value="">Select Session Type</option>
                        <option value="private">Private</option>
                        <option value="group">Group</option>
                    </select>
                </div>

                {/* Meeting Link */}
                <div>
                    <label htmlFor="meetingLink" className="block text-sm font-medium text-gray-700">
                        Meeting Link
                    </label>
                    <input
                        type="url"
                        id="meetingLink"
                        name="meetingLink"
                        placeholder='Meeting Link Here ...'
                        value={formData.meetingLink} // Bind input value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price ($)
                    </label>
                    <input
                        type="number"
                        id="price"
                        placeholder='Price $'
                        name="price"
                        value={formData.price} // Bind input value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Page;