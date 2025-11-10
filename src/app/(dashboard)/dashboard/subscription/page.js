"use client";
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';
import { useCancelSubMutation, useGetAllSubscriptionsQuery, useTakeSubscriptionMutation } from '@/redux/fetures/subscription/subscription';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

const { Title, Text } = Typography;

const Page = () => {
    const { data, isLoading, error } = useGetAllSubscriptionsQuery();
    const subscriptionsUserInfo = data?.data?.attributes?.result?.results || [];
    const subscriptions = data?.data?.attributes?.subscription || [];

    console.log(subscriptionsUserInfo);

    const [subscriptionsList, setSubscriptionsList] = useState([]);

    useEffect(() => {
        if (subscriptions?.length > 0) {
            // Format the data for subscriptions
            const formattedSubscriptions = subscriptions?.map(subscription => ({
                id: subscription._subscriptionId,
                name: subscription.subscriptionName,
                price: `$${subscription.amount} ${subscription.currency}`,
                trial: subscription.subscriptionType === 'standard' ? '7 Day Free Trial' : 'No Free Trial',
                perksForStandard: [
                    'Custom Nutrition Plan - Monthly',
                    'Workout Program - 12-Week Program',
                    'InBody Scan Tracking - Monthly',
                    'Shopping List & Supplement Protocol - Yes (No Discounts)',
                    'Specialist Support (Check-Ins) - 2x Per Month',
                    'Live Online Workouts - No',
                    'Exclusive Webinars - No',
                    'Personalized Blood Work & Lab Testing - No',
                    'Specialist Access & Scheduling - No',
                    'Doctor Consultation - No',
                    'VIP Perks - No',
                ],
                perksForStandardPlus: [
                    'Monthly nutrition strategy',
                    'Goal-based supplement protocol',
                    'Monthly updated training plan',
                    'Personalized user profile with habit and progress tracking',
                    'Access to Suplify’s a la carte library (extra cost) for workouts, tools, doctor consultation, lab tests',
                    'Suplify Rewards access (points + perks)',
                    'Access to challenges, webinars, and Hot Spot discounts',
                    'No coaching included',
                    'Optional Upgrade: Add a Suplify Specialist for +$280/month (Total: $350/month) → Includes weekly check-ins/coaching, accountability, 15% off supplements, and protocol adjustments',
                ],
                perksForVise: [
                    'Custom Nutrition Plan - Monthly',
                    'Workout Program - 12-Week Program',
                    'InBody Scan Tracking - Monthly',
                    'Shopping List & Supplement Protocol - Yes (No Discounts)',
                    'Specialist Support (Check-Ins) - 2x Per Month',
                    'Live Online Workouts - No',
                    'Exclusive Webinars - No',
                    'Personalized Blood Work & Lab Testing - No',
                    'Specialist Access & Scheduling - No',
                    'Doctor Consultation - No',
                    'VIP Perks - No',
                ],
                subscriptionType: subscription.subscriptionType,
            }));
            setSubscriptionsList(formattedSubscriptions);
        }
    }, [subscriptions]);

    const [takeSub] = useTakeSubscriptionMutation();

    const handleSubscribe = async (plan) => {
        console.log(plan?.id);
        try {
            const res = await takeSub(plan).unwrap();
            console.log(res);
            if (res?.code === 200) {
                toast.success(res?.message);
                window.location.href = `${res?.data?.attributes}`
            }
            else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error(error?.data?.message || "Failed to take subscription");
        }
    };

    const [cancelSub] = useCancelSubMutation();

    const handleCancelSubscription = async (plan) => {
        console.log(plan);
        try {
            const res = await cancelSub().unwrap();
            console.log(res);
            if (res?.code === 200) {
                toast.success(res?.message);
            }
            else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error(error?.data?.message || "Failed to cancel subscription");
        }

    };

    return (
        <div style={{ padding: '50px', background: '#f9f9f9' }}>
            <Toaster />
            <div>
                {
                    subscriptionsUserInfo?.length < 1 && (
                        <p className=' font-semibold text-red-500 mt-5 bg-red-200 p-2 text-center rounded'>Your have No Active subscriptions</p>
                    )
                }
            </div>
            <div>
                {
                    subscriptionsUserInfo?.length > 0 && (
                        <div className='bg-red-300 rounded-lg font-semibold p-5 md:max-w-[400px] space-y-2'>
                            <p >Your Name : {subscriptionsUserInfo[0]?.userId?.name} </p>
                            <p >Your Email : {subscriptionsUserInfo[0]?.userId?.email} </p>
                            <p >Your Subscription Type : {subscriptionsUserInfo[0]?.userId?.subscriptionType} </p>
                        </div>
                    )
                }

            </div>
            <div className='max-w-[500px] md:max-w-full overflow-x-auto'>
                {subscriptionsUserInfo?.length > 0 && (
                    <table className="min-w-full table-auto border-collapse my-5">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">User Subscription Id</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Subscription Name</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700"> Start Date</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Current Period Start Date</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700"> Expire Date</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Cancelled At Period End</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700"> Cancel Date</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptionsUserInfo?.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                                >
                                    <td className="px-4 py-3 text-sm text-gray-800">{item?._userSubscriptionId}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{item?.subscriptionPlanId?.subscriptionName}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{moment(item?.subscriptionStartDate).format('YYYY-MM-DD')}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{moment(item?.currentPeriodStartDate).format('YYYY-MM-DD')}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{moment(item?.expirationDate).format('YYYY-MM-DD')}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{item?.cancelledAtPeriodEnd ? 'True' : 'False'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{moment(item?.cancelledAt || "N/A").format('YYYY-MM-DD')}</td>
                                    <td className="px-4 py-3 text-sm text-red-600 capitalize">{item?.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
                {isLoading && <p>Loading...</p>}
                {error && <p className="text-red-600">Error loading subscriptions</p>}
            </Title>

            <Row gutter={[24, 24]} justify="center">
                {subscriptionsList?.map((plan) => (
                    <Col xs={24} sm={24} md={8} key={plan.id}>
                        <Card
                            title={plan.name}
                            bordered={false}
                            style={{
                                borderRadius: '10px',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                background: plan.subscriptionType === 'Vise' ? '#fffbe6' : '#fff',
                            }}
                            className='overflow-hidden'
                        >
                            {
                                plan?.subscriptionType === subscriptionsUserInfo[0]?.userId?.subscriptionType && (
                                    <span className='bg-green-500 absolute top-5 -right-10 rotate-45 text-white p-2 px-14 '>Active</span>
                                )
                            }
                            <Text strong style={{ fontSize: '24px' }}>{plan.price}</Text>
                            <Text type="secondary" style={{ display: 'block', marginBottom: '20px' }}>
                                {plan.trial}
                            </Text>

                            {
                                plan?.subscriptionType == "standard" && (

                                    <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                                        {plan?.perksForStandard?.map((perk, index) => (
                                            <li key={index} style={{ marginBottom: '10px' }}>
                                                • {perk}
                                            </li>
                                        ))}
                                    </ul>
                                )
                            }
                            {
                                plan?.subscriptionType == "standardPlus" && (
                                    <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                                        {plan?.perksForStandardPlus?.map((perk, index) => (
                                            <li key={index} style={{ marginBottom: '10px' }}>
                                                • {perk}
                                            </li>
                                        ))}
                                    </ul>
                                )
                            }

                            {
                                plan?.subscriptionType == "vise" && (
                                    <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                                        {plan?.perksForVise?.map((perk, index) => (
                                            <li key={index} style={{ marginBottom: '10px' }}>
                                                • {perk}
                                            </li>
                                        ))}
                                    </ul>
                                )
                            }


                            {
                                plan?.subscriptionType !== subscriptionsUserInfo[0]?.userId?.subscriptionType ? (
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={() => handleSubscribe(plan)}

                                        style={{
                                            backgroundColor: plan.subscriptionType === 'VIP' ? '#ff4d4f' : '#1da57a',
                                            borderColor: plan.subscriptionType === 'VIP' ? '#ff4d4f' : '#1da57a',
                                        }}
                                    >
                                        Subscribe Now
                                    </Button>
                                ) :
                                    (
                                        <button onClick={() => handleCancelSubscription(plan)} className='bg-red-500 text-white py-2 px-8 rounded-lg'>
                                            Cancel Subscription
                                        </button>
                                    )
                            }

                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Page;
