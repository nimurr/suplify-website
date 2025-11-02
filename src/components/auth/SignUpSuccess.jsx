"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";
import { FcApproval } from "react-icons/fc";
import Link from "next/link";

export default function SignupSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#111] text-white px-4">
      {/* Left side logo */}
      <Link href={"/"}>
      
      <div className="hidden md:flex items-center justify-center mr-12">
        <img src="/images/logo2.png" alt="Suplify Logo" />
      </div>
      </Link>

      {/* Right side message */}
      <div className="bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
        <FcApproval className="text-[100px]" /> {/* Use your blue tick image here */}
        </div>
        <h2 className="text-lg font-semibold mb-2">
          Your application is submitted, please wait for approval
        </h2>
        <p className="mb-6">We will respond within 48 hours.</p>
        <Button
          type="primary"
          className="bg-red-700 border-none"
          onClick={() => router.push("/auth/login")}
        >
          Log in
        </Button>
      </div>
    </div>
  );
}
