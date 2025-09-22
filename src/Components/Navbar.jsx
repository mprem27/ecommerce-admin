import React from 'react'
import { Link } from 'react-router-dom'
import { images } from '../assets/Assets';


const Navbar = ({ setToken }) => {
  return (
    <div className='px-[4%] fixed w-full flex items-center justify-between py-2  border-b-2 rounded-md font-medium bg-[#bae6fd]'>
      <Link to={'/add'} className='flex items-center justify-center text-[#121238] -ml-8'><img src={images.logoheader} alt="logoheader" className='h-15 w-auto translate-y-2 object-contain mb-1 scale-150' /><p className='text-2xl text-[#FF4B33] mb-1 '>Admin</p></Link>
      <button onClick={() => setToken('')} className='cursor-pointer bg-[#1e1c2ae5] text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm'>LogOut</button>
    </div>
  )
}

export default Navbar