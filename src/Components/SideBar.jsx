import React from 'react'
import { NavLink } from 'react-router-dom'
import { images } from '../assets/Assets'

const SideBar = () => {
  return (
    <div className='w-[20%] min-h-screen border-r-2 mt-3 border-gray-300 fixed'>
       <div className='flex flex-col gap-4 pt-6 pl-[10%] pr-[10%]  text-[15px]'>
        <NavLink to={'/add'} className='flex items-center border-blue-200 gap-3 border-2 border-r-2 px-3 py-2 rounded-l'>
        <img src={images.Add} alt="add icon from sidebar" className='w-7 h-7' />
        <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink to={'/List'} className='flex items-center border-blue-200 gap-3 border-2 border-r-2 px-3 py-2 rounded-l'>
        <img src={images.List} alt="add icon from sidebar" className='w-7 h-7' />
        <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink to={'/Orders'} className='flex items-center border-blue-200 gap-3 border-2 border-r-2 px-3 py-2 rounded-l'>
        <img src={images.Orders} alt="add icon from sidebar" className='w-7 h-7' />
        <p className='hidden md:block'>View Orders</p>
        </NavLink>

       </div>
    </div>
  )
}

export default SideBar