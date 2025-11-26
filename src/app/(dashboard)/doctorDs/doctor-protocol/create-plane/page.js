'use client'

import { useCreatePlanByDocMutation, useCreatePlaneMutation } from '@/redux/fetures/doctor/createPlane';
import { useAssignProtacoltoPatientMutation, useCreateSearchPlanMutation, useCreateSearchPlanQuery, useGetMyPlansQuery, useGetSingleProtocolQuery, useSearchPlaneQuery, useUpdateProtocolMutation } from '@/redux/fetures/doctor/doctor';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CiCirclePlus, CiEdit, CiSearch } from 'react-icons/ci';

const Page = () => {
    const searchParams = useSearchParams();
    const protocolId = searchParams.get("protocolId");
    const patientId = searchParams.get("patientId"); // Extract patientId from search params

    const [selectedPlan, setSelectedPlan] = useState('mealPlan');
    const { data: myPlans } = useGetMyPlansQuery({ protocolId, patientId, selectedPlan });
    const [myAllPlans, setMyAllPlans] = useState([]);
    const { data } = useGetSingleProtocolQuery(protocolId);
    const mealPlanData = data?.data?.attributes?.results[0] || [];
    const [isEditing, setIsEditing] = useState(false);
    const [mealPlanName, setMealPlanName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newMealPlan, setNewMealPlan] = useState({
        planName: '',
        planType: '',
        keyPoints: [''],
        description: ''
    });

    const [search, setSearch] = useState('');

    useEffect(() => {
        if (mealPlanData?.name) {
            setMealPlanName(mealPlanData?.name);
        }
        setMyAllPlans(myPlans?.data?.attributes?.results);
    }, [mealPlanData, myPlans]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const [updateProtocol] = useUpdateProtocolMutation();
    const handleSave = async () => {
        const data = { name: mealPlanName };
        try {
            const res = await updateProtocol({ protocolId, data });
            if (res?.data?.code === 200) {
                toast.success(res?.data?.message);
                setIsEditing(false);
            } else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update protocol");
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMealPlan((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleKeyPointChange = (index, value) => {
        const updatedKeyPoints = [...newMealPlan.keyPoints];
        updatedKeyPoints[index] = value;
        setNewMealPlan((prevState) => ({
            ...prevState,
            keyPoints: updatedKeyPoints
        }));
    };

    const addKeyPoint = () => {
        setNewMealPlan((prevState) => ({
            ...prevState,
            keyPoints: [...prevState.keyPoints, '']
        }));
    };

    const removeKeyPoint = (index) => {
        const updatedKeyPoints = newMealPlan.keyPoints.filter((_, i) => i !== index);
        setNewMealPlan((prevState) => ({
            ...prevState,
            keyPoints: updatedKeyPoints
        }));
    };

    const [createPlane] = useCreatePlanByDocMutation();
    const handleCreateMealPlan = async (e) => {
        e.preventDefault();
        if (!selectedPlan) return toast.error("Please select a plan type");

        const data = {
            title: newMealPlan.planName,
            planType: selectedPlan,
            keyPoints: newMealPlan.keyPoints,
            description: newMealPlan.description,
            protocolId: protocolId,
            patientId: patientId
        };

        try {
            const res = await createPlane(data);
            console.log(res);
            if (res?.data?.code === 200) {
                toast.success(res?.data?.message);
                toggleModal(); // Close the modal after submission
            } else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.data?.message || "Failed to create meal plan");
        }
    };

    const [searchTitle, setSearchTitle] = useState('');

    const { data: searchData, isLoading } = useSearchPlaneQuery({ type: selectedPlan, title: searchTitle });
    const fullData = searchData?.data?.attributes?.results || [];

    console.log(fullData);

    const handleSearch = (value) => {
        if (!selectedPlan) {
            return toast.error("Please select a plan type");
        }
        setSearch(value);
    };

    const handleSearchNow = async () => {
        setSearchTitle(search);
    };

    // Filter myAllPlans based on selectedPlan
    const filteredPlans = myAllPlans?.filter(plan => plan?.planType === selectedPlan);

    const [assignPlan] = useAssignProtacoltoPatientMutation();

    const handleAssginPlan = async (planId) => {
        console.log(planId?._DoctorPlanId);

        try {
            const res = await assignPlan({ doctorPlanId: planId?._DoctorPlanId, patientId: patientId, protocolId: protocolId });
            console.log(res);
            if (res?.data?.code === 200) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.data?.message || "Failed to assign plan");
        }
    };

    return (

        <div className="flex lg:flex-row flex-col py-10">
            <Toaster />
            {/* Left Sidebar */}
            <div className="lg:w-1/4 bg-white p-4 border border-gray-100 rounded-lg">
                <h2 className="text-xl font-bold flex items-center gap-3 cursor-pointer">
                    {isEditing ? (
                        <input
                            type="text"
                            value={mealPlanName}
                            onChange={(e) => setMealPlanName(e.target.value)}
                            className="border-b-2 w-full border-gray-300 focus:outline-none"
                        />
                    ) : (
                        <>{mealPlanData?.name || mealPlanName} <CiEdit onClick={handleEdit} /></>
                    )}
                    {isEditing && (
                        <button className="xl:px-4 xl:py-2 p-1 bg-blue-500 text-white rounded-lg mt-4" onClick={handleSave}>Save</button>
                    )}
                </h2>
                {/* Plan Types */}
                {['mealPlan', 'workOut', 'suppliment', 'lifeStyleChanges'].map((planType, index) => (
                    <div
                        key={planType}
                        onClick={() => setSelectedPlan(planType)}
                        className={`py-2 px-5 rounded-lg capitalize cursor-pointer my-2 flex items-center gap-5 hover:bg-gray-100 ${selectedPlan === planType ? 'bg-gray-100' : ''}`}
                    >
                        <div className="text-sm font-semibold">{index + 1}</div>
                        <div className="rounded mt-1 w-full">{planType}</div>
                    </div>
                ))}
            </div>

            {/* Right Content */}
            <div className="lg:w-3/4 p-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold capitalize">{selectedPlan}</h3>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2" onClick={toggleModal}>
                        <CiCirclePlus className='text-2xl' /> Create New
                    </button>
                </div>
                <div className="mt-4">
                    <div className="text-sm font-medium">Description</div>
                    <p className='text-sm text-gray-500'>Search for meal plans that you already created</p>
                    <div className='flex items-center justify-between gap-3 my-2'>
                        <div className="w-full relative">
                            <input
                                type="text"
                                onChange={(e) => handleSearch(e.target.value)}
                                className="py-2 px-10 border border-gray-200 rounded w-full"
                                placeholder="Search for plans"
                            />
                            <CiSearch className="absolute text-[#b8b8b8] top-2 text-2xl left-2" />
                        </div>
                        <button onClick={handleSearchNow} className='py-3 px-5 bg-blue-600 text-white rounded-lg '>Search</button>
                    </div>
                </div>
                <div className="mt-4">
                    {isLoading && <p className='text-center my-2'>Loading...</p>}
                    {
                        fullData?.length !== 0 &&
                        <div className="my-4">
                            <h2 className='font-semibold py-1 border-b flex gap-2 items-center'>Search Result <p className='font-normal'>(Select a plan to assign to this patient.)</p></h2>
                            {fullData?.map((item, index) => (
                                <div key={index} onClick={() => handleAssginPlan(item)} className="flex cursor-pointer capitalize justify-between p-2 rounded bg-slate-50 my-2">
                                    <h3>{item?.title}</h3>
                                    <p>{item?.totalKeyPoints} key points</p>
                                </div>
                            ))}
                        </div>
                    }
                    <h2 className='mt-5 font-semibold py-1 border-b'>My Assigned Plans</h2>
                    {filteredPlans?.map((item, index) => (
                        <div key={index} className="flex capitalize justify-between p-2 rounded bg-slate-50 my-2">
                            <h3>{item?.title}</h3>
                            <p>{item?.totalKeyPoints} key points</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Creating New Plan */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999999] bg-gray-600 bg-opacity-50 px-10 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg lg:w-1/3 w-full">
                        <h3 className="text-2xl font-semibold mb-4">Create New Plan</h3>
                        <form onSubmit={handleCreateMealPlan}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="planName">Plan Name *</label>
                                <input
                                    type="text"
                                    id="planName"
                                    name="planName"
                                    value={newMealPlan.planName}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="keyPoints">Key Points *</label>
                                {newMealPlan.keyPoints.map((keyPoint, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            name="keyPoints"
                                            value={keyPoint}
                                            onChange={(e) => handleKeyPointChange(index, e.target.value)}
                                            className="border border-gray-300 rounded p-2 w-full"
                                            required
                                        />
                                        <button type="button" onClick={() => removeKeyPoint(index)} className="text-red-500">Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={addKeyPoint} className="text-blue-500">Add Key Point</button>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="description">Description *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={newMealPlan.description}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={toggleModal}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Add New</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
