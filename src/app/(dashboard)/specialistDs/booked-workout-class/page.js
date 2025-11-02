'use client';
import React, { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { Modal, Button } from 'antd'; // Import Ant Design's Modal and Button components
import { useGetAllBookedWorkoutClassQuery } from '@/redux/fetures/doctor/doctor'; // Assuming you're using Redux for fetching data
import moment from 'moment';

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

    const { data, isLoading } = useGetAllBookedWorkoutClassQuery();
    const fullData = data?.data?.attributes?.results || []; // Assuming 'results' holds the data

    return (
        <div>
            <table border="1" className='rounded-lg capitalize' style={{ borderRadius: '10px', width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>SL</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Booking Id</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Transaction Id</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Status</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>scheduleDate</th>
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
                            <td className='text-center' style={{ padding: '10px' }}>{row._SpecialistPatientScheduleBookingId || 'N/A'}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{row.paymentTransactionId || 'N/A'}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{row.status || 'N/A'}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{moment(row.scheduleDate).format('ddd, MMMM Do YYYY') || 'N/A'}</td>
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

            {/* Ant Design Modal */}
            <Modal
                title={`Order Details - ${modalData ? modalData._SpecialistPatientScheduleBookingId : 'N/A'}`}
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
                        <p className='flex items-center justify-between gap-5'><strong>Booking Id:</strong> {modalData._SpecialistPatientScheduleBookingId || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Transaction Id:</strong> {modalData.paymentTransactionId || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Payment Method:</strong> {modalData.paymentMethod || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Payment Status:</strong> {modalData.paymentStatus || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Total Amount:</strong> ${modalData.price || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Schedule Date:</strong> {moment(modalData.scheduleDate).format('ddd, MMMM Do YYYY') || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Start Time:</strong> {moment(modalData.startTime).format('h:mm A') || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>End Time:</strong> {moment(modalData.endTime).format('h:mm A') || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Specialist Id:</strong> {modalData.specialistId || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Patient Id:</strong> {modalData.patientId || 'N/A'}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Page;