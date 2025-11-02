"use client";

import { useState } from "react";
import { Radio, Button } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SelectRole() {
  const router = useRouter();
  const [role, setRole] = useState(null);

  const onChange = (e) => {
    setRole(e.target.value);
  };

  const onSubmit = () => {
    if (role) {
      router.push(`/auth/signup?role=${role}`);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-center items-center min-h-screen px-12 bg-gradient-to-br from-black via-black to-[#2e0a0a] w-1/2">
        <div className="hidden md:flex items-center justify-center">
          <Link href={"/"}>
            <img src="/images/logo2.png" alt="Suplify Logo" className="" />
          </Link>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex justify-start items-center w-full md:w-1/2 p-8 bg-gradient-to-br from-black via-black to-[#2e0a0a]">
        <div
          className="bg-white rounded-xl shadow-lg p-8 md:p-10 md:ml-12 max-w-[400px] w-full"
          style={{ boxShadow: "0 0 20px rgb(220 38 38 / 0.3)" }}
        >
          {/* Removed the logo from the mobile view */}
          <h2 className="text-gray-900 text-lg mb-6 font-medium text-center">
            Select your role for <b>Sign up.</b>
          </h2>

          <Radio.Group
            onChange={onChange}
            value={role}
            className="flex flex-col space-y-4 w-full"
          >
            <Radio.Button
              value="member"
              className={`!rounded-md !border !h-14 !text-left !px-4 !flex !items-center !w-full ${
                role === "member"
                  ? "!border-red-500 !text-red-600 !bg-red-50"
                  : "!border-gray-300 !text-gray-700"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    role === "member" ? "border-red-500" : "border-gray-400"
                  }`}
                >
                  {role === "member" && (
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">Member</span>
              </div>
            </Radio.Button>

            <Radio.Button
              value="doctor"
              className={`!rounded-md !border !h-14 !text-left !px-4 !flex !items-center !w-full ${
                role === "doctor"
                  ? "!border-red-500 !text-red-600 !bg-red-50"
                  : "!border-gray-300 !text-gray-700"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    role === "doctor" ? "border-red-500" : "border-gray-400"
                  }`}
                >
                  {role === "doctor" && (
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">Doctor</span>
              </div>
            </Radio.Button>

            <Radio.Button
              value="specialist"
              className={`!rounded-md !border !h-14 !text-left !px-4 !flex !items-center !w-full ${
                role === "specialist"
                  ? "!border-red-500 !text-red-600 !bg-red-50"
                  : "!border-gray-300 !text-gray-700"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    role === "specialist" ? "border-red-500" : "border-gray-400"
                  }`}
                >
                  {role === "specialist" && (
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">Specialist</span>
              </div>
            </Radio.Button>
          </Radio.Group>

          <Button
            type="primary"
            block
            className="mt-8 bg-red-700 border-red-700 hover:bg-red-800"
            disabled={!role}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
