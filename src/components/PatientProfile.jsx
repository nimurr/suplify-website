"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Image, Space } from "antd";
import { useRouter } from "next/navigation";
import url from "@/redux/api/baseUrl";
import { useGetUserProfileQuery } from "@/redux/fetures/user/getUsers";


const PatientProfile = () => {

    const router = useRouter();
    const handleEditProfile = () => {
        router.push("/profile/editProfile");
    };

    const [userData, setUserData] = useState({})
    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("user")))
    }, [])
    const { data: user } = useGetUserProfileQuery(userData.id)
    const fullUser = user?.data?.attributes;

    console.log(fullUser);


    const imageUrl = fullUser?.profileImage?.imageUrl.includes("amazonaws.com")
        ? fullUser?.profileImage?.imageUrl
        : url + fullUser?.profileImage?.imageUrl;



    return (
        <div className="md:w-[70%] mx-auto md:py-10 px-4 md:px-8">
            <h1 className="text-3xl md:text-4xl mt-5 font-bold text-green-700 text-center md:mb-8">
                My Profile
            </h1>

            <div className="bg-white border max-w-[400px] mx-auto border-gray-200 py-10 rounded-lg p-6">
                <div className="flex flex-col justify-center md:flex-row items-center gap-6">
                    <Space size={12}>
                        <Image
                            width={200}
                            src={imageUrl}
                            className="rounded-lg"
                        />
                    </Space>

                </div>
                <div className="flex-1 w-full flex items-center flex-col justify-center mt-2">
                    <h2 className="text-xl font-semibold capitalize text-gray-800">{fullUser?.name}</h2>
                    <p className="text-gray-600">{fullUser?.email}</p>
                    {
                        fullUser?.role == "doctor" ?
                            <p className="text-gray-600">{fullUser?.profileId?.address || "N/A"}</p> : null
                    }
                    {
                        fullUser?.role == "specialist" ?
                            <p className="text-gray-600">{fullUser?.profileId?.address || "N/A"}</p> : null
                    }

                </div>
                {
                    fullUser?.role == "doctor" ?
                        <div className=" mt-6">
                            <p>{fullUser?.profileId?.description}</p>
                        </div> : null
                }
                {
                    fullUser?.role == "specialist" ?
                        <div className=" mt-6">
                            <p>{fullUser?.profileId?.description}</p>
                            <div className="mt-5">
                                {fullUser?.profileId?.protocolNames?.map((name) => (
                                    <span className="text-sm text-gray-800 border border-gray-300 px-3 py-1 rounded-md mr-2">{name}</span>
                                ))}
                            </div>
                        </div> : null
                }
                <div className="text-right mt-6">
                    <Button
                        type="primary"
                        className="!bg-blue-500 h-10 hover:!bg-blue-400 text-white"
                        onClick={handleEditProfile}
                    >
                        Edit profile
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
