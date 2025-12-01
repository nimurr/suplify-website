// "use client";

// import { Form, Input, Button } from "antd";
// import { useRouter, useSearchParams } from "next/navigation";
// import BackHeader from "../customComponent/BackHeader";

// export default function Signup() {
//   const router = useRouter()
//   const searchParams = useSearchParams();
//   const role = searchParams.get("role") || "Member";

//   const [form] = Form.useForm();

//   const onFinish = (values) => {

//     const fullData = {role, ...values}
//     console.log(fullData)

//     // You can either pass data through query (not secure) or use state/localStorage
//     // Here’s a basic example using route
//     const queryParams = new URLSearchParams({
//       name: values.name,
//       email: values.email,
//       password: values.password,
//       role: role,
//     });

//     router.push(`/auth/signup-nextpage?${queryParams.toString()}`);
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-black to-[#2e0a0a] px-6">
//       {/* Left Side with Logo */}
//       <div className="hidden md:flex items-center justify-center mr-12 ">
//         <img
//           src="/images/logo2.png"
//           alt="Suplify Logo"
//           className=""
//         />
//       </div>

//       {/* Right Side Form */}
//       <div className="md:flex md:flex-col md:p-10 md:max-w-[600px] w-full">
//         <div className="bg-white rounded-xl shadow-lg p-10 w-full">
//         <BackHeader 
//   title={
//     <>
//       Sign up as a <b>{role.charAt(0).toUpperCase() + role.slice(1)}</b>
//     </>
//   } 
// />




//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={onFinish}
//             requiredMark="optional"
//             autoComplete="off"
//             className="max-w-lg mx-auto"
//           >
//             <Form.Item
//               label="Name"
//               name="name"
//               rules={[{ required: true, message: "Please type your name" }]}
//             >
//               <Input placeholder="Type name" />
//             </Form.Item>

//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[
//                 { required: true, message: "Please input your email" },
//                 { type: "email", message: "Please enter a valid email" },
//               ]}
//             >
//               <Input placeholder="example@gmail.com" />
//             </Form.Item>

//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[{ required: true, message: "Please type password" }]}
//             >
//               <Input.Password placeholder="Type password" />
//             </Form.Item>

//             <Form.Item
//               label="Confirm Password"
//               name="confirmPassword"
//               dependencies={["password"]}
//               rules={[
//                 { required: true, message: "Please confirm password" },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue("password") === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(
//                       new Error("Passwords do not match")
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password placeholder="Re-type password" />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 block
//                 className="bg-red-700 border-red-700 hover:bg-red-800"
//               >

//                 Next

//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BackHeader from '../customComponent/BackHeader';
import { useSignUpMutation } from '@/redux/fetures/auth/signUp';
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {
  const [role, setRole] = useState("Member");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const roleFromSearchParams = searchParams.get("role");
    setRole(roleFromSearchParams || "Member");
  }, []);


  const router = useRouter();

  const [form] = Form.useForm();


  const [register, { isLoading }] = useSignUpMutation();

  const onFinish = async (values) => {
    const fullData = { role, ...values };

    const queryParams = new URLSearchParams({
      name: values.name,
      email: values.email,
      password: values.password,
      role: role,
    });

    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("password", values.password);

    if (role !== 'patient') {
      router.push(`/auth/signup-nextpage?${queryParams.toString()}`);
    }

    else {
      try {

        const res = await register(formData).unwrap();
        console.log(res);
        if (res?.code == 201) {
          // console.log(res);
          toast.success(res?.message)
          // router.push("/auth/signup-success");
          message.success(res?.message || "Registration successful!");

          router.push(`/auth/sendOtp?email=${values.email}&path=${res?.data?.attributes?.verificationToken}&email=${values.email}`);
        }

      } catch (error) {
        console.error("Error during submission:", error);
        message.error(error?.data?.message);
      }

    }


  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-black to-[#2e0a0a] px-6">
      <Toaster />
      <div className="hidden md:flex items-center justify-center mr-12">
        <img src="/images/logo2.png" alt="Suplify Logo" />
      </div>

      <div className="md:flex md:flex-col md:p-10 md:max-w-[600px] w-full">
        <div className="bg-white rounded-xl shadow-lg p-10 w-full">
          <BackHeader
            title={
              <>
                Sign up as a <b>{role.charAt(0).toUpperCase() + role.slice(1)}</b>
              </>
            }
          />
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark="optional"
            autoComplete="off"
            className="max-w-lg mx-auto"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please type your name" }]}
            >
              <Input placeholder="Type name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="example@gmail.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please type password" }]}
            >
              <Input.Password placeholder="Type password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Re-type password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="bg-red-700 border-red-700 hover:bg-red-800"
              >
                Next
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
