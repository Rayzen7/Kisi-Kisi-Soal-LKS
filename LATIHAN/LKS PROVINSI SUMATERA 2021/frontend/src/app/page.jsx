"use client"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import Link from "next/link"

export default function SignIn () {
  const [card, setCard] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useRouter();

  const formData = new FormData();
  formData.append('id_card_number', card);
  formData.append('password', password);

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', formData);
      const token = response.data.body.token;
      await axios.post('/api/set-cookies', { token });

      toast.success('Login Success', {
        theme: 'colored',
        autoClose: 2000
      });

      setTimeout(() => {
        navigate.push('/dashboard');
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
        autoClose: 2000
      });
    }
  }

  return (
    <div>
      <div className="bg-primary w-full h-[9vh] flex justify-between items-center font-poppins font-[400] text-white px-28">
        <h1 className="text-[20px]">Vaccination Platform</h1>
        <p className="text-[16px] font-[300] cursor-pointer">Login</p>
      </div>
      <div className="w-full h-auto mt-16 flex flex-col justify-center items-center gap-24">
        <h1 className="font-poppins font-[300] text-[48px]">Vaccination Platform</h1>
        <div className="bg-white w-[550px] min-h-[250px] pb-10 border-[rgba(0,0,0,0.11)] border-[1px] rounded-md">
          <p className="bg-[rgba(0,0,0,.03)] px-5 py-3 font-poppins font-[450] text-[22px] border-[rgba(0,0,0,0.11)] border-b-[1px]">Login</p>
          <div className="font-poppins flex justify-center flex-col items-end mx-[40px] gap-4 mt-6">
            <div className="flex items-center gap-4">
              <label className="font-[400] text-[14px]">ID Card Number</label>
              <input 
                type="text" 
                value={card}
                onChange={(e) => setCard(e.target.value)}
                className="border-[rgba(0,0,0,0.11)] border-[2px] focus-within:border-primary w-[330px] h-[40px] outline-none rounded-[4px] text-[14px] px-2"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="font-[400] text-[14px]">Password</label>
              <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                className="border-[rgba(0,0,0,0.11)] border-[2px] focus-within:border-primary w-[330px] h-[40px] outline-none rounded-[4px] text-[14px] px-2"
              />
            </div>
          </div>
          <div className="flex justify-center w-full mt-6 pr-28">
            <button onClick={handleLogin} className="font-poppins hover:bg-blue-600 font-[400px] bg-primary text-[14px] text-white px-4 py-2 cursor-pointer">Login</button>
          </div>
          <p className="font-poppins font-[400] text-center text-[16px] mt-4">Are you a doctor? <Link href='/doctor/auth' className="hover:underline text-primary">Login here</Link></p>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}