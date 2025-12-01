"use client"


import { useVerifyEmailMutation } from '@/redux/fetures/auth/varifyEmail';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import OTPInput from 'react-otp-input';


const SendOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setEror] = useState('')
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [path, setPath] = useState('')

  useEffect(() => {
    // Extract query parameters on client-side

    const params = new URLSearchParams(window.location.search);
    setEmail(params.get('email') || '');
    setPath(params.get('path') || '');

  }, []);

  const [verifyOtp, { isLoading }] = useVerifyEmailMutation()

  const data = {
    email,
    otp: otp,
    token: path
  }
  console.log(data)

  const handleOtp = async () => {

    try {
      const res = await verifyOtp(data).unwrap();
      console.log(res);

      if (res?.code === 200) {
        toast.success(res?.message);
        router.push(`/auth/login`);
      }
    } catch (error) {
      console.log(error);
      setEror(error?.data?.message)
      // setError(error?.data?.message);
    }

  };

  return (
    <div className="flex justify-center items-center lg:min-h-[700px] bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[500px]">
        <h1 className="text-2xl font-bold mb-6 text-center">Verify Email</h1>
        <p className="text-center mb-6">
          Please enter the OTP . We have sent you in your email.
        </p>

        {/* OTP Input */}
        <div className="flex justify-center sm:justify-start items-center gap-2 outline-none focus:border-blue-400 w-full">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{
              height: "52px",
              width: "45px", // Default width for mobile
              background: "transparent",
              border: "1px solid red",
              borderRadius: '10px',
              marginRight: "8px",
              outline: "none",
              // Adjusting width for larger screens
              sm: {
                width: "80px" // Width for larger screens
              }
            }}
            renderSeparator={<span className="md:w-6"> </span>}
            renderInput={(props) => <input {...props} className="sm:w-[65px]" />}
          />
        </div>

        {/* Didn't receive code? */}
        {/* <p className="text-center text-blue-500 hover:underline cursor-pointer mb-6">
          Didn't receive code?
        </p> */}

        {/* Verify Button */}

        <p className=' text-red-500 mt-4'>{error}</p>
        <p className=' text-blue-400 mt-4'>This OTP is only valid for 5 minutes</p>
        <button
          className="w-full mt-6 !bg-red-500 text-white p-2 rounded"
          onClick={handleOtp}
        >
          Verify Account
        </button>

      </div>
    </div>
  );
};

export default SendOtp;