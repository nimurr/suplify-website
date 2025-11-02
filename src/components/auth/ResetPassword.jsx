"use client"
import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useResetPasswordMutation } from '@/redux/fetures/auth/resetPassword';
import toast, { Toaster } from 'react-hot-toast';


const ResetPassword = () => {

 const router = useRouter()
  const [email, setEmail] = useState('')
 
 const [resetPassword, {isLoading}] = useResetPasswordMutation()
  useEffect(() => {
    // Extract query parameters on client-side
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get('email') || ''); 
  }, []);


  const onFinish = async(values) => {
  
    const data = {
      email,
      password: values?.confirmPassword,
    }
    try{
    const res = await resetPassword(data).unwrap();
      if(res?.code == 200){
        toast.success(res?.message)
        router.push(`/auth/login`);
      }
    }catch(error){
      console.log(error)
    }
    // console.log('Received values of form: ',  data);
  };
  

  return (
    <div className="flex justify-center items-center lg:min-h-[700px] bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <p className="text-center mb-6">
          Your password must be 8-10 characters long.
        </p>

        <Form
          name="reset_password_form"
          onFinish={onFinish}
        >
          {/* New Password */}
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: 'Please input your new password!' },
              { min: 6, message: 'Password must be at least 6 characters long!' },
              { max: 12, message: 'Password must be at most 12 characters long!' },
            ]}
          >
            <Input.Password
              placeholder="New Password"
              className="w-full p-2 border rounded"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              className="w-full p-2 border rounded"
            />
          </Form.Item>

          {/* Reset Password Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
               className="w-full !bg-[#2E7D32] text-white p-3 rounded "
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;