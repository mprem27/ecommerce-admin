import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { BackendURL, currency } from '../App';
import { Trash2 } from "lucide-react";

const statusOptions = ["Pending", "Processing", "In Transit", "Delivered", "Cancelled"];

const Order = ({ token }) => {

    const [orders, setOrders] = useState([])
    const featchOrder = async () => {
        try {
            const response = await axios.post(BackendURL + "/api/order/allOrders", {}, { headers: { token } });
            if (response.data.success) {
                setOrders(response.data.orders);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error getting in orders:", error)
            toast.error(error.message);
        }
    }

    const updateOrder = async (orderId, status) => {
        try {
            const response = await axios.post(BackendURL + "/api/order/updateOrder", { orderId, status }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                featchOrder();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error getting in orderupdate:", error)
            toast.error(error.message);
        }
    };
    const onChangeHandler = (orderId, newStatus) => {
        updateOrder(orderId, newStatus);
    };
    useEffect(() => {
        featchOrder();
    }, [])
    return (
        <div className='p-6 bg-white shadow-lg rounded-xl max-w-[90%] ml-auto mt-2 '>
            <p className='text-xl font-bold mb-6 text-gray-800 border-b text-center pb-2 '>All Orders List</p>
            <div className='flex flex-col gap-2'>
                <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-2 px-2 border text-center rounded border-gray-300 bg-blue-100 text-sm'>
                    <b>Order ID</b>
                    <b>User ID</b>
                    <b>Date</b>
                    <b>Status</b>
                    <b>Amount</b>

                </div>

                {
                    orders.length > 0 ?
                        orders.map((item, index) => (
                            <div key={index} className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr] justify-center items-center py-2 px-2 border text-center rounded border-gray-300 bg-blue-100 text-sm'>
                                <div className='col-span-1 flex flex-col items-start'>
                                    <span className='text-gray-700 font-semibold'>
                                        {item._id.slice(0, 15) + "..."}
                                    </span>
                                    <span className='text-xs text-gray-500 mt-0.5'>
                                        Status: {(item.status || 'Pending')}
                                    </span>
                                </div>
                                <b className='col-span-1 text-gray-700'>{item.userId.slice(0, 20) + "..."}</b>
                                <b className='col-span-1 text-gray-600'>{item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</b>

                                <select className='text-sm p-1 border rounded-md shadow-sm  focus:border-blue-500' value={item.status} onChange={(e) => onChangeHandler(item._id, e.target.value)}>
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status.toLowerCase()}>{status}</option>
                                    ))}
                                </select>
                                <b className='col-span-1 font-bold text-gray-800'>{currency}{item.amount}</b>
                                {/* <div className='flex items-center justify-center'>
                                        <button 
                                            onClick={() => removeProduct(item._id)} 
                                            className='text-gray-500 hover:text-red-600 transition-colors duration-200'
                                            title="Delete Order"
                                        >
                                            <Trash2 size={20} strokeWidth={2} />
                                        </button>
                                    </div> */}
                            </div>
                        )) :
                        <b className=' text-2xl font-semibold text-center mt-3'>No Products Available</b>
                }
            </div>

        </div>
    )
}
export default Order
