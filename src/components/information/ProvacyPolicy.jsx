"use client"


import React, { useEffect, useState } from 'react';
import { Typography, Divider } from 'antd';
import Header from '../customComponent/Header';
import { usePrivacyPolicyQuery } from '@/redux/fetures/information/getProvacy';

const { Title, Paragraph } = Typography;

const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const PrivacyPolicy = () => {


  const [content, setContent] = useState("");

 
  const { data: privacy } = usePrivacyPolicyQuery();
  console.log(privacy)

  useEffect(() => {
    if (privacy) {
      // Decode the HTML content before setting it
      const decodedContent = decodeHtml(privacy.data.attributes?.text);
      setContent(decodedContent);
    }
  }, [privacy]);


  return (
    <div className="bg-white p-6 max-w-4xl mx-auto mt-12 shadow-md rounded-lg">
    <Header size="extraLarge" className="text-green-700 mt-5 text-center mb-12">
       Privacy policy
    </Header>
    <div dangerouslySetInnerHTML={{ __html:  content }} />
  </div>
  );
};

export default PrivacyPolicy;
