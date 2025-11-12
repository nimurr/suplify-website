'use client';
import { useCreateWorkoutClassMutation } from '@/redux/fetures/Specialist/workoutClass';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
    // Initialize formData with empty values
    const [formData, setFormData] = useState({
        scheduleDate: '', // Empty initial value
        startTime: '', // Empty initial value
        endTime: '', // Empty initial value
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

    const [createWorkoutClass] = useCreateWorkoutClassMutation();
    // Function to convert to UTC with 'Z' for scheduleDate (add 6 hours)
    const convertToUTCWithZ = (datetime) => {
        const date = new Date(datetime);
        date.setHours(date.getHours() + 6); // Add 6 hours
        return date.toISOString(); // Converts to 'YYYY-MM-DDTHH:mm:ssZ' format
    };

    // Function to convert to UTC without 'Z' for startTime and endTime (add 6 hours)
    const convertToUTC = (datetime) => {
        const date = new Date(datetime);
        date.setHours(date.getHours() + 6); // Add 6 hours
        return date.toISOString().split('.')[0]; // Converts to 'YYYY-MM-DDTHH:mm:ss' format without 'Z'
    };

    const route = useRouter();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data:", formData);

        // Convert to UTC before sending data and add 6 hours to each datetime
        const formattedData = {
            ...formData,
            scheduleDate: convertToUTCWithZ(formData.scheduleDate), // Convert scheduleDate to UTC with 'Z' and add 6 hours
            startTime: convertToUTC(formData.startTime), // Convert startTime to UTC without 'Z' and add 6 hours
            endTime: convertToUTC(formData.endTime), // Convert endTime to UTC without 'Z' and add 6 hours
        };
 
        try {
            const response = await createWorkoutClass(formattedData).unwrap();
            console.log(response);
            if (response?.code === 200) {
                toast.success(response?.message);
                setFormData({
                    scheduleDate: '', // Empty initial value
                    startTime: '', // Empty initial value
                    endTime: '', // Empty initial value
                    scheduleName: '',
                    description: '',
                    typeOfLink: '',
                    sessionType: '',
                    meetingLink: '',
                    price: '',
                });
                route.push("/specialistDs/workoutClass");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || "Something went wrong!");
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-md shadow-lg">
            <Toaster />
            <h2 className="text-2xl font-semibold text-center mb-6">Create Workout Session</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Schedule Date */}
                <div>
                    <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700">
                        Schedule Date
                    </label>
                    <input
                        type="datetime-local"
                        id="scheduleDate"
                        name="scheduleDate"
                        value={formData.scheduleDate} // Bind input value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                {/* Start Time (24-hour format with full datetime) */}
                <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                        Start Time
                    </label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime} // Bind input value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                {/* End Time (24-hour format with full datetime) */}
                <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                        End Time
                    </label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        placeholder='Enter end time'
                        name="endTime"
                        value={formData.endTime} // Bind input value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                {/* Schedule Name */}
                <div>
                    <label htmlFor="scheduleName" className="block text-sm font-medium text-gray-700">
                        Schedule Name
                    </label>
                    <input
                        type="text"
                        id="scheduleName"
                        placeholder='Enter schedule name'
                        name="scheduleName"
                        value={formData.scheduleName} // Bind input value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        placeholder='Enter description'
                        name="description"
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
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                        placeholder='Enter Meeting Link'
                        name="meetingLink"
                        value={formData.meetingLink} // Bind input value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                        placeholder='Enter Price '
                        id="price"
                        name="price"
                        value={formData.price} // Bind input value to formData
                        onChange={handleChange} // Update formData on change
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
