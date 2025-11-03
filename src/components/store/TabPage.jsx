
// ProductTabComponent.jsx - Main component that imports all category pages
"use client"
import React, { useEffect, useState } from 'react';
import { Tabs, Input, Badge, Button } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// Import individual category pages


// Import product data and shared components
import { productData } from './productData'
import ProductCard from './ProductCard';
import SupplementsPage from './Suppliment';
import FitnessPage from './Fintness';
import WellnessPage from './Wellness';
import LabTestPage from './Labtest';
import { useGetAddToCartLangthQuery, useGetAllCategoriesQuery } from '@/redux/fetures/landing/landing';
import Link from 'next/link';



export default function ProductTabComponent() {



  const { data, isLoading } = useGetAllCategoriesQuery();
  const fullCategories = data?.data?.attributes || [];
  const supplementCategories = fullCategories?.filter((category) => category.category === 'supplement');
  const wellnessCategories = fullCategories?.filter((category) => category.category === 'wellness');
  const labTestCategories = fullCategories?.filter((category) => category.category === 'labTest');
  const fitnessCategories = fullCategories?.filter((category) => category.category === 'fitness');

  console.log(labTestCategories);

  const { data: cartLengthData } = useGetAddToCartLangthQuery();

  const [activeTab, setActiveTab] = useState('all');

  console.log(productData)
  // Handle tab change
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // Handle see more click for category
  const handleSeeMoreClick = (category) => {
    setActiveTab(category.toLowerCase());
  };

  // Tab items configuration
  const tabItems = [
    { key: 'all', label: 'All' },
    { key: 'supplements', label: 'Supplements' },
    { key: 'fitness', label: 'Fitness' },
    { key: 'wellness', label: 'Wellness' },
    // { key: 'lifestyle', label: 'Lifestyle' },
    { key: 'labtest', label: 'Lab test' },
  ];

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'supplements':
        return <SupplementsPage products={supplementCategories} />;
      case 'fitness':
        return <FitnessPage products={fitnessCategories} />;
      case 'wellness':
        return <WellnessPage products={wellnessCategories} />;
      //   case 'lifestyle':
      //     return <LifestylePage />;
      case 'labtest':
        return <LabTestPage products={labTestCategories} />;
      default:
        return (
          <div>
            {/* Supplements section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Supplements</h2>
                <button
                  onClick={() => handleSeeMoreClick('supplements')}
                  className="text-blue-500 flex items-center"
                >
                  See More <span className="ml-1">→</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 items-start gap-4 mb-8">
                {supplementCategories[0]?.products?.slice(0, 4).map(product => (
                  <ProductCard
                    isLoading={isLoading}
                    key={product.id}
                    product={product}
                    onViewDetails={() => handleSeeMoreClick('supplements')}
                  />
                ))}
                {
                  !supplementCategories[0]?.products && supplementCategories[0]?.products?.length !== 0 && (
                    <p className='text-red-600 font-semibold'>No products available in this category.</p>
                  )
                }
              </div>
            </div>

            {/* Fitness section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Fitness</h2>
                <button
                  onClick={() => handleSeeMoreClick('fitness')}
                  className="text-blue-500 flex items-center"
                >
                  See More <span className="ml-1">→</span>
                </button>
              </div>

              <div className="grid grid-cols-1  lg:grid-cols-4 items-start gap-4 mb-8">
                {fitnessCategories[0]?.products?.slice(0, 4).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={() => handleSeeMoreClick('fitness')}
                  />
                ))}
                {
                  !fitnessCategories[0]?.products && fitnessCategories[0]?.products?.length !== 0 && (
                    <p className='text-red-600 font-semibold'>No products available in this category.</p>
                  )
                }
              </div>
            </div>

            {/* Wellness category */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Welness</h2>
                <button
                  onClick={() => handleSeeMoreClick('wellness')}
                  className="text-blue-500 flex items-center"
                >
                  See More <span className="ml-1">→</span>
                </button>
              </div>

              <div className="grid grid-cols-1  lg:grid-cols-4 items-start gap-4 mb-8">
                {wellnessCategories[0]?.products?.slice(0, 4).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={() => handleSeeMoreClick('wellness')}
                  />
                ))}
                {
                  !wellnessCategories[0]?.products && wellnessCategories[0]?.products.length !== 0 && (
                    <p className='text-red-600 font-semibold'>No products available in this category.</p>
                  )
                }
              </div>
            </div>

            {/* Lab test */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Lab Test</h2>
                <button
                  onClick={() => handleSeeMoreClick('labtest')}
                  className="text-blue-500 flex items-center"
                >
                  See More <span className="ml-1">→</span>
                </button>
              </div>

              <div className="grid grid-cols-1  lg:grid-cols-4 items-start gap-4 mb-8">
                {labTestCategories[0]?.products?.slice(0, 4).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={() => handleSeeMoreClick('labtest')}
                  />
                ))}
                {
                  !labTestCategories[0]?.products && labTestCategories[0]?.products.length !== 0 && (
                    <p className='text-red-600 font-semibold'>No products available in this category.</p>
                  )
                }
              </div>
            </div>


          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Navigation header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={tabItems}
          className="mb-4 md:mb-0"
        />

        <div className="flex items-center">
          {/* <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="w-64 mr-4 h-10"
          /> */}
          <div className="flex items-center">
            {/* <Button icon="🔍" size="large" className="mr-2" /> */}
            <Badge count={cartLengthData?.data?.attributes?.results[0]?.itemCount ? cartLengthData?.data?.attributes?.results[0]?.itemCount : 0} overflowCount={99}>
              <Link href="/viewcarts" className="ml-2">
                <Button icon={<ShoppingCartOutlined />} size="large" />
              </Link>
            </Badge>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
}