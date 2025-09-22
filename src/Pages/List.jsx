import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { BackendURL,currency } from '../App';
import { Trash2 } from "lucide-react";

const List = ({token}) => {
 
  const [products, setProducts] = useState([]);

  const featchList = async () => {
    try {
      const response = await axios.get(BackendURL + "/api/Product/list",{ headers: { token }}) ;
      if (response.data.success) {
        setProducts(response.data.list);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error getting in List:", error)
      toast.error(error.message);
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(BackendURL + "/api/Product/remove", { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        featchList();
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error Removing the product : ", error);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    featchList();
  }, [])
  return (
    <div className='p-6 bg-white shadow-lg rounded-xl max-w-[90%] ml-auto mt-2 '>
            <p className='text-xl font-bold mb-6 text-gray-800 border-b text-center pb-2 '>All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-2 px-2 border text-center rounded border-gray-300 bg-blue-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Sub Category</b>
          <b>Price</b>
          <b>Actions</b>

        </div>

        {
          products.length > 0 ?
            products.map((item, index) => (
              <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] justify-center items-center py-2 px-2 border text-center rounded border-gray-300 bg-blue-100 text-sm'>
                <div className='flex items-center justify-center'>
                  <img src={item.image[0]} className='w-12' alt={item.name} />
                </div>
                <b>{item.name}</b>
                <b>{item.category}</b>
                <b>{item.subcategory}</b>
                <b>{currency}{item.price}</b>
                <div className='flex items-center justify-center'>
                  <b onClick={() => removeProduct(item._id)} className='flex items-center justify-center text-white w-12  text-center cursor-pointer text-lg '>< Trash2 size={20} strokeWidth={2.5} className='text-[#1e1c2ae5]   hover:text-red-600 transition-colors duration-200'/></b>
                </div>

              </div>
            )) :
            <b className=' text-2xl font-semibold text-center mt-3'>No Products Available</b>
        }
      </div>

    </div>
  )
   }

export default List