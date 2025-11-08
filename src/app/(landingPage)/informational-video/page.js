'use client';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { LuCirclePlay } from 'react-icons/lu';
import { useGetAllInformationVideoQuery } from '@/redux/fetures/landing/landing';


const Page = () => {

    const { data, isLoading } = useGetAllInformationVideoQuery();
    const fullData = data?.data?.attributes?.results || [];
    console.log(fullData);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleOpenModalForShowVideo = (video) => {
        setSelectedVideo(video);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedVideo(null);
    };

    return (
        <div className="py-16 pt-28 md:pt-32 container">
            <h2 className="text-3xl font-semibold mb-10">Informational video</h2>

            <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-5">
                {
                    isLoading && [1, 2, 3, 4, 5].map((item) => (
                        <div className="mx-auto w-full max-w-sm rounded-md border border-gray-200 p-4">
                            <div className="flex animate-pulse space-x-4">
                                <div className="size-10 rounded-full bg-gray-200"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 rounded bg-gray-200"></div>
                                    <div className="h-2 rounded bg-gray-200"></div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                        <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                    </div>
                                    <div className="h-2 rounded bg-gray-200"></div>
                                    <div className="h-2 rounded bg-gray-200"></div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                        <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                    </div>
                                    <div className="h-2 rounded bg-gray-200"></div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                            <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                        </div>
                                        <div className="h-2 rounded bg-gray-200"></div>
                                        <div className="h-2 rounded bg-gray-200"></div>
                                        <div className="h-2 rounded bg-gray-200"></div>
                                        <div className="h-2 rounded bg-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {fullData?.map((video) => (
                    <div key={video.id} className="p-3 rounded-lg border border-gray-300">
                        <div className="relative">
                            <img
                                className="w-full opacity-80 rounded-lg max-h-[300px] min-h-[300px]"
                                src={video.thumbnail[0]?.attachment}
                                alt={video.title}
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center"></span>
                            <LuCirclePlay
                                onClick={() => handleOpenModalForShowVideo(video)}
                                className="absolute cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-black"
                            />
                        </div>
                        <h3 className="text-2xl font-semibold my-3">{video.title}</h3>
                        <p className="font-medium text-gray-500">{video.description?.length > 100 ? video.description.slice(0, 100) + '...' : video.description || 'No description available!'}</p>
                    </div>
                ))}
            </div>

            {/* Ant Design Modal */}
            <Modal
                title={selectedVideo?.title}
                visible={modalVisible}
                onCancel={handleCloseModal}
                footer={null}
                width={800}
                bodyStyle={{ padding: 0 }}
                centered
            >
                <div className="relative pb-[56.25%]">
                    <iframe
                        title="video"
                        className="absolute top-0 left-0 w-full h-full"
                        src={selectedVideo?.video[0]?.attachment}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay; unmuted"
                        allowFullScreen
                        controlls
                    ></iframe>
                </div>

                <p className="font-medium text-gray-500 mt-4">{selectedVideo?.description}</p>
            </Modal>
        </div>
    );
};

export default Page;