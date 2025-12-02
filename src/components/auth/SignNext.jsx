"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Upload, Button, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSignUpMutation } from "@/redux/fetures/auth/signUp";
import toast from "react-hot-toast";

export default function SignUpNext() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "";
  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";
  const password = searchParams.get("password") || "";

  const [register, { isLoading }] = useSignUpMutation();

  const onFinish = async (values) => {
    const formData = new FormData();
    values.documents.forEach((file) => {
      formData.append("attachments", file.originFileObj);
    });
    formData.append("role", role);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);


    try {

      const res = await register(formData).unwrap();
      // console.log(res?.data?.code);
      if (res?.code == 201) {
        // console.log(res);
        toast.success(res?.message)
        message.success(res?.message || "Registration successful!");
        router.push("/auth/signup-success");
        // router.push(`/auth/login`);
      }

    } catch (error) {
      console.error("Error during submission:", error);
    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#111] text-white px-4">
      <div className="bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Sign up as a <b>{role}</b>
        </h2>

        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="documents"
            label="Upload Certification"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true, message: "Please upload your document" }]}
          >
            <Upload beforeUpload={() => false} multiple>
              <Button icon={<UploadOutlined />}>Add File</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <button loading={isLoading} type="primary" htmlType="submit" block className="bg-blue-700 gap-3 flex items-center justify-center border-none w-full text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300">
              {isLoading ?
                <button type="button" class="inline-flex items-center text-body bg-neutral-primary-soft  hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary-soft shadow-xs font-medium leading-5  text-sm  focus:outline-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-neutral-tertiary animate-spin fill-brand me-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  Submiting...
                </button>
                : "Submit Now"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
