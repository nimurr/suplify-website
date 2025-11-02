// "use client"; // Required for using Ant Design components in Next.js 13+

// import { Form, Input, Button, message } from "antd";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
 

// export default function ForgotPassword() {
//   const [form] = Form.useForm();
//   const router = useRouter();

//   const pathName = window.location.pathname;
//   console.log(pathName)

//   const onFinish = (values) => {
//     console.log("Received values:", values);
//     // Add your logic to send OTP here
//     router.push(`/auth/sendOtp?email=${values.email}&path=${pathName}`)
 
//   };

//   return (
//     <div className="flex flex-col items-center justify-center lg:min-h-[700px] bg-gray-100">
//       <div className="w-full max-w-[500px] p-8 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
//         <p className="text-center text-gray-600 mb-6">
//           Please enter your email to reset your password.
//         </p>
//         <Form
//           form={form}
//           name="forgot-password"
//           onFinish={onFinish}
//           layout="vertical"
//         >
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: "Please input your email!" },
//               { type: "email", message: "Please enter a valid email!" },
//             ]}
//           >
//             <Input placeholder="Enter your email" />
//           </Form.Item>

//           <Form.Item>
          
            
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="w-full !bg-[#2E7D32] text-white p-3 rounded"
//             >
//               Send OTP
//             </Button>
        
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// }

"use client"; // Required for using Ant Design components in Next.js 13+

import { useForgotPasswordMutation } from "@/redux/fetures/auth/forgotPassword";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [form] = Form.useForm();
  const [error, setEror] = useState('')
  const router = useRouter();
  const [pathName, setPathName] = useState("");

  const [passwordForgot, {isLoading}] = useForgotPasswordMutation()


  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathName(window.location.pathname);
    }
  }, []);

  const onFinish = async (values) => {
    console.log("Received values:", values);
    try{
      const res = await passwordForgot(values).unwrap();
      if(res?.code == 200){
        toast.success(res?.message)
        router.push(`/auth/sendOtp?email=${values.email}&path=${pathName}`);
      }
    }catch(error){
      console.log(error)
      setEror(error?.data?.message)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center lg:min-h-[700px] bg-gray-100">
      <div className="w-full max-w-[500px] p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <p className="text-center text-gray-600 mb-6">
          Please enter your email to reset your password.
        </p>
        <Form form={form} name="forgot-password" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <p className=' text-red-500'>{error}</p>
          <Form.Item>
            <Button type="primary" isLoading={isLoading} htmlType="submit" className="w-full !bg-[#2E7D32] text-white p-3 rounded">
              Send OTP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
