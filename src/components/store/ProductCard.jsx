import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAddTocartProductMutation } from '@/redux/fetures/landing/landing';
import toast, { Toaster } from 'react-hot-toast';
import { ChevronRight } from 'lucide-react';

const ProductCard = ({ product, onViewDetails }) => {

  const [addToCardItem] = useAddTocartProductMutation();

  const handleAddCard = async (id) => {
    const data = {
      itemId: id,
    };
    try {
      const res = await addToCardItem(data).unwrap();
      console.log(res);
      if (res?.code === 200) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add to cart");
    }
  };

  const [show, setShow] = useState(false); // State to toggle description

  const toggleDescription = () => {
    setShow((prev) => !prev); // Toggle between showing full or truncated description
  };

  return (
    <Card
      className="overflow-hidden"
      cover={
        <div className="relative bg-red-500 h-48">
          <img
            src={product?.attachments && product.attachments.length > 0 ? product.attachments[0]?.attachment : '/placeholder.png'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      }
      bodyStyle={{ padding: '16px' }}
    >
      <Toaster />
      <p className="text-gray-700 font-semibold text-xl">{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</p>
      <h3 className="text-2xl font-bold">${product.price}</h3>
      <p className="text-sm text-gray-500 mb-2">
        {/* Render either truncated or full description based on state */}
        {show ? product?.description : (product?.description?.length > 100 ? product.description.slice(0, 100) + '...' : product?.description)}

        {/* Toggle button to see more or less */}
        {product?.description?.length > 100 && (
          <button onClick={toggleDescription} className="text-blue-600 flex items-center text-sm">
            {show ? (
              <>See Less <ChevronRight size={16} /></>
            ) : (
              <>See More <ChevronRight size={16} /></>
            )}
          </button>
        )}
      </p>
      <Button
        onClick={() => handleAddCard(product?._id)}
        icon={<ShoppingCartOutlined />}
        className="float-right"
      />
    </Card>
  );
};

export default ProductCard;