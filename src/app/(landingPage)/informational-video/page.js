'use client';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { LuCirclePlay } from 'react-icons/lu';

// Example video data (could be fetched from an API or stored in a separate JSON file)
const videoData = [
    {
        id: 1,
        title: 'Video 1',
        description: 'Description for Video 1',
        image: '/images/doctor.png',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
        id: 2,
        title: 'Video 2',
        description: 'Description for Video 2',
        image: '/images/doctor.png',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    // Add more video data here
];

const Page = () => {
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
        <div className="py-16 pt-28 md:pt-40 container">
            <h2 className="text-3xl font-semibold mb-5">Informational video</h2>

            <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-5">
                {videoData.map((video) => (
                    <div key={video.id} className="p-3 rounded-lg border border-gray-300">
                        <div className="relative">
                            <img
                                className="w-full opacity-80 rounded-lg max-h-[300px]"
                                src={video.image}
                                alt={video.title}
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center"></span>
                            <LuCirclePlay
                                onClick={() => handleOpenModalForShowVideo(video)}
                                className="absolute cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-black"
                            />
                        </div>
                        <h3 className="text-2xl font-semibold my-3">{video.title}</h3>
                        <p className="font-medium text-gray-500">{video.description}</p>
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
                        src={selectedVideo?.videoUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <p className="font-medium text-gray-500 mt-4">{selectedVideo?.description}</p>
            </Modal>
        </div>
    );
};

export default Page;