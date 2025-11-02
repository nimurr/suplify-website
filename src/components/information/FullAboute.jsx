"use client"

import React, { useEffect, useState } from 'react';
import { Typography, Divider } from 'antd';
import Header from '../customComponent/Header';
import { useAbouteUsQuery } from '@/redux/fetures/information/aboutus';
 
 
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

 

const FullAboute = () => {
  const [content, setContent] = useState( )
  const {data: aboutus} = useAbouteUsQuery()

 
  useEffect(() => {
    if (aboutus) {
      const decodedContent = decodeHtml(aboutus?.data?.attributes?.text);
      setContent(decodedContent);
    }
  }, [aboutus]);

  return (
    <div className="bg-white min-h-screen p-6 max-w-4xl mx-auto mt-12 shadow-md rounded-lg">
      <Header size="extraLarge" className="text-green-700 mt-5 text-center mb-12">
         About us
      </Header>
      <p dangerouslySetInnerHTML={{ __html: content }}> 
      </p>
    </div>
  );
};

export default FullAboute;
