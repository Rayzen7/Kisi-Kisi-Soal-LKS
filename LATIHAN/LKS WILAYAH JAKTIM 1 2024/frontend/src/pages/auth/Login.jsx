import React from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import cookie from 'js-cookie'
import API from '../../libs/axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleClick = async() => {
        try {
            const response = await API.post('/login', {
                username,
                password
            });

            const token = response.data.token;
            cookie.set('token', token);
            const userRole = response.data.user.role_id;

            if (userRole == 1) {
                setTimeout(() => {
                    navigate('/admin/home');
                }, 3000);
            } else if (userRole == 2) {
                setTimeout(() => {
                    navigate('/user/home');
                }, 3000);
            } else {
                navigate('/');
            }

            toast.success(response.data.message, {
                theme: 'colored',
                autoClose: 2000,
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                theme: 'colored',
                autoClose: 2000,
            });
        }
    }
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className="bg-white w-[500px] h-[550px] rounded-md shadow-md p-12 flex flex-col">
            <div className="text-center">
                <h1 className='font-poppins-semibold text-primary text-[30px]'>Login</h1>
                <p className='text-[16px] pt-1 font-poppins-medium'>Please Input Your Username and Password</p>
            </div>
            <div className="flex flex-col gap-6 mt-10">
                <div className="flex flex-col gap-2 w-[360px] mx-auto">
                    <label className='font-poppins-medium text-[16px]'>Username :</label>
                    <input 
                        type="text"
                        className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                        placeholder='Your Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 w-[360px] mx-auto">
                    <label className='font-poppins-medium text-[16px]'>Password :</label>
                    <input 
                        type="password"
                        className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                        placeholder='Your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="mt-12 mx-auto text-center">
                <button onClick={handleClick} className='w-[360px] bg-primary h-[55px] cursor-pointer border-3 border-primary hover:bg-transparent hover:text-primary duration-200 rounded-md text-white mx-auto font-poppins-medium text-[18px]'>Login</button>
                <p className='text-[15px] font-poppins-medium pt-2'>Don't Have an Account? 
                    <Link to='/register'>
                        <span className='text-primary cursor-pointer'> Register Here</span>
                    </Link>
                </p>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Login