'use client';
import { useGetEarningQuery } from '@/redux/fetures/Specialist/earning';
import moment from 'moment';
import React from 'react';

const Page = () => {

    const { data, isLoading } = useGetEarningQuery();
    const fullData = data?.data?.attributes;
    console.log(fullData);


    return (
        <div>
            {
                isLoading ? <h1 className='text-center my-5 text-xl font-semibold text-blue-500'>Loading...</h1> :
                    <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-3 grid-cols-1'>

                        <div className='border border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.totalEarnings?.label} </h2>
                                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
                            </div>
                            <div className='flex justify-between my-5 items-center '>
                                <span className='text-xl font-semibold text-gray-400'>{fullData?.totalEarnings?.count}</span>
                                <h1 className='text-right text-5xl '>${fullData?.totalEarnings?.amount}</h1>
                            </div>
                            <hr />
                        </div>

                        <div className='border border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.todayEarnings?.label} </h2>
                                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
                            </div>
                            <div className='flex justify-between my-5 items-center '>
                                <span className='text-xl font-semibold text-gray-400'>{fullData?.todayEarnings?.count}</span>
                                <h1 className='text-right text-5xl '>${fullData?.todayEarnings?.amount}</h1>
                            </div>
                            <hr />
                        </div>

                        <div className='border border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.thisWeekEarnings?.label} </h2>
                                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
                            </div>
                            <div className='flex justify-between my-5 items-center '>
                                <span className='text-xl font-semibold text-gray-400'>{fullData?.thisWeekEarnings?.dateRange}</span>
                                <h1 className='text-right text-5xl '>${fullData?.thisWeekEarnings?.amount}</h1>
                            </div>
                            <hr />
                        </div>

                        <div className='border border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.thisMonthEarnings?.label} </h2>
                                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
                            </div>
                            <div className='flex justify-between my-5 items-center '>
                                <span className='text-xl font-semibold text-gray-400 capitalize'>{fullData?.thisMonthEarnings?.month}</span>
                                <h1 className='text-right text-5xl '>${fullData?.thisMonthEarnings?.amount}</h1>
                            </div>
                            <hr />
                        </div>

                        <div className='border border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.lastWeekEarnings?.label} </h2>
                                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
                            </div>
                            <div className='flex justify-between my-5 items-center '>
                                <span className='text-xl font-semibold text-gray-400'>{fullData?.lastWeekEarnings?.dateRange}</span>
                                <h1 className='text-right text-5xl '>${fullData?.lastWeekEarnings?.amount}</h1>
                            </div>
                            <hr />
                        </div>

                        <div className='border border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.lastMonthEarnings?.label} </h2>
                                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
                            </div>
                            <div className='flex justify-between my-5 items-center '>
                                <span className='text-xl font-semibold text-gray-400 capitalize'>{fullData?.lastMonthEarnings?.month}</span>
                                <h1 className='text-right text-5xl '>${fullData?.lastMonthEarnings?.amount}</h1>
                            </div>
                            <hr />
                        </div>

                        <div className='border border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.thisQuarterEarnings?.label} </h2>
                                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
                            </div>
                            <div className='flex justify-between my-5 items-center '>
                                <span className='text-xl font-semibold text-gray-400 capitalize'>{fullData?.thisQuarterEarnings?.count}</span>
                                <h1 className='text-right text-5xl '>${fullData?.thisQuarterEarnings?.amount}</h1>
                            </div>
                            <hr />
                        </div>

                        <div className='border border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.thisYearEarnings?.label} </h2>
                                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
                            </div>
                            <div className='flex justify-between my-5 items-center '>
                                <span className='text-xl font-semibold text-gray-400 capitalize'>{fullData?.thisYearEarnings?.count}</span>
                                <h1 className='text-right text-5xl '>${fullData?.thisYearEarnings?.amount}</h1>
                            </div>
                            <hr />
                        </div>

                        <div className='border border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-2xl text-gray-600 font-semibold'>Current Balance </h2>
                                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
                            </div>
                            <div className='flex justify-between my-5 items-center '>
                                <span className='text-xl font-semibold text-gray-400 capitalize'> Token Balance :{fullData?.currentBalance?.tokenBalance}</span>
                                <h1 className='text-right text-5xl '>${fullData?.thisYearEarnings?.amount}</h1>
                            </div>
                            <hr />
                        </div>

                        <div className='border border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-2xl text-gray-600 font-semibold'>Total Transactions </h2>
                                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
                            </div>
                            <div className='flex justify-end my-5 items-center '>
                                {/* <span className='text-xl font-semibold text-gray-400 capitalize'> Token Balance :{fullData?.currentBalance?.tokenBalance}</span> */}
                                <h1 className='text-right text-5xl '>${fullData?.totalTransactions}</h1>
                            </div>
                            <hr />
                        </div>


                    </div>
            }
        </div>
    );
}

export default Page;
