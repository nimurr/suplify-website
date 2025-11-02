

"use client";
import React, { useState } from "react";
 
 
 
const CustomBanner = () => {
  

  return (
    <div className=" ">
      <div
        className="h-[200px] lg:h-[300px] w-full"
        style={{
          backgroundImage: "url('/images/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxSizing: "border-box",
        }}
      > 
      </div>
    </div>
  );
};

export default CustomBanner;
