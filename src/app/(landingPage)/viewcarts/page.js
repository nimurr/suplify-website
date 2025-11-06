"use client";
import React, { useState, useEffect } from "react";
import {
    useGetAllcartProductsQuery,
    useIncreseCartProductMutation,
    useRemoveAddToCartProductMutation,
    useTakeOrderMutation,
} from "@/redux/fetures/landing/landing";
import toast, { Toaster } from "react-hot-toast";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const Page = () => {
    const { data, refetch, isLoading } = useGetAllcartProductsQuery();
    const fullData = data?.data?.attributes?.cart || [];
    const userToKnowHisSubscription = data?.data?.attributes?.userToKnowHisSubscription || [];

    console.log(fullData);

    const [increseAndDecrease] = useIncreseCartProductMutation();
    const [removeItem] = useRemoveAddToCartProductMutation();
    const [takeOrder] = useTakeOrderMutation();

    // ✅ Initialize quantity state
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (fullData?.length) {
            const initialQuantities = fullData.reduce((acc, product) => {
                acc[product._id] = product.quantity || 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [fullData]);

    // ✅ Handle Increase Quantity
    const handleIncrease = async (id) => {
        try {
            const res = await increseAndDecrease({ id, type: "inc" }).unwrap();
            if (res?.code === 200) {
                toast.success(res?.message);
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    // ✅ Handle Decrease Quantity
    const handleDecrease = async (id) => {
        try {
            const res = await increseAndDecrease({ id, type: "dec" }).unwrap();
            if (res?.code === 200) {
                toast.success(res?.message);
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    // ✅ Handle Delete Item
    const handleDelete = async (id) => {
        try {
            const res = await removeItem(id).unwrap();
            if (res?.code === 200) {
                toast.success(res?.message);
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message || "Delete failed");
        }
    };

    // ✅ Handle Checkout / Take Order
    const handleSubmitTakeOrder = async (e) => {
        e.preventDefault();
        const formData = {
            cartId: fullData[0]?.cartId,
            address: e.target.address.value,
            city: e.target.city.value,
            state: e.target.state.value,
            zipCode: e.target.zipCode.value,
            country: e.target.country.value,
        };

        try {
            const res = await takeOrder(formData).unwrap();
            console.log(res);
            if (res?.code === 200) {
                toast.success(res?.message);
                refetch();
                e.target.reset();
                window.location.href = `${res?.data?.attributes?.url}`;
            }
        } catch (error) {
            toast.error(error?.data?.message || "Order failed");
        }
    };

    // ✅ Calculate Total Price
    const totalPrice = fullData.reduce((acc, product) => {
        const qty = product?.quantity;
        return acc + (product?.itemId?.price || 0) * qty;
    }, 0);

    return (
        <div className="pt-32 px-4 container mx-auto">
            <Toaster />
            {isLoading && <h1 className="text-center text-lg">Loading...</h1>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 🛍 Left Side - Product List */}
                <div className="lg:col-span-2 space-y-4">
                    {fullData?.length === 0 ? (
                        <p className="text-center text-gray-500">No items in your cart.</p>
                    ) : (
                        fullData.map((product, index) => {
                            const qty = quantities[product._id] || product.quantity || 1;
                            const price = product?.itemId?.price || 0;

                            return (
                                <div
                                    key={product._id || index}
                                    className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
                                >
                                    {/* Product Info */}
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={
                                                product?.itemId?.attachments?.[0]?.attachment ||
                                                "/placeholder.png"
                                            }
                                            alt={product?.itemId?.name || "Product"}
                                            className="w-16 h-16 rounded-md object-cover border"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                {product?.itemId?.name || "Product"}
                                            </h3>
                                            <p className="text-gray-600">${price}</p>
                                        </div>
                                    </div>

                                    {/* Quantity Control */}
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => handleDecrease(product._CartItemId)}
                                            className="border rounded-full w-6 h-6 flex items-center justify-center"
                                        >
                                            <MinusOutlined className="text-gray-600 text-xs" />
                                        </button>
                                        <span className="text-sm font-medium">{product?.quantity}</span>
                                        <button
                                            onClick={() => handleIncrease(product._CartItemId)}
                                            className="border rounded-full w-6 h-6 flex items-center justify-center"
                                        >
                                            <PlusOutlined className="text-red-500 text-xs" />
                                        </button>
                                    </div>

                                    {/* Price & Delete */}
                                    <div className="flex items-center space-x-4">
                                        <p className="font-semibold">${price * product?.quantity}</p>
                                        <DeleteOutlined
                                            className="text-gray-500 hover:text-red-500 cursor-pointer"
                                            onClick={() => handleDelete(product._CartItemId)}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Right Side - Order Summary */}
                <div className="border rounded-lg p-6 shadow-sm h-fit">
                    <h3 className="font-semibold mb-4 text-gray-800">Order Summary</h3>
                    <div className="border-b pb-2 mb-2 text-sm text-gray-600 space-y-5">
                        {fullData.map((product, i) => {
                            const qty = quantities[product._id] || product.quantity || 1;
                            return (
                                <div key={i} className="flex justify-between">
                                    <span className="capitalize">
                                        {product?.itemId?.name || "Product"}
                                        <span className="text-blue-400 ml-2">x{product?.quantity}</span>
                                    </span>
                                    <span>  ${(product?.itemId?.price || 0) * product?.quantity}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <div className="flex justify-between  font-semibold text-gray-800">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span> {/* No discount applied */}
                        </div>
                    </div>

                    {
                        userToKnowHisSubscription?.subscriptionType === "standard" && (
                            <div>
                                <div className="flex my-2 justify-between font-semibold text-gray-800">
                                    <span>No discount available</span>
                                </div>
                                <div className="flex border-t pt-2  justify-between font-semibold text-gray-800">
                                    <span>Total</span>
                                    <span>${totalPrice.toFixed(2)}</span> {/* No discount applied */}
                                </div>
                            </div>
                        )
                    }

                    {
                        userToKnowHisSubscription?.subscriptionType === "standardPlus" && (
                            <div>
                                <div className="flex my-2 justify-between font-semibold text-gray-800">
                                    <span>You got 15% discount</span>
                                    <span>${(totalPrice * 0.15).toFixed(2)}</span> {/* 15% discount amount */}
                                </div>
                                <div className="flex border-t pt-2  justify-between font-semibold text-gray-800">
                                    <span>Total</span>
                                    <span>${(totalPrice - (totalPrice * 0.15)).toFixed(2)}</span> {/* Total after 15% discount */}
                                </div>
                            </div>
                        )
                    }

                    {
                        userToKnowHisSubscription?.subscriptionType === "vise" && (
                            <div>
                                <div className="flex my-2 justify-between font-semibold text-gray-800">
                                    <span>You got 20% discount</span>
                                    <span>${(totalPrice * 0.20).toFixed(2)}</span> {/* 20% discount amount */}
                                </div>
                                <div className="flex border-t pt-2 justify-between font-semibold text-gray-800">
                                    <span>Total</span>
                                    <span>${(totalPrice - (totalPrice * 0.20)).toFixed(2)}</span> {/* Total after 20% discount */}
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>

            {/* 🧾 Checkout Form */}
            <div className="my-12 pb-10 border border-gray-200 p-5 rounded-lg">
                <h3 className="font-semibold text-center text-2xl text-gray-800 mb-4">Shipping Details</h3>
                <form onSubmit={handleSubmitTakeOrder} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Type your address"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Type city name"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="country"
                                placeholder="Type country name"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                State <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="state"
                                placeholder="Type state name"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Zip Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="Type zip code"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-all"
                    >
                        Checkout
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;
