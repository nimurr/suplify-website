'use client';

import React from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
    TimePicker,
    Typography
} from 'antd';
import { useBookedNowLabTestMutation } from '@/redux/fetures/landing/landing';
import toast from 'react-hot-toast';
import moment from 'moment';

const { Title, Text } = Typography;

const Page = () => {
    // id get from url params if needed in future
    const queryParams = new URLSearchParams(window.location.search);
    const labTestId = queryParams.get('id');

    const [form] = Form.useForm();
    const [booklabtest] = useBookedNowLabTestMutation();

    // ✅ SUBMIT FUNCTION
   const handleBookNow = async (values) => {
    const date = moment(values.date);

    const startTime = date
        .clone()
        .hour(values.timeFrom.hour())
        .minute(values.timeFrom.minute())
        .second(0)
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss');

    const endTime = date
        .clone()
        .hour(values.timeTo.hour())
        .minute(values.timeTo.minute())
        .second(0)
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss');

    const payload = {
        labTestId,
        appointmentDate: date.toISOString(), // keep Z
        startTime, // NO Z
        endTime,   // NO Z
        address: values.address,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
    };

    console.log('✅ FINAL PAYLOAD:', payload);

    try {
        await booklabtest(payload).unwrap();
        toast.success("Lab test booked successfully");
    } catch (error) {
        toast.error(error?.data?.message || "Failed to book lab test");
    }
};


    return (
        <div className='py-5 pt-32'>
            <div className="py-5  max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <Title level={3}>Blood Sugar & Insulin Test</Title>
                <Text type="secondary">Appointment Schedule</Text>

                <p className="text-gray-500 mt-2 mb-6">
                    Select a convenient date and time to get your personalized lab test at home.
                </p>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleBookNow}
                >
                    {/* DATE & TIME */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Form.Item
                            label="Date"
                            name="date"
                            rules={[{ required: true, message: 'Select date' }]}
                        >
                            <DatePicker className="w-full h-11" />
                        </Form.Item>

                        <Form.Item
                            label="Time Range"
                            name="timeFrom"
                            rules={[{ required: true, message: 'Select start time' }]}
                        >
                            <TimePicker format="hh:mm A" className="w-full h-11" />
                        </Form.Item>

                        <Form.Item
                            label="To"
                            name="timeTo"
                            rules={[{ required: true, message: 'Select end time' }]}
                        >
                            <TimePicker format="hh:mm A" className="w-full h-11" />
                        </Form.Item>
                    </div>

                    {/* ADDRESS */}
                    <div className="border rounded-lg p-4 mt-4 bg-gray-50">
                        <Title level={5}>Address</Title>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Address is required' }]}
                        >
                            <Input placeholder="Type your address" className="h-11" />
                        </Form.Item>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[{ required: true, message: 'City is required' }]}
                            >
                                <Input placeholder="Type city name" className="h-11" />
                            </Form.Item>

                            <Form.Item
                                label="State"
                                name="state"
                                rules={[{ required: true, message: 'State is required' }]}
                            >
                                <Input placeholder="Select state" className="h-11" />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Zip Code"
                            name="zipCode"
                            rules={[{ required: true, message: 'Zip code is required' }]}
                        >
                            <Input placeholder="Type zip code" className="h-11" />
                        </Form.Item>
                    </div>

                    {/* SUBMIT */}
                    <Form.Item className="mt-6">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full h-12 bg-red-600 hover:bg-red-700 text-lg font-semibold"
                        >
                            Book Now
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Page;
