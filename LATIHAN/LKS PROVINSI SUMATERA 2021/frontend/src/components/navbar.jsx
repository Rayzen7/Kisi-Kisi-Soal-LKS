"use client"
import { useRouter } from "next/navigation"
import Auth from "./auth"
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
    Auth();
    const navigate = useRouter();
    const [user, setUser] = useState([]);
    
    const handleLogout = async() => {
        const response = await axios.post('/api/del-cookies');
        setTimeout(() => {
            navigate.push('/');
        }, 3000);
        
        toast.success(response.data.message, {
            autoClose: 2000,
            theme: 'colored'
        });
    }

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const tokenData = token.data.token;
                
                const response = await axios.get(`http://localhost:8000/api/v1/auth/user?token=${tokenData}`);
                setUser(response.data.user);

                const user = response.data.user;
                if (user.name) {
                   return;
                } else if (user.username) {
                    return;
                } else {
                    navigate.push('/');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchUser();
    }, []);

    return (
        <div className="">
            <div className="bg-primary w-full z-30 h-[9vh] fixed flex justify-between items-center font-poppins font-[500] text-white px-32">
                <Link href='/dashboard'><h1 className="text-[20px]">Vaccination Platform</h1></Link>
                <div className="flex justify-center items-center gap-12">
                    <p className="text-[14px] text-[rgba(255,255,255,.5)] font-[400]">{user.name || user.username}</p>
                    <p className="text-[14px] text-[rgba(255,255,255,.5)] hover:text-white font-[400] cursor-pointer" onClick={handleLogout}>Logout</p>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}