// import { useState, useEffect } from 'react'
// import './App.css'
// import Login from './Components/Login'
// import { ToastContainer } from 'react-toastify'
// import UserLogin from './Components/UserLogin';
// import UserRegister from './Components/UserRegister';
// import { Routes, Route } from 'react-router-dom'
// import Navbar from './Components/Navbar';
// import Add from './Pages/Add'
// import List from './Pages/List'
// import Order from './Pages/Order'
// import SideBar from './Components/SideBar'



// export const BackendURL = import.meta.env.VITE_BACKEND_URL;
// export const currency = "₹"

// function App() {

//   const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

//   useEffect(() => {
//   if (token) {
//     localStorage.setItem('token', token);
//   } else {
//     localStorage.removeItem('token');
//   }
// }, [token]);
//   return (
//     <>
//       <div>

//         < ToastContainer />

//         {
//           token === "" ?
//             < Login setToken={setToken} />
//             :
//             <>
//               <div className='fixed w-full'>
//                 <Navbar setToken={setToken} />
//               </div>
//               <div className='flex w-full pt-[65px]'>
//                 <SideBar/>
//                 <div className='w-[70%] flex pt-5 ml-[18%]  justify-center  text-gary-500 text-base '>
//                   <Routes>
//                     <Route path='/add' element={<Add token={token} />} />
//                     <Route path='/List' element={<List token={token} />} />
//                     <Route path='/Orders' element={<Order token={token} />} />

//                     <Route path="/UserLogin" element={<UserLogin setToken={setToken} />} />
//                     <Route path="/UserRegister" element={<UserRegister setToken={setToken} />} />
//                   </Routes>
//                 </div>
//               </div>
//             </>
//         }


//       </div>
//     </>
//   )
// }

// export default App
import { useState, useEffect } from 'react'
import './App.css'
import Login from './Components/Login' // Removed .jsx extension
import { ToastContainer } from 'react-toastify'
import UserLogin from './Components/UserLogin'; // Removed .jsx extension
import UserRegister from './Components/UserRegister'; // Removed .jsx extension
import { Routes, Route, Navigate } from 'react-router-dom' // Added Navigate import
import Navbar from './Components/Navbar'; // Removed .jsx extension
import Add from './Pages/Add' // Removed .jsx extension
import List from './Pages/List' // Removed .jsx extension
import Order from './Pages/Order' // Removed .jsx extension
import SideBar from './Components/SideBar' // Removed .jsx extension


// The path uses the standard Vite method to read env vars
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
            // User is not logged in, show login screen
            < Login setToken={setToken} /> 
            :
            // User is logged in, show admin dashboard
            <>
              <div className='fixed w-full'>
                <Navbar setToken={setToken} />
              </div>
              <div className='flex w-full pt-[65px]'>
                <SideBar/>
                <div className='w-[70%] flex pt-5 ml-[18%]  justify-center  text-gary-500 text-base '>
                  <Routes>
                    {/* Default redirect for the base path. If a user enters example.com/ they go to /add */}
                    <Route path='/' element={<Navigate to="/add" />} /> 
                    
                    {/* Main Admin Routes - IMPORTANT: Using consistent lowercase paths */}
                    <Route path='/add' element={<Add token={token} />} />
                    <Route path='/list' element={<List token={token} />} /> 
                    <Route path='/orders' element={<Order token={token} />} /> 

                    {/* Authentication components are kept outside the main admin flow */}
                    <Route path="/UserLogin" element={<UserLogin setToken={setToken} />} />
                    <Route path="/UserRegister" element={<UserRegister setToken={setToken} />} />
                    
                    {/* Catch-all: If the browser URL is anything other than the above, redirect to /add */}
                    <Route path="*" element={<Navigate to="/add" />} /> 
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
