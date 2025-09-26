import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BackendURL, currency } from '../App';
import { Trash2 } from "lucide-react";

const statusOptions = ["Pending", "Processing", "In Transit", "Delivered", "Cancelled"];

const Order = ({ token }) => {

    const [orders, setOrders] = useState([]);

    const fetchOrder = async () => {
        try {
            const response = await axios.post(BackendURL + "/api/order/allOrders", {}, { headers: { token } });
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error getting in orders:", error);
            toast.error(error.message);
        }
    };

    const updateOrder = async (orderId, status) => {
        try {
            const response = await axios.post(BackendURL + "/api/order/updateOrder", { orderId, status }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchOrder();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error getting in order update:", error);
            toast.error(error.message);
        }
    };

    const onChangeHandler = (orderId, newStatus) => {
        updateOrder(orderId, newStatus);
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <div className='p-6 ml-auto min-h-screen w-[90%]'>
            <div className='max-w-6xl mx-auto w-full'>
                <h1 className='text-3xl font-extrabold mb-8 text-center text-gray-800'>All Orders List</h1>

                <div className='flex flex-col gap-6 '>
                    {orders.length > 0 ? (
                        orders.map((item, index) => (
                            <div key={index} className='bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-full flex flex-col gap-4'>
                                <div className='flex justify-between w-full items-start'>
                                    <span className='font-semibold text-gray-800 text-lg'>Order ID: {item._id}</span>

                                    <div className='flex flex-col items-end'>
                                        {/* Status Dropdown */}
                                        <select
                                            className='text-sm px-3 py-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white'
                                            value={item.status}
                                            onChange={(e) => onChangeHandler(item._id, e.target.value)}
                                        >
                                            {statusOptions.map((status) => (
                                                <option key={status} value={status.toLowerCase()}>{status}</option>
                                            ))}
                                        </select>

                                        
                                    </div>
                                </div>

                                {/* Product Items */}
                                <div className='flex gap-6 w-full'>
                                    {/* Left side: Products */}
                                    <div className='flex flex-col gap-4 flex-1'>
                                        {item.items.map((orderItem, itemIndex) => (
                                            <div key={itemIndex} className='flex justify-start items-start gap-4 p-4 border border-gray-200 rounded-lg w-full'>
                                                <img src={orderItem.image[0]} alt={orderItem.name} className='w-32 h-32 object-cover rounded-md flex-shrink-0' />
                                                <div className='flex flex-col gap-1'>
                                                    <span className='font-semibold text-gray-800 text-lg'>{orderItem.name} x{orderItem.quantity}</span>
                                                    <span className='text-gray-500 text-xs'>User ID: {item.userId}</span>
                                                    <span className='text-gray-800 font-bold text-lg'>{currency}{orderItem.price * orderItem.quantity}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                  
                                    <div className='mt-2 text-sm text-gray-600 items-center justify-center w-64 flex-shrink-0'>
                                        <p className='font-semibold'>{item.address?.firstName} {item.address?.lastName}</p>
                                        <p>{item.address?.street}</p>
                                        <p>{item.address?.locality}</p>
                                        <p>{item.address?.city}, {item.address?.state}, {item.address?.country}</p>
                                        <p>{item.address?.zipcode}</p>
                                        <p>{item.address?.phone}</p>
                                        <p>{item.address?.alternatephone}</p>
                                    </div>
                                </div>

                                {/* Total Amount at bottom-right */}
                                <div className='flex justify-end mt-2'>
                                    <span className='font-bold text-xl text-gray-800'>Total: {currency}{item.amount}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center mt-10'>
                            <b className='text-2xl font-semibold text-gray-600'>No Orders Available</b>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default Order;
