// ProductDetail.jsx
import React from 'react';
import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import LabTestPage from './Labtest';

const LabDetail = ({ product, onBack }) => {
  // Mock multiple product images for the carousel
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image
  ];
  
  return (
    <div className="mt-4">
      <Button onClick={onBack} className="mb-4">
        ← Back to Products
      </Button>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Product image */}
          <div className="w-full md:w-1/2">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 md:h-80 object-cover bg-red-500"
            />
            
            {/* Thumbnail carousel */}
            <div className="relative mt-4">
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10">
                &lt;
              </button>
              
              <div className="flex overflow-x-auto gap-2 px-6">
                {productImages.map((img, index) => (
                  <div 
                    key={index} 
                    className={`flex-shrink-0 w-16 h-16 border-2 ${index === 0 ? 'border-red-500' : 'border-gray-200'}`}
                  >
                    <img src={img} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10">
                &gt;
              </button>
            </div>
          </div>
          
          {/* Right side - Product details */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</h2>
            
            <p className="text-gray-600 mb-4">Description</p>
            
            <div className="text-gray-700 mb-6">
              <p className="mb-2">
                Lorem ipsum dolor sit amet consectetur. Massa risus eget justo vel urna sapien posuere. Mauris magna egestas vestibulum cum egestas etiam pulvinar dolor. Massa curabitur quis felis ultricies netus eget facilisi auctor nunc. Aliquam lacus ut adipisci sollicitudin viverra eu dignissim. Arcu eget posuere pretium sit porttitor leo id. Libero proin euismod eget sed nulla ornare mattis.
              </p>
              <p className="mb-2">
                Velit ac quam in locus. Ultrices sapien risus quam diam porttitor feugiat. Eget consequat viverra turpis mi consequat duis felis congue gravida labore turpis pellentesque. Et consectetur sollicitudin blandit ridiculus sed. Nulla fermentum sit augue nibh eros ultricies. Vitae tempus bibendum nunc sed in commodo interdum mi aliquet. Nibh porttitor lacus a vel turpis. Velit non cursus et velit. Facilisi blandit sit pretium cum odio id. Urna non posuere odio sed hendrerit purus. Facilisi est in maecenas eget nibh bibendum a orci.
              </p>
            </div>
            
            <Button 
              type="primary" 
              icon={<ShoppingCartOutlined />} 
              size="large"
              className="bg-red-500 hover:bg-red-600 border-none w-full md:w-auto"
            >
             Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* // banner //// */}

      <div className='flex justify-center md:py-12'>
         <img src="/images/banner.png" alt="" />
      </div>

      <div className='text-3xl mt-12'>

      <h1>Related Product</h1>
      <hr />
      <LabTestPage />
      </div>

    </div>
  );
};

export default LabDetail;