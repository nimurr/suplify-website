'use client';
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, message, Space } from "antd";
import { useRouter } from "next/navigation";
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useGetUserProfileQuery } from "@/redux/fetures/user/getUsers";
import url from "@/redux/api/baseUrl";
import { useEditProfileMutation } from "@/redux/fetures/user/editProfile";
import toast, { Toaster } from "react-hot-toast";

const PatientProfileEdit = () => {
    const router = useRouter();
    const [form] = Form.useForm();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUserData(user);
    }, []);

    const { data: user } = useGetUserProfileQuery(userData.id);
    const fullUser = user?.data?.attributes;

    // State for profile image upload
    const [imageFileList, setImageFileList] = useState([]);
    const [documentFileList, setDocumentFileList] = useState([]);

    const imageUrl = fullUser?.profileImage?.imageUrl.includes("amazonaws.com")
        ? fullUser?.profileImage?.imageUrl
        : url + fullUser?.profileImage?.imageUrl;

    useEffect(() => {
        if (fullUser) {
            form.setFieldsValue({
                fullName: fullUser.name,
                email: fullUser.email,
                address: fullUser.profileId.address,
                description: fullUser.profileId.description,
                protocolNames: fullUser.profileId.protocolNames || []  // Ensure this is an array
            });

            // Set the profile image if it's available
            if (fullUser.profileImage) {
                setImageFileList([
                    {
                        uid: '-1',
                        name: 'profile-image',
                        status: 'done',
                        url: imageUrl // Assuming the image URL is in the profileImage object
                    }
                ]);
            }
        }
    }, [fullUser, form]);

    const handleBack = () => {
        router.push("/profile");
    };

    const [updateProfile] = useEditProfileMutation();

    const onFinish = async (values) => {
        // Convert the protocolNames to an array if necessary
        const protocolNamesArray = values?.protocolNames?.map((protocol) => protocol.protocolName).filter(Boolean);

        const formData = new FormData();
        if (values.fullName) {
            formData.append("name", values.fullName);
        }
        if (values.email) {
            formData.append("email", values.email);
        }
        if (imageFileList[0]?.originFileObj) {
            formData.append("profileImage", imageFileList[0]?.originFileObj);
        }
        if (values.address) {
            formData.append("address", values.address);
        }
        if (values.description) {
            formData.append("description", values.description);
        }
        if (protocolNamesArray?.length > 0) {
            formData.append("protocolNames", protocolNamesArray);  // Send array of protocol names
        }

        try {
            const res = await updateProfile({ formData, id: userData.id }).unwrap();
            console.log(res)
            if (res?.code === 200) {
                toast.success(res?.message);
                router.push("/profile");
            }
        } catch (error) {
            console.log(error);
            router.push("/profile");
        }
    };

    // Validate image before upload (only jpg/png)
    const beforeImageUpload = (file) => {
        const isValid =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/jpg";
        if (!isValid) {
            message.error("You can only upload JPG/PNG files!");
        }
        return isValid || Upload.LIST_IGNORE;
    };

    const handleImageChange = ({ fileList }) => {
        // Limit to 1 file only
        setImageFileList(fileList.slice(-1));
    };

    return (
        <div className="md:w-[70%] mx-auto md:py-24 px-4 md:px-8">
            <Toaster />
            <h1 className="text-3xl md:text-4xl mt-5 font-bold text-green-700 text-center md:mb-8">
                Edit Profile
            </h1>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="border border-gray-200 p-5 rounded-lg"
            >
                <Form.Item label="Profile Image">
                    <Upload
                        listType="picture-card"
                        accept=".jpg,.jpeg,.png"
                        beforeUpload={beforeImageUpload}
                        onChange={handleImageChange}
                        fileList={imageFileList}
                        maxCount={1}
                        showUploadList={{ showRemoveIcon: true }}
                    >
                        {imageFileList?.length >= 1 ? null : (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: "Please enter your full name" }]}
                >
                    <Input className="h-10" placeholder="Full Name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Please enter a valid email" }]}
                >
                    <Input disabled className="h-10" placeholder="Email" />
                </Form.Item>

                {fullUser?.role === "doctor" && (
                    <div>
                        <Form.Item label="Address " name="address">
                            <Input className="h-10" placeholder="Address" />
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                            <Input className="h-10" placeholder="Description" />
                        </Form.Item>
                    </div>
                )}

                {fullUser?.role === "specialist" && (
                    <div>
                        <Form.Item label="Address " name="address">
                            <Input className="h-10" placeholder="Address" />
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                            <Input className="h-10" placeholder="Description" />
                        </Form.Item>

                        {/* Dynamic Protocol Names Input Fields */}
                        <Form.List
                            name="protocolNames"
                            initialValue={fullUser?.profileId.protocolNames || []}
                            rules={[
                                {
                                    validator: async (_, names) => {
                                        if (!names || names?.length < 1) {
                                            return Promise.reject(new Error("At least one protocol name is required"));
                                        }
                                    },
                                },
                            ]}
                            className="flex items-center gap-5 flex-wrap"
                        >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields?.map(({ key, fieldKey, name, field }, index) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...field}
                                                name={[name, 'protocolName']}
                                                fieldKey={[fieldKey, 'protocolName']}
                                                rules={[{ required: true, message: 'Protocol name is required' }]}
                                            >
                                                <Input placeholder="Protocol Name" />
                                            </Form.Item>
                                            <Button type="danger" onClick={() => remove(name)} icon={<MinusCircleOutlined />} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            icon={<PlusOutlined />}
                                        >
                                            Add Protocol Name
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </div>
                )}

                <Form.Item className="flex justify-between gap-2 mt-8">
                    <Button className="h-10" onClick={handleBack}>Back to Profile</Button>
                    <Button onClick={onFinish} className="h-10 ml-2" type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PatientProfileEdit;