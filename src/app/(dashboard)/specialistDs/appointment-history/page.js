'use client';
import React, { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { Modal, Button } from 'antd'; // Import Ant Design's Modal and Button components
import { useGetAllBookHistoryQuery, useGetAllBookTraningProgramQuery, useGetAllOrderHistoryQuery } from '@/redux/fetures/doctor/doctor'; // Assuming you're using Redux for fetching data

const Page = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    // Function to open the modal and set data
    const openModal = (data) => {
        setModalData(data);
        setShowModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
        setModalData(null);
    };

    const { data, isLoading } = useGetAllBookTraningProgramQuery();
    const fullData = data?.data?.attributes?.results || []; // Assuming 'results' holds the data
    console.log(fullData);
    return (
        <div>
            <table border="1" className='rounded-lg capitalize overflow-hidden' style={{ borderRadius: '10px', width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>SL</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Order Type</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Transaction Id</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Training Program Id </th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Payment Method</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Total Amount</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Status</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && <tr><td colSpan={7} className='text-center'>Loading...</td></tr>}
                    {fullData?.map((row, index) => (
                        <tr className='border-b border-gray-200 py-2' key={row._DoctorPatientScheduleBookingId}>
                            <td className='text-center' style={{ padding: '10px' }}>{++index}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{row.patientId?.subscriptionType || 'N/A'}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{row.trainingProgramId || 'N/A'}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{row.paymentTransactionId || 'N/A'}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{row.paymentMethod || 'N/A'}</td>
                            <td className='text-center' style={{ padding: '10px' }}>${row.price}</td>
                            <td className={`text-center ${row.paymentStatus === 'unpaid' ? 'text-yellow-600' : 'text-green-600'}`} style={{ padding: '10px' }}>
                                {row.paymentStatus}
                            </td>
                            <td className='text-center flex items-center justify-center' style={{ padding: '10px' }}>
                                <button onClick={() => openModal(row)}><IoEyeOutline /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {
                    !isLoading && fullData?.length === 0 && (
                        <h2 className='text-center text-red-600 font-medium py-3'>No Booked History Found</h2>
                    )
                }
            </div>

            {/* Ant Design Modal */}
            <Modal
                title="Order Details"
                visible={showModal}
                onCancel={closeModal}
                className='capitalize'
                footer={[
                    <Button key="close" onClick={closeModal} className='bg-red-500 hover:bg-red-600'>
                        Close
                    </Button>,
                ]}
            >
                {modalData && (
                    <div className='space-y-2 capitalize'>
                        <p className='flex items-center justify-between gap-5'><strong>Traning Program Purchase Id:</strong> {modalData._TrainingProgramPurchaseId}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Traning Program Id:</strong> {modalData.trainingProgramId}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Transaction Id:</strong> {modalData.paymentTransactionId !== null ? modalData.paymentTransactionId : 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Patient Subscription Type:</strong> {modalData.patientId?.subscriptionType}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Payment Method:</strong> {modalData.paymentMethod || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Total Amount:</strong> ${modalData.price}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Payment Status:</strong> {modalData.paymentStatus}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Patient Name:</strong> {modalData.patientId?.name}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Schedule Date:</strong> {new Date(modalData.scheduleDate).toLocaleDateString()}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Created At:</strong> {new Date(modalData.createdAt).toLocaleString()}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Page;
