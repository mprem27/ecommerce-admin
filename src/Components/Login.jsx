import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { BackendURL } from '../App';
import { images } from '../assets/Assets';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(BackendURL + '/api/user/admin', { email, password });
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
        <div className='flex flex-col items-center justify-center w-full min-h-screen bg-[#e0f2fe] '>
            <span className='items-center justify-center mb-10 text-[#121238]'><img src={images.logoheader} alt="logoheader" className='h-15 w-auto translate-y-2 object-contain mb-1 scale-150' /></span>

            <div className='bg-[#bae6fd] shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4 text-[#1e1c2ae5] text-center'>Admin Login</h1>
                <form onSubmit={(e) => onSubmitHandler(e)}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-[#1e1c2ae5] mb-2'> Email</p>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-[#1e1c2ae5] outline-none' placeholder='your@email.com' required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-[#1e1c2ae5] mb-2'> Password</p>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-[#1e1c2ae5] outline-none' placeholder='Enter your Password' required />
                    </div>
                    <button type="submit" className='cursor-pointer mt-2 w-full px-4 py-2 rounded-4xl text-white bg-[#292639] hover:bg-[#373544]'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login