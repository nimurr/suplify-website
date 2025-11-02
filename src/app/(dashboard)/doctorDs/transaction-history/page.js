'use client';
import React, { useState } from 'react';
import { Modal, Button } from 'antd'; // Import Ant Design's Modal and Button components
import { IoEyeOutline } from 'react-icons/io5'; // For the eye icon
import moment from 'moment';
import { useGetAllTrasecitonHistoryQuery } from '@/redux/fetures/doctor/doctor';

const Page = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    // Function to format the date
    const formatDate = (date) => {
        return moment(date).format('YYYY-MM-DD');
    };

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

    const { data, isLoading } = useGetAllTrasecitonHistoryQuery();
    const fullData = data?.data?.attributes?.results || [];
    console.log(fullData);

    return (
        <div>
            {/* Table displaying transaction data */}
            <table border="1" className='rounded-lg capitalize' style={{ borderRadius: '10px', width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>SL</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Txn History Id</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Withdrawal Request Id</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Payment Txn Id</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Reference For</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Amount</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Status</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Type</th>
                        <th style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fullData?.map((row, index) => (
                        <tr className='border-b border-gray-200 py-2' key={row._WalletTransactionHistoryId}>
                            <td className='text-center' style={{ padding: '10px' }}>{++index}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{row._WalletTransactionHistoryId || 'N/A'}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{row.withdrawalRequestId || 'N/A'}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{row.paymentTransactionId || 'N/A'}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{row.referenceFor || 'N/A'}</td>
                            <td className='text-center' style={{ padding: '10px' }}>${row.amount}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{row.status || 'N/A'}</td>
                            <td className='text-center' style={{ padding: '10px' }}>{row.type || 'N/A'}</td>
                            <td className='text-center flex items-center justify-center' style={{ padding: '10px' }}>
                                <button onClick={() => openModal(row)}><IoEyeOutline /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Ant Design Modal */}
            <Modal
                title={`Transaction Details `}
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
                        <p className='flex items-center justify-between gap-5'><strong>Wallet Id:</strong> {modalData.walletId || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Withdrawal Request Id:</strong> {modalData.withdrawalRequestId || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Payment Transaction Id:</strong> {modalData.paymentTransactionId || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Amount:</strong> ${modalData.amount || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Currency:</strong> {modalData.currency || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Balance Before:</strong> ${modalData.balanceBefore || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Balance After:</strong> ${modalData.balanceAfter || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Description:</strong> {modalData.description || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Status:</strong> {modalData.status || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Reference For:</strong> {modalData.referenceFor || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Reference Id:</strong> {modalData.referenceId || 'N/A'}</p>
                        <p className='flex items-center justify-between gap-5'><strong>Transaction History Id:</strong> {modalData._WalletTransactionHistoryId || 'N/A'}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Page;