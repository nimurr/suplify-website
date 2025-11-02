
"use client"

// components/Banner.tsx 
import { X } from 'lucide-react'

import React from 'react';
import Header from '../customComponent/Header';
import { useStartVideoQuery } from '@/redux/fetures/landing/landing';

const IntroductionVideo = () => {

  const { data } = useStartVideoQuery();
  const fullData = data?.data?.attributes[0]?.introductionVideo?.attachment;
  console.log(fullData);


  return (
    <div>
      <Header size="medium" className=" text-center mt-5"> Introduction </Header>
      <div className="relative w-[60%] mt-12 mx-auto">

        {/* Video Container */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          {fullData ? (
            <div key={fullData} className="relative overflow-hidden ">
              <video autoPlay controls className="rounded-lg border-2 border-[#eee] w-full mx-auto h-auto">
                <source src={fullData} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <p className="text-center text-gray-500">No video selected. Please upload a video.</p>
          )}

          {/* Alternative: YouTube/Vimeo Embed */}
          {/* 
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1"
                title="Fitness Introduction Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              */}
        </div>
      </div>
    </div>
  );
};

export default IntroductionVideo;