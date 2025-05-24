import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import API from '../../libs/axios'
import { toast, ToastContainer } from 'react-toastify'

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('+62');
    const [no_ktp, setKtp] = useState('');
    const [date_of_birth, setDate] = useState('');
    const [description, setDesc] = useState('');

    const handleRegister = async() => {
        try {
            const response = await API.post('/register', {
                username,
                name,
                password,
                email,
                phone,
                no_ktp,
                description,
                date_of_birth
            }); 
            
            setTimeout(() => {
                navigate('/');
            }, 3000);

            toast.success(response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });
        }
    }
    
  return (
    <div className='w-full min-h-screen py-16 flex justify-center items-center'>
        <div className="w-[850px] min-h-[600px] bg-white p-12 rounded-md">
            <div className="flex items-center gap-4">
                <Link to='/'>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className='w-10 h-10 rounded-full p-1 rotate-90 bg-primary duration-200 border-3 border-primary hover:rotate-[135deg] hover:bg-transparent hover:fill-primary cursor-pointer fill-white' 
                        viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"/>
                    </svg>
                </Link>
                <div className="">
                    <h1 className='font-poppins-semibold text-[26px] text-primary'>Register</h1>
                    <p className='font-poppins-medium text-[16px] pt-1'>Plese Input The Field Correctly</p>
                </div>
            </div>
            <div className="flex justify-center items-start mt-10 gap-24">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Name :</label>
                        <input 
                            type="text"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Username :</label>
                        <input 
                            type="text"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Password :</label>
                        <input 
                            type="password"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>No KTP :</label>
                        <input 
                            type="text"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your No KTP'
                            value={no_ktp}
                            onChange={(e) => setKtp(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Email :</label>
                        <input 
                            type="email"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>No Phone :</label>
                        <input 
                            type="tel"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your No Phone'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Date of Birth :</label>
                        <input 
                            type="date"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Date of Birth'
                            value={date_of_birth}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Description :</label>
                        <textarea 
                            type="text"
                            className='border-3 border-black focus-within:border-primary h-[120px] outline-0 rounded-md p-3 font-poppins-medium text-[14px]'
                            placeholder='Your Description'
                            value={description}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <button onClick={handleRegister} className='w-[300px] bg-primary h-[55px] mt-6 cursor-pointer border-3 border-primary hover:bg-transparent hover:text-primary duration-200 rounded-md text-white mx-auto font-poppins-medium text-[16px]'>Register</button>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Register