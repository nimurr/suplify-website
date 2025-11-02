
// "use client"

// import React from 'react';
// import { Heart, ChevronRight } from 'lucide-react';
// import Link from 'next/link';

// export default function SupplementsPage() {
//   // Sample product data
//   const supplements = [
//     {
//       id: 1,
//       name: 'Supplements',
//       price: 250,
//       image: '/api/placeholder/400/320',
//       description: 'Description for this item is very brief. Click here to learn more to know in details of the item...'
//     },
//     {
//       id: 2,
//       name: 'Supplements',
//       price: 250,
//       image: '/api/placeholder/400/320',
//       description: 'Description for this item is very brief. Click here to learn more to know in details of the item...'
//     },
//     {
//       id: 3,
//       name: 'Supplements',
//       price: 250,
//       image: '/api/placeholder/400/320',
//       description: 'Description for this item is very brief. Click here to learn more to know in details of the item...'
//     },
//     {
//       id: 4,
//       name: 'Supplements',
//       price: 250,
//       image: '/api/placeholder/400/320',
//       description: 'Description for this item is very brief. Click here to learn more to know in details of the item...'
//     }
//   ];

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       {/* Header with "See More" link */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-bold">Supplements</h1>
//         <Link href="/supplements" className="text-blue-600 flex items-center text-sm">
//           See More <ChevronRight size={16} />
//         </Link>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {supplements.map((product) => (
//           <SupplementCard 
//             key={product.id}
//             product={product}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function SupplementCard({ product }) {
//   return (
//     <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//       {/* Product Image with Wishlist Button */}
//       <div className="relative">
//         <Link href={`/supplements/${product.id}`}>
//           <div className="bg-red-500 h-48 w-full">
//             <img 
//               src={product.image} 
//               alt={product.name} 
//               className="w-full h-full object-cover" 
//             />
//           </div>
//         </Link>
//         <button className="absolute top-2 right-2 bg-white p-1 rounded-full" aria-label="Add to wishlist">
//           <Heart size={20} className="text-gray-500" />
//         </button>
//       </div>

//       {/* Product Info */}
//       <div className="p-3">
//         <div className="text-sm text-gray-600 mb-1">{product.name}</div>
//         <div className="flex justify-between items-center mb-2">
//           <div className="text-lg font-bold">${product.price}</div>
//           <button className="text-red-500 border border-red-500 p-1 rounded-md" aria-label="Add to cart">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
//               <path d="M20 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
//               <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
//             </svg>
//           </button>
//         </div>
//         <p className="text-xs text-gray-500">
//           {product.description.substring(0, 85)}
//           <Link 
//             href={`/supplements/${product.id}`}
//             className="text-blue-500 ml-1 hover:underline"
//           >
//             see more
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// // Product details page component (to be placed in /pages/supplements/[id].js)
// export function ProductDetailsPage() {
//   // This would normally come from useRouter() and a data fetch
//   const product = {
//     id: 1,
//     name: 'Supplements',
//     price: 250,
//     image: '/api/placeholder/400/320',
//     fullDescription: 'This premium supplement contains a blend of essential vitamins and minerals designed to support your overall health and wellbeing. Our scientifically formulated product helps boost energy levels, supports immune function, and promotes optimal metabolic health. Made with high-quality ingredients and manufactured in FDA-approved facilities.',
//     features: ['Premium quality', 'Science-backed formula', 'No artificial preservatives', '60 capsules per bottle'],
//     usage: 'Take 2 capsules daily with water, preferably with a meal.'
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       {/* Breadcrumb */}
//       <div className="mb-6">
//         <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
//         <span className="mx-2 text-gray-400">/</span>
//         <Link href="/supplements" className="text-gray-500 hover:text-gray-700">Supplements</Link>
//         <span className="mx-2 text-gray-400">/</span>
//         <span className="text-gray-900">{product.name}</span>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Product Image */}
//         <div className="md:w-1/2">
//           <div className="bg-red-500 rounded-lg">
//             <img 
//               src={product.image} 
//               alt={product.name} 
//               className="w-full object-cover rounded-lg" 
//             />
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="md:w-1/2">
//           <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
//           <div className="text-3xl font-bold text-red-500 mb-6">${product.price}</div>

//           <p className="text-gray-700 mb-6">{product.fullDescription}</p>

//           <h3 className="font-medium mb-2">Features:</h3>
//           <ul className="list-disc pl-5 mb-4">
//             {product.features.map((feature, index) => (
//               <li key={index} className="text-gray-600 mb-1">{feature}</li>
//             ))}
//           </ul>

//           <h3 className="font-medium mb-2">Recommended Usage:</h3>
//           <p className="text-gray-600 mb-8">{product.usage}</p>

//           <div className="flex gap-4 mb-8">
//             <div className="border rounded-md flex items-center">
//               <button className="px-3 py-2 text-xl">-</button>
//               <span className="px-4 py-2 border-l border-r">1</span>
//               <button className="px-3 py-2 text-xl">+</button>
//             </div>

//             <button className="bg-red-500 text-white px-8 py-3 rounded-md font-medium hover:bg-red-600 flex-grow">
//               Add to Cart
//             </button>

//             <button className="border border-gray-300 p-3 rounded-md hover:bg-gray-100">
//               <Heart size={24} className="text-gray-500" />
//             </button>
//           </div>

//           <div className="border-t pt-4">
//             <div className="text-sm text-gray-500">SKU: SUPP-001</div>
//             <div className="text-sm text-gray-500">Category: Supplements</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// SupplementsPage.jsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';

import { productData } from './productData'

const SupplementsPage = ({ products }) => {


  const fullData = products[0]?.products;

  console.log(products[0]?.products);
  const supplements = [
    { id: 1, category: 'supplements', name: 'Protein Powder', price: 250, image: '/images/supliment.png' },
    { id: 6, category: 'supplements', name: 'BCAA Capsules', price: 250, image: '/images/supliment.png' },
    { id: 7, category: 'supplements', name: 'Creatine Powder', price: 250, image: '/images/supliment.png' },
    { id: 8, category: 'supplements', name: 'Fish Oil Capsules', price: 250, image: '/images/supliment.png' },
  ]



  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };


  return (
    <div>
      {fullData && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Supplements</h2>
          </div>

          <div className="grid grid-cols-1  lg:grid-cols-4 gap-4">
            {fullData?.map(product => (
              <ProductCard key={product?.id} product={product} onViewDetails={handleViewDetails} />
            ))}
          </div>
        </>
      )}
      {
        !fullData && (
          <h2>No products found</h2>
        )
      }
    </div>
  );
};

export default SupplementsPage;