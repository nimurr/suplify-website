'use client';
import { useGetFullSubscriptionQuery } from '@/redux/fetures/subscription/subscription';
import moment from 'moment';
import { useState } from 'react';
import React from 'react';
import { FaCalendarCheck, FaCogs, FaBoxOpen, FaUser, FaMoneyCheckAlt, FaHeartbeat, FaCreditCard, FaUserPlus, FaExclamationTriangle } from 'react-icons/fa';

const Notification = ({ notification }) => {
    // Dynamic styles and icons based on notification type
    const getNotificationStyle = (type) => {
        switch (type) {
            case 'appointmentBooking':
                return { style: 'bg-blue-100 border-blue-500 text-blue-800', icon: <FaCalendarCheck /> };
            case 'trainingProgramPurchase':
                return { style: 'bg-yellow-100 border-yellow-500 text-yellow-800', icon: <FaCogs /> };
            case 'workoutClassPurchase':
                return { style: 'bg-green-100 border-green-500 text-green-800', icon: <FaBoxOpen /> };
            case 'productOrder':
                return { style: 'bg-indigo-100 border-indigo-500 text-indigo-800', icon: <FaBoxOpen /> };
            case 'labTestBooking':
                return { style: 'bg-teal-100 border-teal-500 text-teal-800', icon: <FaHeartbeat /> };
            case 'withdrawal':
                return { style: 'bg-red-100 border-red-500 text-red-800', icon: <FaMoneyCheckAlt /> };
            case 'payment':
                return { style: 'bg-pink-100 border-pink-500 text-pink-800', icon: <FaCreditCard /> };
            case 'system':
                return { style: 'bg-purple-100 border-purple-500 text-purple-800', icon: <FaCogs /> };
            case 'newUser':
                return { style: 'bg-purple-100 border-purple-500 text-purple-800', icon: <FaUserPlus /> };
            default:
                return { style: 'bg-gray-100 border-gray-500 text-gray-800', icon: <FaExclamationTriangle /> };
        }
    };

    const { style, icon } = getNotificationStyle(notification.type);

    return (
        <div className={`border-l-4 p-4 mb-3 rounded-lg flex justify-between items-center ${style}`}>
            <div className="flex items-center justify-between w-full gap-3">
                <div className='flex items-center gap-5'>
                    <div className="text-2xl">{icon}</div>
                    <p>{notification?.title}</p>
                </div>
                <div className='text-right'>
                    {/* // HOW MANY TIME AGEO NOTIFICATION SHWO THIS FORMATE  */}
                    <p className='capitalize'>{moment(notification?.createdAt).fromNow()}</p>

                    <p className='text-xs'>{moment(notification?.createdAt).format('YYYY-MM-DD')}</p>
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading, error } = useGetFullSubscriptionQuery(page);

    const subscription = data?.data?.attributes?.results || [];
    const totalPages = data?.data?.attributes?.totalPages || 1;
    console.log(subscription);

    // Handle the 'Next' and 'Previous' page changes
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Notifications</h1>

            {/* Loader */}
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-600">Error loading notifications</p>}

            {/* Notifications List */}
            {subscription.length > 0 ? (
                subscription.map((notification) => (
                    <Notification
                        key={notification.id}
                        notification={notification}
                    />
                ))
            ) : (
                <p className="text-gray-600">No notifications available.</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-end items-center gap-2 mt-5">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:bg-gray-200"
                >
                    Previous
                </button>
                <span className="text-sm font-semibold text-gray-600">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:bg-gray-200"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Page;
