import React from 'react'
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import API from '../../libs/axios'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import AuthUser from '../../libs/authUser'

const Navbar = () => {
    AuthUser();
    const navigate = useNavigate();
    const token = cookie.get('token');
    const handleLogout = async() => {
        try {
            const response = await API.get('/logout', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            cookie.remove('token');

            setTimeout(() => {
                navigate('/');
            }, 3000);

            toast.success(response.data.message, {
                theme: 'colored',
                autoClose: 2000,
            })
        } catch (error) {
            toast.error(error.response.data.message, {
                theme: 'colored',
                autoClose: 2000,
            })
        }
    }

  return (
    <div className="">
        <div className='bg-primary text-white flex justify-between px-[60px] items-center w-full h-[11vh]'>
            <h1 className='text-[24px] font-poppins-semibold'>Venichel Rental</h1>
            <div className="flex justify-center items-center gap-12 font-poppins-medium text-[18px]">
                <Link to='/user/home'>
                    <p className='cursor-pointer'>Home</p>
                </Link>
                <Link to='/user/rent'>
                    <p className='cursor-pointer'>Rent</p>
                </Link>
                <Link to='/user/return'>
                    <p className='cursor-pointer'>Return</p>
                </Link>
                <Link to='/user/penalties'>
                    <p className='cursor-pointer'>Penalties</p>
                </Link>
                <p className='cursor-pointer' onClick={handleLogout}>Logout</p>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Navbar