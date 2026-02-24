'use client'

import {
    useCreatePlanByDocMutation
} from '@/redux/fetures/doctor/createPlane';
import { RxCross1 } from "react-icons/rx";

import {
    useAssignProtacoltoPatientMutation,
    useDeleteAssignPlanMutation,
    useEditAssignPlanMutation,
    useGetMyPlansQuery,
    useGetSingleProtocolQuery,
    useSearchPlaneQuery,
    useUpdateProtocolMutation
} from '@/redux/fetures/doctor/doctor';
import { Image } from 'antd';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CiCirclePlus, CiEdit, CiSearch } from 'react-icons/ci';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';

const Page = () => {
    const searchParams = useSearchParams();
    const protocolId = searchParams.get("protocolId");
    const patientId = searchParams.get("patientId");

    const [selectedPlan, setSelectedPlan] = useState('mealPlan');

    const { data: myPlans, refetch } = useGetMyPlansQuery({
        protocolId,
        patientId,
        selectedPlan
    });

    const [myAllPlans, setMyAllPlans] = useState([]);

    const { data } = useGetSingleProtocolQuery(protocolId);
    const mealPlanData = data?.data?.attributes?.results[0] || {};

    const [isEditing, setIsEditing] = useState(false);
    const [mealPlanName, setMealPlanName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [newMealPlan, setNewMealPlan] = useState({
        image: [],
        link: '',
        planName: '',
        keyPoints: [''],
        description: ''
    });

    const [search, setSearch] = useState('');
    const [searchTitle, setSearchTitle] = useState('');

    const { data: searchData, isLoading } = useSearchPlaneQuery({
        type: selectedPlan,
        title: searchTitle
    });

    const fullData = searchData?.data?.attributes?.results || [];

    useEffect(() => {
        if (mealPlanData?.name) {
            setMealPlanName(mealPlanData.name);
        }
        setMyAllPlans(myPlans?.data?.attributes?.results || []);
    }, [mealPlanData, myPlans]);

    /* ---------------- UPDATE PROTOCOL NAME ---------------- */
    const [updateProtocol] = useUpdateProtocolMutation();

    const handleEdit = () => setIsEditing(true);

    const handleSave = async () => {
        try {
            const res = await updateProtocol({
                protocolId,
                data: { name: mealPlanName }
            });

            if (res?.data?.code === 200) {
                toast.success(res.data.message);
                setIsEditing(false);
            } else {
                toast.error(res?.data?.message);
            }
        } catch {
            toast.error("Failed to update protocol");
        }
    };

    /* ---------------- INPUT HANDLERS ---------------- */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMealPlan(prev => ({ ...prev, [name]: value }));
    };

    const handleKeyPointChange = (index, value) => {
        const updated = [...newMealPlan.keyPoints];
        updated[index] = value;
        setNewMealPlan(prev => ({ ...prev, keyPoints: updated }));
    };

    const addKeyPoint = () => {
        setNewMealPlan(prev => ({
            ...prev,
            keyPoints: [...prev.keyPoints, '']
        }));
    };

    const removeKeyPoint = (index) => {
        setNewMealPlan(prev => ({
            ...prev,
            keyPoints: prev.keyPoints.filter((_, i) => i !== index)
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // ✅ convert FileList to array

        setNewMealPlan(prev => ({
            ...prev,
            image: files
        }));
    };


    /* ---------------- CREATE PLAN (FIXED) ---------------- */
    const [createPlane] = useCreatePlanByDocMutation();

    const handleCreateMealPlan = async (e) => {
        e.preventDefault();

        if (!selectedPlan) {
            return toast.error("Please select a plan type");
        }

        if (!newMealPlan.planName || !newMealPlan.image) {
            return toast.error("All fields are required");
        }


        const formData = new FormData();

        formData.append("title", newMealPlan.planName);
        formData.append("planType", selectedPlan);
        formData.append("link", newMealPlan.link);
        formData.append("description", newMealPlan.description);
        formData.append("protocolId", protocolId);
        formData.append("patientId", patientId);
        formData.append("keyPoints", JSON.stringify(newMealPlan.keyPoints));

        // ✅ append multiple files correctly
        newMealPlan.image.forEach((file) => {
            formData.append("attachments", file);
        });


        try {
            const res = await createPlane(formData);

            if (res?.data?.code === 200) {
                toast.success(res.data.message);
                setIsModalOpen(false);
                refetch();

                setNewMealPlan({
                    image: [],
                    link: '',
                    planName: '',
                    keyPoints: [''],
                    description: ''
                });
            } else {
                toast.error(res?.data?.message);
            }
        } catch {
            toast.error("Failed to create plan");
        }
    };

    /* ---------------- ASSIGN / DELETE ---------------- */
    const [assignPlan] = useAssignProtacoltoPatientMutation();
    const [deleteAssignPlan] = useDeleteAssignPlanMutation();
    const [editAssignPlan] = useEditAssignPlanMutation();

    const handleAssginPlan = async (item) => {
        const res = await assignPlan({
            doctorPlanId: item?._DoctorPlanId,
            patientId,
            protocolId
        });

        if (res?.data?.code === 200) {
            toast.success(res.data.message);
            refetch();
        }
    };

    const handleDeleteAssignItem = async (item) => {
        const res = await deleteAssignPlan({
            id: item?._planByDoctorId
        });

        if (res?.data?.code === 200) {
            toast.success(res.data.message);
            refetch();
        }
    };

    const [editItems, setEditItems] = useState(null);
    const [isModalOpenForEdit, setIsModalOpenForEdit] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const showModalForEditItems = (item) => {
        setEditItems({
            ...item,
            keyPoints: item.keyPoints || [],
        });

        setPreviewImage(item?.attachments?.[0]?.attachment || null);
        setNewImage(null);
        setIsModalOpenForEdit(true);
    };


    const handleInputChange2 = (e) => {
        const { name, value } = e.target;
        setEditItems((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange2 = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setNewImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setNewImage(null);
        setPreviewImage(null);

        setEditItems((prev) => ({
            ...prev,
            attachments: [],
        }));
    };

    const addKeyPoint2 = () => {
        setEditItems((prev) => ({
            ...prev,
            keyPoints: [...prev.keyPoints, ""],
        }));
    };

    const removeKeyPoint2 = (index) => {
        setEditItems((prev) => ({
            ...prev,
            keyPoints: prev.keyPoints.filter((_, i) => i !== index),
        }));
    };

    const handleKeyPointChange2 = (index, value) => {
        const updatedKeyPoints = [...editItems.keyPoints];
        updatedKeyPoints[index] = value;

        setEditItems((prev) => ({
            ...prev,
            keyPoints: updatedKeyPoints,
        }));
    };




    const handleEditMealPlan = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", editItems.title);
        formData.append("link", editItems.link);
        formData.append("description", editItems.description);
        formData.append("keyPoints", editItems.keyPoints);
        if (newImage) {
            formData.append("attachments", newImage);
        }

        const formWithoutImage = {
            title: editItems.title,
            link: editItems.link,
            description: editItems.description,
            keyPoints: editItems.keyPoints,
        };

        try {
            const res = await editAssignPlan({
                id: editItems?._planByDoctorId,
                data: newImage ? formData : formWithoutImage
            }).unwrap();
            console.log(res);
            if (res?.code === 200) {
                toast.success(res?.message);
                refetch();
                setIsModalOpenForEdit(false);
            }
        } catch (error) {
            toast.error(error?.data?.message || "Failed to edit plan");
        }

        // setIsModalOpenForEdit(false);
    };






    const filteredPlans = myAllPlans.filter(
        plan => plan?.planType === selectedPlan
    );

    console.log(filteredPlans)

    return (
        <div className="flex lg:flex-row flex-col items-start py-10">
            <Toaster />

            {/* LEFT SIDEBAR */}
            <div className="lg:w-1/4 bg-white p-4 border rounded-lg">
                <h2 className="text-xl font-bold flex gap-2 items-center">
                    {isEditing ? (
                        <input
                            value={mealPlanName}
                            onChange={(e) => setMealPlanName(e.target.value)}
                            className="border-b w-full"
                        />
                    ) : (
                        <>
                            {mealPlanName}
                            <CiEdit onClick={handleEdit} />
                        </>
                    )}
                </h2>

                {isEditing && (
                    <button
                        onClick={handleSave}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                    >
                        Save
                    </button>
                )}

                {['mealPlan', 'workOut', 'suppliment', 'lifeStyleChanges', 'labTest'].map((t, i) => (
                    <div
                        key={t}
                        onClick={() => setSelectedPlan(t)}
                        className={`p-2 my-2 cursor-pointer rounded ${selectedPlan === t ? 'bg-gray-100' : ''}`}
                    >
                        {i + 1}. {t}
                    </div>
                ))}
            </div>

            {/* RIGHT CONTENT */}
            <div className="lg:w-3/4 p-8 ">
                <div className="flex justify-between">
                    <h3 className="text-2xl capitalize">{selectedPlan}</h3>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-red-600 flex items-center gap-2 text-white px-4 py-2 rounded"
                    >
                        <CiCirclePlus className='text-xl' /> Create New
                    </button>
                </div>

                <div className="my-4 flex items-center gap-2">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-2 w-full"
                        placeholder="Search plans"
                    />
                    <button
                        onClick={() => setSearchTitle(search)}
                        className=" bg-blue-500 px-4 py-2 text-white rounded"
                    >
                        Search
                    </button>
                </div>

                {isLoading && <p>Loading...</p>}

                {fullData.map((item) => (
                    <div
                        key={item._DoctorPlanId}
                        onClick={() => handleAssginPlan(item)}
                        className="p-2 bg-gray-50 my-2 cursor-pointer"
                    >
                        {item.title}
                    </div>
                ))}

                <h2 className="mt-4 font-bold">My Assigned Plans</h2>

                {filteredPlans?.map((item, i) => (
                    <div key={i} className="flex justify-between bg-gray-100 p-5 rounded-md my-2 relative">
                        <div className='flex gap-10 items-start pr-14'>
                            <div className='!w-14 min-w-14 max-h-56 overflow-y-auto bg-gray-200 rounded-md'>
                                {
                                    item?.attachments?.map((item, i) => (
                                        <Image key={i} className='min-w-14 rounded-md border h-auto overflow-hidden' src={item?.attachment} alt="" />
                                    ))
                                }
                                {/* {
                                    item?.attachments[0]?.attachment &&
                                    <Image className='min-w-14 rounded-md border h-auto overflow-hidden' src={item?.attachments[0]?.attachment} alt="" />
                                } */}
                            </div>
                            <div className='lg:min-w-[80%] mx-auto'>
                                <span className='font-semibold capitalize'>{item?.title}</span>
                                <br />
                                <br />
                                <span className=' capitalize'>{item?.description}</span>
                                <br />
                                <br />
                                <Link href={item?.link} target='_blank' className='text-blue-600 text-xs'>{item?.link || 'No Link'}</Link>
                            </div>
                        </div>
                        <div className='flex items-start gap-2 w-24 -right-8 top-2 absolute'>
                            <div className=''>
                                <FaRegEdit
                                    className="cursor-pointer text-xl  text-green-600"
                                    onClick={() => showModalForEditItems(item)}
                                />
                            </div>
                            <div className=''>
                                <MdOutlineDeleteForever
                                    className="cursor-pointer text-2xl  text-red-600"
                                    onClick={() => handleDeleteAssignItem(item)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[99999]">
                    <form
                        onSubmit={handleCreateMealPlan}
                        className="bg-white p-6 rounded w-full max-w-2xl"
                    >
                        <span className='font-semibold block text-center text-2xl mb-5'>Create New Plan</span>
                        <input
                            name="planName"
                            placeholder="Plan Name"
                            defaultValue={newMealPlan.planName}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-5"
                        />

                        <input
                            name="link"
                            placeholder="Link"
                            defaultValue={newMealPlan.link}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-5"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="mb-5"
                        />

                        {newMealPlan.keyPoints.map((kp, i) => (
                            <input
                                key={i}
                                defaultValue={kp}
                                onChange={(e) => handleKeyPointChange(i, e.target.value)}
                                className="border p-2 w-full mb-5"
                                placeholder={`Key point ${i + 1}`}
                            />
                        ))}

                        <button type="button" onClick={addKeyPoint} className="text-blue-500 mb-5">
                            + Add Key Point
                        </button>

                        <textarea
                            name="description"
                            placeholder="Description"
                            rows={5}
                            defaultValue={newMealPlan.description}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-5"
                        />

                        <div className='flex items-center justify-center gap-2'>
                            <button type="button" onClick={() => setIsModalOpen(false)} className=" text-white bg-red-500 px-4 py-2 rounded w-full border">
                                Cancel
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                                Create Plan
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {isModalOpenForEdit && (
                <div className="fixed inset-0 max-h-screen overflow-y-auto py-20 pt-60 bg-black bg-opacity-40 flex items-center justify-center z-[99999]">
                    <form
                        onSubmit={handleEditMealPlan}
                        className="bg-white p-6 rounded w-full max-w-2xl"
                    >
                        <span className='font-semibold block text-center text-2xl mb-5'>Create New Plan</span>
                        <input
                            name="title"
                            placeholder="Plan Name"
                            defaultValue={editItems.title}
                            onChange={handleInputChange2}
                            className="border p-2 w-full mb-5"
                        />

                        <input
                            name="link"
                            placeholder="Link"
                            defaultValue={editItems.link}
                            onChange={handleInputChange2}
                            className="border p-2 w-full mb-5"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange2}
                            className="mb-5"
                        />
                        {previewImage && (
                            <div className="relative flex justify-center mb-5">
                                <RxCross1
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 text-xl bg-black text-red-500 p-1 rounded cursor-pointer"
                                />
                                <img
                                    src={previewImage}
                                    alt="preview"
                                    className="max-h-48 rounded"
                                />
                            </div>
                        )}


                        {editItems?.keyPoints?.map((kp, i) => (
                            <div key={i} className="flex items-center gap-2 mb-3">
                                <input
                                    defaultValue={kp}
                                    onChange={(e) => handleKeyPointChange2(i, e.target.value)}
                                    className="border p-2 w-full"
                                    placeholder={`Key point ${i + 1}`}
                                />

                                <button
                                    type="button"
                                    onClick={() => removeKeyPoint2(i)}
                                    className="bg-red-500 text-white px-3 py-2 rounded"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}


                        <button
                            type="button"
                            onClick={addKeyPoint2}
                            className="text-blue-500 mb-5"
                        >
                            + Add Key Point
                        </button>


                        <textarea
                            name="description"
                            placeholder="Description"
                            rows={5}
                            defaultValue={editItems.description}
                            onChange={handleInputChange2}
                            className="border p-2 w-full mb-5"
                        />

                        <div className='flex items-center justify-center gap-2'>
                            <button type="button" onClick={() => setIsModalOpenForEdit(false)} className=" text-white bg-red-500 px-4 py-2 rounded w-full border">
                                Cancel
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                                Update Plan
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
};

export default Page;
