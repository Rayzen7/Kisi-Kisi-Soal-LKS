import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import API from '../../../libs/axios'
import Swal from 'sweetalert2'
import cookie from 'js-cookie'
import AuthAdmin from '../../../libs/authAdmin'

const AddRent = () => {
    AuthAdmin();
    const navigate = useNavigate();
    const token = cookie.get('token');
    const [user, setUser] = useState([]);
    const [tenant, setTenant] = useState('');
    const [no_car, setCar] = useState('');
    const [date_borrow, setDateBorrow] = useState('');
    const [date_return, setDateReturn] = useState('');
    const [down_payment, setDownPayment] = useState('');
    const [discount, setDiscount] = useState('');
    const [total, setTotal] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await API.get(`/register?token=${token}`);
                setUser(response.data.user);
            } catch (error) {
                console.error(error);
            }
        }

        const totalPayment = async() => {
            const userDiscount = parseInt(discount.replace("%", ""));
            const discountValue = (userDiscount / 100);
            const totalRent = down_payment * discountValue;
            setTotal(down_payment - totalRent);
        }

        fetchData();
        totalPayment();
    }, [token, down_payment, discount]);

    const handleRegister = async() => {
        try {
            const response = await API.post(`/rent?token=${token}`, {
                tenant,
                no_car,
                date_borrow,
                date_return,
                down_payment,
                discount,
                total
            }); 
            
            setTimeout(() => {
                navigate('/admin/home');
            }, 3000);

            Swal.fire({
                title: response.data.message,
                text: 'You can Redirect to Home',
                icon: 'success',
                confirmButtonColor: 'oklch(62.7% 0.194 149.214)',
                confirmButtonText: 'Success'
            }).then((success) => {
                if (success) {
                    navigate('/admin/home');
                }
            });
        } catch (error) {
            Swal.fire({
                title: error.response.data.message,
                text: 'Plese Input The Field Correctly',
                icon: 'error',
                confirmButtonColor: 'oklch(57.7% 0.245 27.325)',
                confirmButtonText: 'Error'
            });
        }
    }
    
  return (
    <div className='w-full min-h-screen py-16 flex justify-center items-center'>
        <div className="w-[850px] min-h-[600px] bg-white p-12 rounded-md">
            <div className="flex items-center gap-4">
                <Link to='/admin/home'>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className='w-10 h-10 rounded-full p-1 rotate-90 bg-primary duration-200 border-3 border-primary hover:rotate-[135deg] hover:bg-transparent hover:fill-primary cursor-pointer fill-white' 
                        viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"/>
                    </svg>
                </Link>
                <div className="">
                    <h1 className='font-poppins-semibold text-[26px] text-primary'>Add Rent</h1>
                    <p className='font-poppins-medium text-[16px] pt-1'>Plese Input The Field Correctly</p>
                </div>
            </div>
            <div className="flex justify-center items-start mt-10 gap-24">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Tenant :</label>
                        <select className='border-3 cursor-pointer border-black focus-within:border-primary h-[50px] outline-none rounded-md px-3 font-poppins-medium text-[14px]' value={tenant} onChange={(e) => setTenant(e.target.value)}>
                            <option disabled value=''>Select Tenant</option>
                            {user.map((users, index) => (
                                <option key={index} value={users.id}>{index + 1}. {users.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>No Car :</label>
                        <input 
                            type="text"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your No Car'
                            value={no_car}
                            onChange={(e) => setCar(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Date Borrow :</label>
                        <input 
                            type="date"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Date Borrow'
                            value={date_borrow}
                            onChange={(e) => setDateBorrow(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Date Return :</label>
                        <input 
                            type="date"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Date Return'
                            value={date_return}
                            onChange={(e) => setDateReturn(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Down Payment :</label>
                        <input 
                            type="number"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Down Payment'
                            value={down_payment}
                            onChange={(e) => setDownPayment(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Discount :</label>
                        <input 
                            type="tel"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Discount'
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Total :</label>
                        <input 
                            type="number"
                            disabled
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Total'
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                    </div>
                    <button onClick={handleRegister} className='w-[300px] bg-primary h-[55px] mt-6 cursor-pointer border-3 border-primary hover:bg-transparent hover:text-primary duration-200 rounded-md text-white mx-auto font-poppins-medium text-[16px]'>Add Rent</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddRent