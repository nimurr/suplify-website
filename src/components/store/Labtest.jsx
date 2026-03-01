// LabTestPage.jsx
import React, { useState } from 'react';
import ProductCardForLabTest from './ProductCardForLabTest';
import { useGetAllProductsByCategoryQuery } from '@/redux/fetures/landing/landing';

const LabTestPage = () => {

  const [category, setCategory] = useState('labtest');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data } = useGetAllProductsByCategoryQuery({ category, page, limit });
  const fullData = data?.data?.attributes?.results || [];
  console.log(fullData)

  const totalPages = data?.data?.attributes?.totalPages || 1;

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
            <h2 className="text-2xl font-bold">Lab Test</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {fullData?.map(product => (
              <ProductCardForLabTest
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
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

export default LabTestPage;