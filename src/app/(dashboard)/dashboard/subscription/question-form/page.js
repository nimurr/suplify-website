'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAnswerAQuestionUsingFormMutation, useGetAllquestionsQuery } from '@/redux/fetures/subscription/subscription';

import { Form, Input, Checkbox, Radio, Button, Card, message, Spin } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

const { TextArea } = Input;

const Page = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // subscription or user id

    const [form] = Form.useForm();
    const [questionAnswer, { isLoading }] = useAnswerAQuestionUsingFormMutation();
    const { data: questionsData, isLoading: loadingQuestions } = useGetAllquestionsQuery();

    const allQuestions = questionsData?.data?.attributes?.results;

    const navigate = useRouter();

    console.log(allQuestions)

    const handleSubmit = async (values) => {
        try {
            // Transform form values into the required format
            const answers = allQuestions.map((question) => {
                const fieldValue = values[question._id];

                return {
                    questionId: question._id,
                    answerValue: fieldValue
                };
            });

            const payload = { answers };

            const response = await questionAnswer({ id, data: payload }).unwrap();

            console.log(response)

            if (response?.code === 200 || response?.code === 201) {
                toast.success(response?.message || 'Answers submitted successfully!');
                navigate.push(`/`);
                form.resetFields();
            } else {
                toast.error(response?.message || 'Failed to submit answers');
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to submit answers');
            // message.error(error?.data?.message || 'Something went wrong');
            console.error('Error:', error);
        }
    };

    if (loadingQuestions) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Subscription Questions
                    </h1>
                    <p className="text-gray-500">Please answer all the questions below</p>

                </div>

                {/* Form */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="space-y-6"
                >
                    {allQuestions && allQuestions.length > 0 ? (
                        allQuestions.map((question, index) => (
                            <Card
                                key={question._id}
                                className="shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl overflow-hidden"
                            >
                                {/* Question Header */}
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 -m-6 mb-6 p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-semibold">
                                            Question {index + 1}
                                        </span>
                                        {/* {question.isRequired && (
                                            <span className="bg-black px-3 py-1 rounded-full text-white text-xs font-semibold">
                                                Required
                                            </span>
                                        )} */}
                                    </div>
                                </div>

                                {/* Question Text */}
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    {question.questionText}
                                    {question.isRequired && <span className="text-red-500 ml-1">*</span>}
                                </h3>

                                {/* Answer Input Based on Type */}
                                {question.answerType === 'text' && (
                                    <Form.Item
                                        name={question._id}
                                        rules={[
                                            {
                                                required: question.isRequired,
                                                message: 'This field is required'
                                            }
                                        ]}
                                    >
                                        <TextArea
                                            placeholder="Enter your answer..."
                                            rows={4}
                                            className="rounded-lg"
                                        />
                                    </Form.Item>
                                )}

                                {question.answerType === 'single' && question.answers && (
                                    <Form.Item
                                        name={question._id}
                                        rules={[
                                            {
                                                required: question.isRequired,
                                                message: 'Please select an option'
                                            }
                                        ]}
                                    >
                                        <Radio.Group className="w-full">
                                            <div className="space-y-3">
                                                {question.answers.map((answer) => (
                                                    <div
                                                        key={answer._id}
                                                        className="bg-gray-50 hover:bg-purple-50 p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-all"
                                                    >
                                                        <Radio value={answer.answerTitle} className="w-full">
                                                            <span className="text-gray-700 font-medium">
                                                                {answer.answerTitle}
                                                            </span>
                                                        </Radio>
                                                    </div>
                                                ))}
                                            </div>
                                        </Radio.Group>
                                    </Form.Item>
                                )}

                                {question.answerType === 'multi' && question.answers && (
                                    <Form.Item
                                        name={question._id}
                                        rules={[
                                            {
                                                required: question.isRequired,
                                                message: 'Please select at least one option'
                                            }
                                        ]}
                                    >
                                        <Checkbox.Group className="w-full">
                                            <div className="space-y-3">
                                                {question.answers.map((answer) => (
                                                    <div
                                                        key={answer._id}
                                                        className="bg-gray-50 hover:bg-purple-50 p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-all"
                                                    >
                                                        <Checkbox value={answer.answerTitle} className="w-full">
                                                            <span className="text-gray-700 font-medium">
                                                                {answer.answerTitle}
                                                            </span>
                                                        </Checkbox>
                                                    </div>
                                                ))}
                                            </div>
                                        </Checkbox.Group>
                                    </Form.Item>
                                )}
                            </Card>
                        ))
                    ) : (
                        <Card className="text-center py-12">
                            <p className="text-gray-500">No questions available</p>
                        </Card>
                    )}

                    {/* Submit Button */}
                    {allQuestions && allQuestions.length > 0 && (
                        <div className="flex gap-4 justify-end pt-6">
                            <Button
                                size="large"
                                onClick={() => form.resetFields()}
                                className="h-12 px-8 rounded-xl"
                            >
                                Reset
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={isLoading}
                                icon={<CheckCircleOutlined />}
                                className="h-12 px-8 rounded-xl"
                                style={{
                                    background: 'linear-gradient(to right, #9333ea, #ec4899)',
                                    border: 'none'
                                }}
                            >
                                Submit Answers
                            </Button>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default Page;