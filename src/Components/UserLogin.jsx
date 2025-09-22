import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { BackendURL } from '../App';
import { Link } from 'react-router-dom'


const UserLogin = ({ setToken }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(BackendURL + '/api/user/login', { email, password });
            if (response.data.success) {
                setToken(response.data.token)
                toast.success("Login successful!");
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-full bg-[#bae6fd]  '>
      <p className='text-3xl grid items-center justify-center text-[#121238]'>GoBok<span className='text-6xl mb-6 text-[#60a5fa] leading-0 inline-flex transform scale-x-200 px-5'>⤻</span></p>
            <div className='bg-[#e0f2fe] shadow-md rounded-xl px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4 text-[#1e1c2ae5] text-center'>Sign In</h1>
                <form onSubmit={(e) => onSubmitHandler(e)}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-[#1e1c2ae5] mb-2'> Email</p>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-lg w-full px-3 py-2 border border-[#1e1c2ae5] outline-none' placeholder='your@email.com' required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-[#1e1c2ae5] mb-2'> Password</p>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-lg w-full px-3 py-2 border border-[#1e1c2ae5] outline-none' placeholder='Enter your Password' required />
                    </div>
                    <button type="submit" className='cursor-pointer mt-2 w-full px-4 py-2 rounded-md text-white bg-[#292639] hover:bg-[#373544]'>Login</button>
                </form>
                <div className='flex flex-col mt-5 '>
                    <hr className=" border-gray-400" />
                    <p className='mt-2 font-bold'> Don’t have an account?</p>
                    <Link to={'./UserRegister'} className='text-blue-400 hover:underline '>Sign Up</Link>
                </div>
            </div>
            <div className="w-[99%]  mt-10">
                <hr className="border-gray-600" />
                <p className="py-5 text-sm text-[#1e1c2a] text-center">Copyright @2025 GoBok.com - All rights reserved</p>
            </div>
        </div>
    )
}

export default UserLogin