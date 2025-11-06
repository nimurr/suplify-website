
'use client'

import React from 'react';
import moment from 'moment';
import { useParams } from 'next/navigation';
import { useGetOrderDetailsQuery } from '@/redux/fetures/patient/order';

const Page = () => {

    const { id, isLoading } = useParams();
    const { data } = useGetOrderDetailsQuery(id);
    const fullData2 = data?.data?.attributes?.results || [];
    const fullData = data?.data?.attributes;

    console.log(fullData);


    return (
        <div >
            {
                isLoading && (
                    <div className='h-[60vh] flex items-center justify-center'>
                        <div className='max-w-[500px] font-sans w-full mx-auto'>
                            <h2 className='text-4xl font-semibold leading-[1.5]'>Loading...</h2>
                        </div>
                    </div>
                )
            }
            <div className="space-y-5 capitalize">
                {/* Products Table */}
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-[#c50808] text-white">
                            <tr>
                                <th className="py-3 px-4 text-sm font-semibold">Name & Image</th>
                                <th className="py-3 px-4 text-sm font-semibold">Product Id</th>
                                <th className="py-3 px-4 text-sm font-semibold">Order Id</th>
                                <th className="py-3 px-4 text-sm font-semibold">Unit Price</th>
                                <th className="py-3 px-4 text-sm font-semibold">Quantity</th>
                                <th className="py-3 px-4 text-sm font-semibold">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {fullData2?.map((product, index) => (
                                <tr key={index} className=" hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-700 text-sm">
                                        <img className='w-16 h-16' src={product.itemId?.attachments[0]?.attachment} alt="" />
                                        <span className='font-semibold'> {product.itemId?.name}</span>
                                    </td>
                                    <td className="py-3 text-center px-4 text-gray-700 text-sm">{product.itemId?._ProductId}</td>
                                    <td className="py-3 text-center px-4 text-gray-700 text-sm">{product.orderId}</td>
                                    <td className="py-3 text-center px-4 text-gray-700 text-sm">{product.unitPrice}$</td>
                                    <td className="py-3 text-center px-4 text-gray-700 text-sm">{product.quantity}</td>
                                    <td className="py-3 text-center px-4 text-gray-700 text-sm">{product.totalPrice}$</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Billing Address */}
                <div className="bg-white mt-5 rounded-lg flex items-start justify-between">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Billing Address</h3>
                        <p className="text-sm text-gray-600">Address: {fullData?.orderInfo?.shippingAddress?.address || "--"}</p>
                        <p className="text-sm text-gray-600">City: {fullData?.orderInfo?.shippingAddress?.city || "--"}</p>
                        <p className="text-sm text-gray-600">State: {fullData?.orderInfo?.shippingAddress?.state || "--"}</p>
                        <p className="text-sm text-gray-600">Zip Code: {fullData?.orderInfo?.shippingAddress?.zipCode || "--"}</p>
                    </div>

                    <div className="mt-6 bg-[#c508082a]  p-4 rounded-lg  text-gray-700 flex items-start">
                        <div className='text-base font-semibold space-y-3'>
                            <p className="font-semibold">Tnx Id: {fullData?.orderInfo?.paymentTransactionId}</p>
                            <p>User Id: {fullData?.orderInfo?.userId}</p>
                            <p>Sub Total Amount: {fullData?.orderInfo?.subTotal}$</p>
                            <p>Discounted Amount Amount: {fullData?.orderInfo?.discount?.discountedAmount}$</p>
                            <p>Discounted Value: {fullData?.orderInfo?.discount?.value}%</p>
                            <p className='text-red-500'>Final Amount: {fullData?.orderInfo?.finalAmount}$</p>
                            <p className='capitalize'>Payment Status: {fullData?.orderInfo?.paymentStatus}</p>
                            {/* <p>Name: {fullData?.orderInfo?.userId.name}</p> */}
                            <p>Address:  {fullData?.orderInfo?.shippingAddress?.address + " ,  " + fullData?.orderInfo?.shippingAddress?.city}</p>
                            {/* <p>Create Date: {fullData?.orderInfo?.createdAt && moment(fullData?.orderInfo?.createdAt).format("dddd, MMMM Do YYYY") || "--"}</p> */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;