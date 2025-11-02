


// "use client"

// import { useState } from 'react';
// import { Tabs, Input, Badge, Card, Button, Carousel } from 'antd';
// import { SearchOutlined, ShoppingCartOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

// // Mock product data
// const productData = {
//   supplements: [
//     { id: 1, category: 'supplements', name: 'Protein Powder', price: 250, image: '/images/supliment.png' },
//     { id: 6, category: 'supplements', name: 'BCAA Capsules', price: 250, image: '/images/supliment.png' },
//     { id: 7, category: 'supplements', name: 'Creatine Powder', price: 250, image: '/images/supliment.png' },
//     { id: 8, category: 'supplements', name: 'Fish Oil Capsules', price: 250, image: '/images/supliment.png' },
//   ],
//   fitness: [
//     { id: 2, category: 'fitness', name: 'Resistance Bands', price: 150, image: '/images/fitnesss.png' },
//     { id: 9, category: 'fitness', name: 'Dumbbells', price: 300, image: '/images/fitnesss.png' },
//   ],
//   wellness: [
//     { id: 3, category: 'wellness', name: 'Vitamin Complex', price: 180, image: '/images/wellness.png' },
//     { id: 10, category: 'wellness', name: 'Essential Oils', price: 120, image: '/images/wellness.png' },
//   ],
//   lifestyle: [
//     { id: 4, category: 'lifestyle', name: 'Yoga Mat', price: 120, image: '/images/workout.jpg' },
//     { id: 11, category: 'lifestyle', name: 'Water Bottle', price: 35, image: '/images/workout.jpg' },
//   ],
//   labtest: [
//     { id: 5, category: 'labtest', name: 'Blood Test Kit', price: 350, image: '/images/lab.png' },
//     { id: 12, category: 'labtest', name: 'DNA Test Kit', price: 450, image: '/images/lab.png' },
//   ]
// };

// // Product Detail Component - Shared across all category pages
// export const ProductDetail = ({ product, onBack }) => {
//   // Mock multiple product images for the carousel
//   const productImages = [
//     product.image,
//     product.image,
//     product.image,
//     product.image,
//     product.image
//   ];

//   return (
//     <div className="mt-4">
//       <Button onClick={onBack} className="mb-4">
//         ← Back to Products
//       </Button>

//       <div className="bg-white rounded-lg shadow-sm p-6">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Left side - Product image */}
//           <div className="w-full md:w-1/2">
//             <img 
//               src={product.image} 
//               alt={product.name} 
//               className="w-full h-64 md:h-80 object-cover bg-red-500"
//             />

//             {/* Thumbnail carousel */}
//             <div className="relative mt-4">
//               <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10">
//                 &lt;
//               </button>

//               <div className="flex overflow-x-auto gap-2 px-6">
//                 {productImages.map((img, index) => (
//                   <div 
//                     key={index} 
//                     className={`flex-shrink-0 w-16 h-16 border-2 ${index === 0 ? 'border-red-500' : 'border-gray-200'}`}
//                   >
//                     <img src={img} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
//                   </div>
//                 ))}
//               </div>

//               <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10">
//                 &gt;
//               </button>
//             </div>
//           </div>

//           {/* Right side - Product details */}
//           <div className="w-full md:w-1/2">
//             <h2 className="text-2xl font-bold mb-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</h2>

//             <p className="text-gray-600 mb-4">Description</p>

//             <div className="text-gray-700 mb-6">
//               <p className="mb-2">
//                 Lorem ipsum dolor sit amet consectetur. Massa risus eget justo vel urna sapien posuere. Mauris magna egestas vestibulum cum egestas etiam pulvinar dolor. Massa curabitur quis felis ultricies netus eget facilisi auctor nunc. Aliquam lacus ut adipisci sollicitudin viverra eu dignissim. Arcu eget posuere pretium sit porttitor leo id. Libero proin euismod eget sed nulla ornare mattis.
//               </p>
//               <p className="mb-2">
//                 Velit ac quam in locus. Ultrices sapien risus quam diam porttitor feugiat. Eget consequat viverra turpis mi consequat duis felis congue gravida labore turpis pellentesque. Et consectetur sollicitudin blandit ridiculus sed. Nulla fermentum sit augue nibh eros ultricies. Vitae tempus bibendum nunc sed in commodo interdum mi aliquet. Nibh porttitor lacus a vel turpis. Velit non cursus et velit. Facilisi blandit sit pretium cum odio id. Urna non posuere odio sed hendrerit purus. Facilisi est in maecenas eget nibh bibendum a orci.
//               </p>
//             </div>

//             <Button 
//               type="primary" 
//               icon={<ShoppingCartOutlined />} 
//               size="large"
//               className="bg-red-500 hover:bg-red-600 border-none w-full md:w-auto"
//             >
//               Add to Cart
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Product Card Component - Shared across all category pages
// export const ProductCard = ({ product, onViewDetails }) => {
//   return (
//     <Card
//       className="overflow-hidden"
//       cover={
//         <div className="relative bg-red-500 h-48">
//           <img 
//             src={product.image} 
//             alt={product.name} 
//             className="w-full h-full object-cover"
//           />
//           <Button 
//             icon={<ShoppingCartOutlined />} 
//             className="absolute top-2 right-2 bg-white"
//           />
//         </div>
//       }
//       bodyStyle={{ padding: '16px' }}
//     >
//       <p className="text-gray-600">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
//       <h3 className="text-lg font-bold">${product.price}</h3>
//       <p className="text-sm text-gray-500 mb-2">
//         Description for this item is very important for the user, they have to know in details of the item...
//         <button 
//           onClick={() => onViewDetails(product)} 
//           className="text-blue-500 ml-1"
//         >
//           see more
//         </button>
//       </p>
//       <Button 
//         icon={<ShoppingCartOutlined />} 
//         className="float-right"
//       />
//     </Card>
//   );
// };

// // Individual Category Pages
// export const SupplementsPage = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleViewDetails = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleBackToProducts = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <div>
//       {selectedProduct ? (
//         <ProductDetail product={selectedProduct} onBack={handleBackToProducts} />
//       ) : (
//         <>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Supplements</h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {productData.supplements.map(product => (
//               <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export const FitnessPage = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleViewDetails = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleBackToProducts = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <div>
//       {selectedProduct ? (
//         <ProductDetail product={selectedProduct} onBack={handleBackToProducts} />
//       ) : (
//         <>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Fitness</h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {productData.fitness.map(product => (
//               <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export const WellnessPage = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleViewDetails = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleBackToProducts = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <div>
//       {selectedProduct ? (
//         <ProductDetail product={selectedProduct} onBack={handleBackToProducts} />
//       ) : (
//         <>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Wellness</h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {productData.wellness.map(product => (
//               <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export const LifestylePage = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleViewDetails = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleBackToProducts = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <div>
//       {selectedProduct ? (
//         <ProductDetail product={selectedProduct} onBack={handleBackToProducts} />
//       ) : (
//         <>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Lifestyle</h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {productData.lifestyle.map(product => (
//               <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export const LabTestPage = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleViewDetails = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleBackToProducts = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <div>
//       {selectedProduct ? (
//         <ProductDetail product={selectedProduct} onBack={handleBackToProducts} />
//       ) : (
//         <>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Lab Tests</h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {productData.labtest.map(product => (
//               <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // Main Tab Component that imports and uses individual category pages
// export default function ProductTabComponent() {
//   const [activeTab, setActiveTab] = useState('all');

//   // Handle tab change
//   const handleTabChange = (key) => {
//     setActiveTab(key);
//   };

//   // Handle see more click for category
//   const handleSeeMoreClick = (category) => {
//     setActiveTab(category.toLowerCase());
//   };

//   // Tab items configuration
//   const tabItems = [
//     { key: 'all', label: 'All' },
//     { key: 'supplements', label: 'Supplements' },
//     { key: 'fitness', label: 'Fitness' },
//     { key: 'wellness', label: 'Wellness' },
//     { key: 'lifestyle', label: 'Lifestyle' },
//     { key: 'labtest', label: 'Lab test' },
//   ];

//   // Render content based on active tab
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'supplements':
//         return <SupplementsPage />;
//       case 'fitness':
//         return <FitnessPage />;
//       case 'wellness':
//         return <WellnessPage />;
//       case 'lifestyle':
//         return <LifestylePage />;
//       case 'labtest':
//         return <LabTestPage />;
//       default:
//         return (
//           <div>
//             {/* All products view with categories */}
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">Supplements</h2>
//                 <button 
//                   onClick={() => handleSeeMoreClick('supplements')} 
//                   className="text-blue-500 flex items-center"
//                 >
//                   See More <span className="ml-1">→</span>
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                 {productData.supplements.slice(0, 4).map(product => (
//                   <ProductCard 
//                     key={product.id} 
//                     product={product} 
//                     onViewDetails={() => handleSeeMoreClick('supplements')} 
//                   />
//                 ))}
//               </div>
//             </div>

//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">Fitness</h2>
//                 <button 
//                   onClick={() => handleSeeMoreClick('fitness')} 
//                   className="text-blue-500 flex items-center"
//                 >
//                   See More <span className="ml-1">→</span>
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                 {productData.fitness.slice(0, 4).map(product => (
//                   <ProductCard 
//                     key={product.id} 
//                     product={product} 
//                     onViewDetails={() => handleSeeMoreClick('fitness')} 
//                   />
//                 ))}
//               </div>
//             </div>


//             <div>

//             <WellnessPage />
//             </div>

//             {/* Add other categories similarly */}
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* Navigation header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//         <Tabs 
//           activeKey={activeTab} 
//           onChange={handleTabChange} 
//           items={tabItems}
//           className="mb-4 md:mb-0"
//         />

//         <div className="flex items-center">
//           <Input 
//             placeholder="Search" 
//             prefix={<SearchOutlined />} 
//             className="w-64 mr-4"
//           />

//           <div className="flex items-center">
//             <Badge count={28} overflowCount={99}>
//               <Button icon={<ShoppingCartOutlined />} size="large" />
//             </Badge>
//             <Button icon="🔍" size="large" className="ml-2" />
//           </div>
//         </div>
//       </div>

//       {/* Content area */}
//       <div>
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// }


// ProductTabComponent.jsx - Main component that imports all category pages
"use client"
import React, { useState } from 'react';
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