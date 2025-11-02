'use client';
import { useGetSingleWorkoutClassQuery, useUpdateWorkoutClassMutation } from '@/redux/fetures/Specialist/workoutClass';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
    // get id from url
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');

    const { data: single, refetch } = useGetSingleWorkoutClassQuery(id);
    const workoutClass = single?.data?.attributes;
    console.log(workoutClass);
    useEffect(() => {
        if (single) {
            setFormData({
                scheduleName: workoutClass.scheduleName,
                description: workoutClass.description,
                typeOfLink: workoutClass.typeOfLink,
                sessionType: workoutClass.sessionType,
                meetingLink: workoutClass.meetingLink,
                price: workoutClass.price,
            });
        }
    }, [single])

    // Initialize formData with empty values
    const [formData, setFormData] = useState({
        scheduleName: '',
        description: '',
        typeOfLink: '',
        sessionType: '',
        meetingLink: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Update formData as user inputs data
        });
    };



    const [createWorkoutClass] = useUpdateWorkoutClassMutation();
    // Function to convert to the correct UTC format
    const convertToUTC = (datetime) => {
        const date = new Date(datetime);
        return date.toISOString().split('.')[0]; // Converts to 'YYYY-MM-DDTHH:mm:ssZ' format
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data:", formData);

        // Convert to UTC before sending data
        const formattedData = {
            ...formData,
        };

        console.log('Formatted Data:', formattedData); // Log to check format

        try {
            const response = await createWorkoutClass({ submissionData: formattedData, id }).unwrap();
            console.log(response);
            if (response?.code === 200) {
                toast.success(response?.message);
                refetch();

                window.location.href = `/specialistDs/workoutClass`
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 my-5 bg-gray-50 border-[#eee] border rounded-md shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Create Workout Session</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Schedule Date */}


                {/* Start Time (24-hour format with full datetime) */}
                {/* <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                        Start Time
                    </label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime} // Bind input value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div> */}

                {/* End Time (24-hour format with full datetime) */}
                {/* <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                        End Time
                    </label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        name="endTime"
                        value={formData.endTime} // Bind input value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div> */}

                {/* Schedule Name */}
                {/* <div>
                    <label htmlFor="scheduleName" className="block text-sm font-medium text-gray-700">
                        Schedule Name
                    </label>
                    <input
                        type="text"
                        id="scheduleName"
                        name="scheduleName"
                        value={formData.scheduleName} // Bind input value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div> */}

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder='Description Here ...'
                        defaultValue={formData.description} // Bind input value to formData
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
                        defaultValue={formData.meetingLink} // Bind input value to formData
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
                        defaultValue={formData.price} // Bind input value to formData
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
