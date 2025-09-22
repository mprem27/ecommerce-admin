import { useState, useEffect } from 'react'
import './App.css'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify'
import UserLogin from './Components/UserLogin';
import UserRegister from './Components/UserRegister';
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Add from './Pages/Add'
import List from './Pages/List'
import Order from './Pages/Order'
import SideBar from './Components/SideBar'



export const BackendURL = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹"

function App() {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}, [token]);
  return (
    <>
      <div>

        < ToastContainer />

        {
          token === "" ?
            < Login setToken={setToken} />
            :
            <>
              <div className='fixed w-full'>
                <Navbar setToken={setToken} />
              </div>
              <div className='flex w-full pt-[65px]'>
                <SideBar/>
                <div className='w-[70%] flex pt-5 ml-[18%]  justify-center  text-gary-500 text-base '>
                  <Routes>
                    <Route path='/add' element={<Add token={token} />} />
                    <Route path='/List' element={<List token={token} />} />
                    <Route path='/Orders' element={<Order token={token} />} />

                    <Route path="/UserLogin" element={<UserLogin setToken={setToken} />} />
                    <Route path="/UserRegister" element={<UserRegister setToken={setToken} />} />
                  </Routes>
                </div>
              </div>
            </>
        }


      </div>
    </>
  )
}

export default App
