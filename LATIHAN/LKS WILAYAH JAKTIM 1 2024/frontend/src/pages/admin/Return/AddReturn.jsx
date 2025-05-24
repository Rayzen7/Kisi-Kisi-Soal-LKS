import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import API from '../../../libs/axios'
import Swal from 'sweetalert2'
import cookie from 'js-cookie'
import AuthAdmin from '../../../libs/authAdmin'
import { rupiahFormat } from '../../../libs/rupiahFormat'

const AddReturn = () => {
    AuthAdmin();
    const navigate = useNavigate();
    const token = cookie.get('token');
    const [user, setUser] = useState([]);
    const [penalties, setPenalties] = useState([]);
    const [tenant, setTenant] = useState('');
    const [no_car, setCar] = useState('');
    const [date_borrow, setDateBorrow] = useState('');
    const [date_return, setDateReturn] = useState('');
    const [id_penalties, setIdPenalties] = useState('');
    const [discount, setDiscount] = useState('0%');
    const [returnTotal, setReturnTotal] = useState(0);
    const [penalties_total, setPenaltiesTotal] = useState(0);
    const [rentTotal, setRentTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedRentId, setSelectedRentId] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await API.get(`/rent?token=${token}`);
                setUser(response.data.rent);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchPenalties = async() => {
            try {
                const response = await API.get(`/penalties?token=${token}`);
                setPenalties(response.data.penalties);
            } catch (error) {
                console.log(error);
            }
        }

        const totalPayment = async() => {
            const userDiscount = parseFloat(discount.replace("%", "")) || 0;
            const discountValue = userDiscount / 100;
            const returnTotalFloat = parseFloat(returnTotal);
            
            const totalDiscountReturn = (penalties_total + returnTotalFloat + rentTotal) * discountValue;
            setTotal((penalties_total + returnTotalFloat + rentTotal) - totalDiscountReturn);
        }

        totalPayment();
        fetchPenalties();
        fetchData();
    }, [token, discount, returnTotal, penalties_total, rentTotal]);

    const handleRegister = async() => {
        try {
            const response = await API.post(`/return?token=${token}`, {
                tenant,
                no_car,
                date_borrow,
                date_return,
                id_penalties,
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
                    <h1 className='font-poppins-semibold text-[26px] text-primary'>Add Return</h1>
                    <p className='font-poppins-medium text-[16px] pt-1'>Plese Input The Field Correctly</p>
                </div>
            </div>
            <div className="flex justify-center items-start mt-10 gap-24">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Tenant :</label>
                        <select 
                            className='border-3 cursor-pointer border-black focus-within:border-primary h-[50px] outline-none rounded-md px-3 font-poppins-medium text-[14px]' 
                            value={selectedRentId} 
                            onChange={(e) => {
                                const value = e.target.value;
                                setSelectedRentId(value);
                                
                                const rentData = user.find((rents) => rents.id === parseInt(value));
                                setTenant(rentData.tenant);
                                
                                setCar(rentData.no_car);
                                setDateBorrow(rentData.date_borrow);
                                setDateReturn(rentData.date_return);
                                setRentTotal(rentData.total);
                            }}
                        >
                            <option disabled value=''>Select Tenant</option>
                            {user.map((users, index) => (
                                <option key={index} value={users.id}>{index + 1}. {users.user.name} | Down Payment {rupiahFormat(users.down_payment)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>No Car :</label>
                        <input 
                            type="text"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your No Car'
                            disabled
                            value={no_car}
                            onChange={(e) => setCar(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Penalties :</label>
                        <select className='border-3 cursor-pointer border-black focus-within:border-primary h-[50px] outline-none rounded-md px-3 font-poppins-medium text-[14px]' 
                            value={id_penalties} 
                            onChange={(e) => {
                                const value = e.target.value;
                                setIdPenalties(value);

                                const penaltiesData = penalties.find((penaltie) => penaltie.id === parseInt(value));
                                setPenaltiesTotal(penaltiesData.penalties_total);
                            }}
                        >
                            <option disabled value=''>Select Penalties</option>
                            {penalties.map((penaltie, index) => (
                                <option key={index} value={penaltie.id}>{index + 1}. {penaltie.no_car} {penaltie.penalties_name}</option>
                            ))}
                        </select>
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
                        <label className='font-poppins-medium text-[16px]'>Return Total :</label>
                        <input 
                            type="nnumber"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Return Total'
                            value={returnTotal}
                            onChange={(e) => setReturnTotal(e.target.value)}
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
                    <button onClick={handleRegister} className='w-[300px] bg-primary h-[55px] mt-6 cursor-pointer border-3 border-primary hover:bg-transparent hover:text-primary duration-200 rounded-md text-white mx-auto font-poppins-medium text-[16px]'>Add Return</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddReturn