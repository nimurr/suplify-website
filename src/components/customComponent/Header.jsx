// components/Header.js
import React from "react";

const Header = ({ size = "large", children, className = "" }) => {
  // Define size-based styles
  const sizeClasses = {
    small: "text-lg md:text-xl font-medium", // Small headers with mobile and desktop styles
    medium: "text-xl md:text-2xl font-semibold", // Medium headers
    large: "text-2xl md:text-3xl font-bold", // Large headers
    extraLarge: "text-3xl md:text-[60px] lg:text-[64px] font-bold", // Extra-large headers
  };

  // Combine size and custom className
  const headerClass = `${sizeClasses[size] || sizeClasses.large} ${className}`;

  return <h1 className={headerClass}>{children}</h1>;
};

export default Header;

