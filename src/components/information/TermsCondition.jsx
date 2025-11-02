"use client"


import React, { useEffect, useState } from 'react';
import { Typography, Divider } from 'antd';
import Header from '../customComponent/Header';
import { useTermsConditionQuery } from '@/redux/fetures/information/getTermsCondition';

const { Title, Paragraph } = Typography;
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
const TermsCondition = () => {

  const [content, setContent] = useState("");
 const {data: termcondition} =  useTermsConditionQuery()
 console.log(termcondition); 
 
 
  

  useEffect(() => {
    if (termcondition) {
      // Decode the HTML content before setting it
      const decodedContent = decodeHtml(termcondition?.data?.attributes?.text);
      setContent(decodedContent);
    }
  }, [termcondition]);

  return (
    <div className="bg-white p-6 max-w-4xl mx-auto mt-12 shadow-md rounded-lg">
      <Header size="extraLarge" className="text-green-700 mt-5 text-center mb-12">
        Terms Condition
      </Header>
      <div dangerouslySetInnerHTML={{ __html:  content }} />
    </div>
  );
};

export default TermsCondition;
