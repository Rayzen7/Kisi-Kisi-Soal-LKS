import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import API from '../../../libs/axios'
import Swal from 'sweetalert2'
import cookie from 'js-cookie'
import AuthAdmin from '../../../libs/authAdmin'

const AddPenalties = () => {
    AuthAdmin();
    const navigate = useNavigate();
    const token = cookie.get('token');
    const [user, setUser] = useState([]);
    const [penalties_name, setPenaltiesName] = useState('');
    const [no_car, setCar] = useState('');
    const [description, setDesc] = useState('');
    const [penalties_total, setPenaltiesTotal] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await API.get(`/rent?token=${token}`);
                setUser(response.data.rent);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [token]);

    const handleRegister = async() => {
        try {
            const response = await API.post(`/penalties?token=${token}`, {
                penalties_name,
                description,
                no_car,
                penalties_total
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
                    <h1 className='font-poppins-semibold text-[26px] text-primary'>Add Penalties</h1>
                    <p className='font-poppins-medium text-[16px] pt-1'>Plese Input The Field Correctly</p>
                </div>
            </div>
            <div className="flex justify-center items-start mt-10 gap-24">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Penalties Name :</label>
                        <input 
                            type="text"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Penalties Name'
                            value={penalties_name}
                            onChange={(e) => setPenaltiesName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>No Car :</label>
                        <select className='border-3 cursor-pointer border-black focus-within:border-primary h-[50px] outline-none rounded-md px-3 font-poppins-medium text-[14px]' value={no_car} onChange={(e) => setCar(e.target.value)}>
                            <option disabled value=''>Select No Car</option>
                            {user.map((users, index) => (
                                <option key={index} value={users.no_car}>{index + 1}. {users.user.name} | {users.no_car}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-[300px] mx-auto">
                        <label className='font-poppins-medium text-[16px]'>Penalties Total :</label>
                        <input 
                            type="number"
                            className='border-3 border-black focus-within:border-primary h-[50px] outline-0 rounded-md px-3 font-poppins-medium text-[14px]'
                            placeholder='Your Penalties Total'
                            value={penalties_total}
                            onChange={(e) => setPenaltiesTotal(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-6">
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
                    <button onClick={handleRegister} className='w-[300px] bg-primary h-[55px] mt-6 cursor-pointer border-3 border-primary hover:bg-transparent hover:text-primary duration-200 rounded-md text-white mx-auto font-poppins-medium text-[16px]'>Add Penalties</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddPenalties