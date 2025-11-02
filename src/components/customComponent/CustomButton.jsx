// components/CustomButton.jsx
import React from 'react';

const CustomButton = ({ 
  onClick, 
  text = 'Click Me',
  style = {}, 
  className = '' 
}) => {
  const defaultStyle = {
    backgroundColor: '#EF4444',
    borderColor: '#ef4444',
    color: '#FFFF',
    
    
  };

  return (
    <button
      onClick={onClick}
      style={{ ...defaultStyle, ...style }}
      className={`w-full rounded-md p-2 ${className}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
