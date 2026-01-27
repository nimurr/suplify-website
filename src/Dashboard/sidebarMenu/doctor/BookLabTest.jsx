'use client';
import React, { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { Modal, Button, Image } from 'antd';
 
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast'; 
import { useGetBookedLavTestQuery, useUpdateBookedLavTestMutation, useUpdateImageLabTestMutation } from '@/redux/fetures/BookedLavTest/BookedLavTest';
import url from '@/redux/api/baseUrl';

const BookLabTest = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [selectStatus, setSelectStatus] = useState(null);  // To store the selected status
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    // Fetching data from the API
    const { data, isLoading, refetch } = useGetBookedLavTestQuery();
    const fullData = data?.data?.attributes?.results; // Assuming data structure from your response

    const [updateStatus] = useUpdateBookedLavTestMutation();


    const showModal = (test) => {
        setSelectedTest(test);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedTest(null);
    };

    const handleStatusChange = async (e) => {


        try {
            const res = await updateStatus({ data: { status: e.target.value }, id: selectedTest._LabTestBookingId });
            console.log("Status updated successfully:", res);
            if (res.data?.code === 200) {
                toast.success("Status updated successfully");
                // modal close and data refetch
                setIsModalVisible(false);
            }

        } catch (error) {
            console.error("Error updating status:", error);
        }


    };

    // Pagination logic: slice the data to show only the items for the current page
    const currentData = fullData?.slice(
        (pagination.current - 1) * pagination.pageSize,
        pagination.current * pagination.pageSize
    );

    // Handle change of page
    const handlePaginationChange = (direction) => {
        setPagination((prev) => {
            const newPage = direction === 'next' ? prev.current + 1 : prev.current - 1;
            return {
                ...prev,
                current: newPage,
            };
        });
    };
    const [inputImage, setInputImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setInputImage(file);
        }
    };
    const [updateLabtestImage] = useUpdateImageLabTestMutation();

    const submitImage = async (id) => {
        const formData = new FormData();
        if (!inputImage) return toast.error('Please select an image');

        formData.append('uploadedResults', inputImage);
        console.log(inputImage)

        try {
            const res = await updateLabtestImage({ data: formData, id: id }).unwrap();
            console.log(res)
            if (res?.code == 200) {
                toast.success(res?.message);
                refetch();
                setIsModalVisible(false);
            }
            else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }



    }

    return (
        <div>
            <Toaster />
            <h1 className="text-xl font-semibold mb-6">Booked Lab Test</h1>

            <div className="overflow-x-auto bg-white border border-[#f0f0f0] rounded-lg">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-[#b4b4b4] text-primaryBg">
                        <tr>
                            <th className="py-3 px-4 text-sm font-semibold">#Latest Booking id</th>
                            <th className="py-3 px-4 text-sm font-semibold">Test Name</th>
                            <th className="py-3 px-4 text-sm font-semibold">Appointment Date</th>
                            <th className="py-3 px-4 text-sm font-semibold">Result Uploaded</th>
                            <th className="py-3 px-4 text-sm font-semibold">Address</th>
                            <th className="py-3 px-4 text-sm font-semibold">Transaction Id</th>
                            <th className="py-3 px-4 text-sm font-semibold">Payment Status</th>
                            <th className="py-3 px-4 text-sm font-semibold">Booking Status</th>
                            <th className="py-3 px-4 text-sm font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentData?.map((test, index) => (
                            <tr key={index} className="border-b border-[#ececec] hover:bg-[#fff4f4]">
                                <td className="py-3 px-4 text-gray-700 text-sm">{test._LabTestBookingId}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{test.category}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{moment(test.appointmentDate).format('dddd, MMMM Do YYYY')}</td>
                                <td className={
                                    `py-3 px-4 text-gray-700 text-center text-sm font-semibold 
                                            ${test.isResultUploaded && 'text-[green] '
                                    || test.isResultUploaded && 'text-[red] '}`
                                }>{test.uploadedResults[0]?.attachment ? 'Uploaded ' : 'Not Uploaded'}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{test.address}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{test.paymentTransactionId}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{test.paymentStatus}</td>
                                <td className="py-3 px-4 text-sm font-medium">
                                    <span
                                        className={
                                            test.status === 'Delivered' && 'text-[green]'
                                            || test.status === 'Pending' && 'text-[orange]'
                                            || test.status === 'Canceled' && 'text-[red]'
                                        }
                                    >
                                        {test.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <IoEyeOutline
                                        onClick={() => showModal(test)}
                                        className="w-5 h-5 text-black cursor-pointer inline"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isLoading ? (
                    <div className='text-center flex items-center justify-center py-2'>
                        <span className='text-center py-3'>Loading...</span>
                    </div>
                ) : null}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-end items-center mt-4">
                <button
                    onClick={() => handlePaginationChange('prev')}
                    disabled={pagination.current === 1}
                    className="px-4 py-2 bg-[#ff0909] text-primaryBg rounded mr-2 disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {pagination.current} of {Math.ceil(fullData?.length / pagination.pageSize)}
                </span>
                <button
                    onClick={() => handlePaginationChange('next')}
                    disabled={pagination.current === Math.ceil(fullData?.length / pagination.pageSize)}
                    className="px-4 py-2 bg-[#ff0909] text-primaryBg rounded ml-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal for Test Details */}
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={500}
            >
                {selectedTest && (
                    <div className="mt-8">
                        <div className="mb-4 space-y-3">
                            <div className="space-y-2">
                                <p className="flex items-center gap-2 justify-between">
                                    <strong>Lab test booking ID:</strong> {selectedTest._LabTestBookingId}
                                </p>
                                <p className="flex items-center gap-2 justify-between">
                                    <strong>Appointment date:</strong> {moment(selectedTest.appointmentDate).format('dddd, MMMM Do YYYY')}
                                </p>
                                <p className="flex items-center gap-2 justify-between">
                                    <strong>Start time:</strong> {new Date(selectedTest.startTime).toLocaleTimeString()}
                                </p>
                                <p className="flex items-center gap-2 justify-between">
                                    <strong>End time:</strong> {new Date(selectedTest.endTime).toLocaleTimeString()}
                                </p>
                                <p className="flex items-center gap-2 justify-between">
                                    <strong>Address:</strong> {selectedTest.address}
                                </p>
                                <p className="flex items-center gap-2 justify-between">
                                    <strong>City:</strong> {selectedTest.city}
                                </p>
                                <p className="flex items-center gap-2 justify-between">
                                    <strong>State:</strong> {selectedTest.state}
                                </p>
                                <p className="flex items-center gap-2 justify-between">
                                    <strong>Zip code:</strong> {selectedTest.zipCode}
                                </p>
                                <p className="flex items-center gap-2 justify-between">
                                    <strong>Transaction ID:</strong> {selectedTest.paymentTransactionId}
                                </p>
                            </div>
                            <hr />
                            <div>
                                <p className="flex items-center gap-2 justify-between">
                                    <strong>Patient name:</strong> {selectedTest.patientId?.name}
                                </p>
                                <p className="flex items-center gap-2 justify-between">
                                    <strong>Patient Image:</strong> <img src={selectedTest.patientId?.profileImage?.imageUrl.includes('amazonaws') ? selectedTest.patientId?.profileImage?.imageUrl : (url + selectedTest.patientId?.profileImage?.imageUrl)} className={"w-10 rounded-full h-10"} alt="" />
                                </p>

                            </div>
                            <hr />
                            {
                                selectedTest.isResultUploaded &&
                                <div>
                                    <div>
                                        <p className="flex items-center gap-2 justify-between">
                                            <strong>Result Uploaded:</strong>
                                            <span className={
                                                `py-3 px-4 text-gray-700 text-center text-sm font-semibold 
                                            ${selectedTest.isResultUploaded && 'text-[green] bg-[#14ec143b] rounded-md'
                                                || selectedTest.isResultUploaded && 'text-[red] '}`
                                            }>{selectedTest.uploadedResults[0]?.attachment ? 'Uploaded ' : 'Not Uploaded'}</span>
                                        </p>
                                        <p className="">
                                            <strong>Uploaded Image:</strong>
                                            <Image className='h-[320px] object-cover w-full mt-5' src={selectedTest.uploadedResults[0]?.attachment} alt="" />
                                        </p>

                                    </div>
                                    <hr />
                                </div>
                            }

                            <div className="flex items-start justify-between flex-wrap gap-5">
                                <h2><strong>Status</strong></h2>
                                <select
                                    defaultValue={selectedTest.status}
                                    onChange={handleStatusChange}  // Handle the change event
                                    className="border border-[#eee] bg-[#e88c31] text-primaryBg outline-none focus:right-0 px-8 py-1.5 rounded-lg"
                                    name="status"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Canceled">Canceled</option>
                                </select>
                            </div>

                            <div>
                                <input onChange={handleImageChange} type="file" name="image" id="" />
                                <br />
                                <button onClick={() => submitImage(selectedTest?._LabTestBookingId)} className='mt-2 bg-[#e88c31] text-primaryBg px-5 py-2 rounded-lg'>Upload</button>
                            </div>

                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default BookLabTest;
