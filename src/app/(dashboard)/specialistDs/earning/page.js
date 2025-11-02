'use client';
import React, { useEffect, useState } from 'react';
import { BsBank } from "react-icons/bs";
import { Modal, Button, Form, Input } from 'antd'; // Import necessary components from Ant Design
import { useAddBankInfoMutation, useGetBankInfoQuery, useWithDrawRequestMutation, useWithDrawRequestTnxHistoryQuery } from '@/redux/fetures/doctor/doctor'; // Redux query hook to get bank info
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility for bank info
    const [showDetailsModal, setShowDetailsModal] = useState(false); // State to control modal visibility for withdrawal details
    const [form] = Form.useForm(); // To handle form fields

    const [bankdata, setBankdata] = useState({
        bankAccountHolderName: '',
        bankAccountNumber: '',
        bankAccountType: '',
        bankBranch: '',
        bankName: '',
        bankRoutingNumber: ''
    });

    const { data: bankInfo, isLoading } = useGetBankInfoQuery();
    const fullBankInfo = bankInfo?.data?.attributes?.results?.[0];


    useEffect(() => {
        if (fullBankInfo) {
            setBankdata({
                bankAccountHolderName: fullBankInfo.bankAccountHolderName,
                bankAccountNumber: fullBankInfo.bankAccountNumber,
                bankAccountType: fullBankInfo.bankAccountType,
                bankBranch: fullBankInfo.bankBranch,
                bankName: fullBankInfo.bankName,
                bankRoutingNumber: fullBankInfo.bankRoutingNumber
            });
        }
    }, [fullBankInfo]);

    // Function to open the modal for adding bank information
    const openModal = () => setShowModal(true);

    // Function to close the modal for adding bank information
    const closeModal = () => setShowModal(false);

    // Function to open the modal for withdrawal details
    const openDetailsModal = (data) => {
        setShowDetailsModal(true);
        setDetailsData(data); // Set the data to show in the details modal
    };

    // Function to close the modal for withdrawal details
    const closeDetailsModal = () => setShowDetailsModal(false);

    const [withdrawal] = useWithDrawRequestMutation();

    const handleWithDrawSubmit = async (e) => {
        e.preventDefault();
        const amount = e.target.amount.value;
        const data = {
            requestedAmount: Number(amount)
        };

        try {
            const res = await withdrawal(data).unwrap();
            console.log(res);
            if (res?.code == 200) {
                toast.success(res?.message || "Withdrawal request sent successfully!");
                e.target.reset();
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || "Something went wrong!");
        }
    };

    const [addBankInfo] = useAddBankInfoMutation();

    const handleSubmit = async (values) => {
        console.log('Bank Information:', values);
        closeModal(); // Close modal after submission

        try {
            const res = await addBankInfo(values).unwrap();
            console.log(res);
            if (res?.code == 200) {
                toast.success(res?.message || "Bank info added successfully!");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || "Something went wrong!");
        }
    };

    const { data } = useWithDrawRequestTnxHistoryQuery();
    const withdrawalRequestHistories = data?.data?.attributes?.result?.results;
    const walletAmount = data?.data?.attributes?.walletAmount;
    console.log(withdrawalRequestHistories);

    const [detailsData, setDetailsData] = useState(null);

    return (
        <div className='my-20'>
            <Toaster />
            <div className='relative'>
                <img className='lg:w-1/2 mx-auto' src="/images/erning-bg.png" alt="" />
                <div className='absolute mt-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <p className='text-center font-medium mb-2'>Total Balance</p>
                    <h2 className='text-2xl font-semibold text-red-600 text-center'>${walletAmount?.amount}</h2>
                </div>
            </div>

            <form action="" method="post" onSubmit={handleWithDrawSubmit} className='flex flex-col lg:flex-row gap-4 items-end mt-10'>
                <div className='w-full'>
                    <h3 className='font-medium mb-2'>Enter AMOUNT TO WITHDRAW</h3>
                    <input type="text" placeholder='Enter Amount' name='amount' className='border border-gray-400 p-2 rounded-md w-full' />
                </div>
                <button type='submit' className='w-full bg-red-600 text-white py-2 rounded-lg '>Withdraw</button>
                <button type='button' className='w-full bg-red-600 text-white py-2 rounded-lg ' onClick={openModal}>ADD BANK INFORMATION</button>
            </form>

            {/* Table for showing recent withdrawals */}
            <div className='mt-8 space-y-3'>
                <h3 className='font-semibold text-xl text-center'>
                    {isLoading && <p>Loading...</p>}
                </h3>
                {withdrawalRequestHistories?.map((item, index) => (
                    <div className='flex justify-between items-center gap-5' key={item?._WithdrawalRequstId}>
                        <div className='flex gap-4'>
                            <div className='flex w-12 h-12 justify-center items-center bg-red-100 rounded-lg'>
                                <BsBank className='text-3xl text-red-600' />
                            </div>
                            <div>
                                <h4 className='font-semibold text-xl'>${item?.requestedAmount}</h4>
                                <p>Bank of America</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <p>{new Date(item?.requestedAt).toDateString()}</p>
                            <button className='bg-red-600 text-white py-2 px-5 rounded-lg' onClick={() => openDetailsModal(item)}>Details</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for adding bank information */}
            <Modal
                title="Add Bank Information"
                visible={showModal}
                onCancel={closeModal}
                footer={[
                    <button key="cancel" onClick={closeModal} className='bg-gray-500 mr-2 !py-2 px-8 rounded-md text-white'>
                        Cancel
                    </button>,
                    <button form="bankForm" key="submit" htmlType="submit" className='bg-red-600 !py-2 px-8 rounded-md text-white'>
                        Create
                    </button>,
                ]}
            >
                <Form
                    form={form}
                    id="bankForm"
                    onFinish={handleSubmit}
                    layout="vertical"
                    initialValues={bankdata}
                >
                    {/* Bank Account Number */}
                    <Form.Item
                        label="Bank Account Number"
                        name="bankAccountNumber"
                        rules={[{ required: true, message: 'Please enter your bank account number!' }]}
                    >
                        <Input className='py-2' placeholder="Enter your bank account number" />
                    </Form.Item>

                    {/* Routing Number */}
                    <Form.Item
                        label="Routing Number"
                        name="bankRoutingNumber"
                        rules={[{ required: true, message: 'Please enter your routing number!' }]}
                    >
                        <Input className='py-2' placeholder="Enter your routing number" />
                    </Form.Item>

                    {/* Account Holder Name */}
                    <Form.Item
                        label="Account Holder Name"
                        name="bankAccountHolderName"
                        rules={[{ required: true, message: 'Please enter the account holder name!' }]}
                    >
                        <Input className='py-2' placeholder="Enter account holder name" />
                    </Form.Item>

                    {/* Account Type */}
                    <Form.Item
                        label="Account Type"
                        name="bankAccountType"
                        rules={[{ required: true, message: 'Please enter the account type!' }]}
                    >
                        <Input className='py-2' placeholder="Enter account type" />
                    </Form.Item>

                    {/* Branch Name */}
                    <Form.Item
                        label="Branch Name"
                        name="bankBranch"
                        rules={[{ required: true, message: 'Please enter the branch name!' }]}
                    >
                        <Input className='py-2' placeholder="Enter branch name" />
                    </Form.Item>

                    {/* Bank Name */}
                    <Form.Item
                        label="Bank Name"
                        name="bankName"
                        rules={[{ required: true, message: 'Please enter the bank name!' }]}
                    >
                        <Input className='py-2' placeholder="Enter bank name" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal for displaying withdrawal details */}
            <Modal
                title="Withdrawal Request Details"
                visible={showDetailsModal}
                onCancel={closeDetailsModal}
                footer={[
                    <button key="close" onClick={closeDetailsModal} className='bg-gray-500 mr-2 !py-2 px-8 rounded-md text-white'>
                        Close
                    </button>,
                ]}
            >
                {detailsData && (
                    <div className='space-y-2'>
                        <h2 className='text-xl font-semibold'>Proof of Payment</h2>
                        <img className='w-full max-h-[250px]' src={detailsData?.proofOfPayment[0]?.attachment} alt="" />
                        {
                            !detailsData?.proofOfPayment[0]?.attachment &&
                            <p className='text-red-600 text-center'>No proof of payment uploaded</p>
                        }
                        <p className='flex items-center justify-between'><strong>Account Holder Name:</strong> {detailsData.bankAccountHolderName}</p>
                        <p className='flex items-center justify-between'><strong>Account Number:</strong> {detailsData.bankAccountNumber}</p>
                        <p className='flex items-center justify-between'><strong>Account Type:</strong> {detailsData.bankAccountType}</p>
                        <p className='flex items-center justify-between'><strong>Branch:</strong> {detailsData.bankBranch}</p>
                        <p className='flex items-center justify-between'><strong>Bank Name:</strong> {detailsData.bankName}</p>
                        <p className='flex items-center justify-between'><strong>Routing Number:</strong> {detailsData.bankRoutingNumber}</p>
                        <p className='flex items-center justify-between'><strong>Requested Amount:</strong> ${detailsData.requestedAmount}</p>
                        <p className={`flex items-center justify-between capitalize  
                            ${detailsData.status === 'completed' && 'text-green-600'} 
                            ${detailsData.status === 'processing' && 'text-blue-600'} 
                            ${detailsData.status === 'requested' && 'text-yellow-600'}
                            ${detailsData.status === 'failed' && 'text-red-600'}
                            `}><strong>Status:</strong> {detailsData.status}</p>
                        <p className='flex items-center justify-between'><strong>Requested At:</strong> {new Date(detailsData?.requestedAt).toLocaleString()}</p>
                        <p className='flex items-center justify-between'><strong>Processed At:</strong> {detailsData.processedAt && new Date(detailsData.processedAt).toLocaleString() || "Null"}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Page;