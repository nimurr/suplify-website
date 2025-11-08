"use client";
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';
import { useGetAllSubscriptionsQuery } from '@/redux/fetures/subscription/subscription';

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
                id: subscription.id,
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

    return (
        <div style={{ padding: '50px', background: '#f9f9f9' }}>
            {/* <div>
                {
                    subscriptionsUserInfo?.length > 0 && (
                        <p style={{ textAlign: 'center' }}>Your have No subscriptions</p>
                    )
                }
            </div> */}
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
                        >
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


                            <Button
                                type="primary"
                                size="large"
                                block
                                style={{
                                    backgroundColor: plan.subscriptionType === 'VIP' ? '#ff4d4f' : '#1da57a',
                                    borderColor: plan.subscriptionType === 'VIP' ? '#ff4d4f' : '#1da57a',
                                }}
                            >
                                Subscribe Now
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Page;
