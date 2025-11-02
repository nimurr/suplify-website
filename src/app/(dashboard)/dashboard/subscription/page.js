"use client"
import React from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';

const { Title, Text } = Typography;

const plans = [
    {
        name: 'Standard',
        price: '$199 / month',
        trial: '7 Day Free Trial',
        perks: [
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
    },
    {
        name: 'Premium',
        price: '$399 / month',
        trial: '7 Day Free Trial',
        perks: [
            'Custom Nutrition Plan - Monthly',
            'Workout Program - 12-Week Program',
            'InBody Scan Tracking - Bi-Weekly',
            'Shopping List & Supplement Protocol - Yes + 10% Off Supplements',
            'Specialist Support (Check-Ins) - 1x Per Week',
            'Live Online Workouts - Special Discount & Limited Access',
            'Exclusive Webinars - Monthly',
            'Personalized Blood Work & Lab Testing - 1 Lab Test / 6 Months',
            'Specialist Access & Scheduling - Standard Priority',
            'Doctor Consultation - No',
            'VIP Perks - Yes',
        ],
    },
    {
        name: '👑 VIP',
        price: '$600 / month',
        trial: '7 Day Free Trial',
        perks: [
            'Custom Nutrition Plan - Monthly + Adjustments',
            'Workout Program - Custom-Designed Monthly Plan',
            'InBody Scan Tracking - Bi-Weekly',
            'Shopping List & Supplement Protocol - Yes + 20% Off Supplements',
            'Specialist Support (Check-Ins) - Unlimited Check-Ins',
            'Live Online Workouts - Unlimited Access',
            'Exclusive Webinars - Bi-Weekly',
            'Personalized Blood Work & Lab Testing - 1 Lab Test / 3 Months',
            'Specialist Access & Scheduling - Priority Scheduling',
            'Doctor Consultation - 1 Per Month',
            'VIP Perks - Yes + VIP Exclusive Offers',
        ],
    },
];

const Page = () => {
    return (
        <div style={{ padding: '50px', background: '#f9f9f9' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
                Subscription Plans
            </Title>

            <Row gutter={[24, 24]} justify="center">
                {plans.map((plan) => (
                    <Col xs={24} sm={24} md={8} key={plan.name}>
                        <Card
                            title={plan.name}
                            bordered={false}
                            style={{
                                borderRadius: '10px',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                
                                background: plan.name === '👑 VIP' ? '#fffbe6' : '#fff',
                            }}
                        >
                            <Text strong style={{ fontSize: '24px' }}>{plan.price}</Text>
                            <Text type="secondary" style={{ display: 'block', marginBottom: '20px' }}>
                                {plan.trial}
                            </Text>

                            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                                {plan.perks.map((perk, index) => (
                                    <li key={index} style={{ marginBottom: '10px' }}>
                                        • {perk}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                type="primary"
                                size="large"
                                block
                                style={{
                                    backgroundColor: plan.name === '👑 VIP' ? '#ff4d4f' : '#1da57a',
                                    borderColor: plan.name === '👑 VIP' ? '#ff4d4f' : '#1da57a',
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
