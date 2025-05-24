import React from 'react'
import API from '../../libs/axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import Button from '../../ui/button'
import Swal from 'sweetalert2'
import { rupiahFormat } from '../../libs/rupiahFormat'

const Return = () => {
    const [data, setData] = useState([]);
    const token = cookie.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await API.get(`/return?token=${token}`);
                setData(response.data.return);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [token]);

    const handleEdit = async(id) => {
        navigate(`/admin/return/edit/${id}`);
    }

    const handleDelete = async(id) => {
        try {
            const response = await API.delete(`/return/${id}?token=${token}`);
            Swal.fire({
                title: response.data.message,
                text: 'The Page can be Reload',
                icon: 'success',
                confirmButtonColor: 'oklch(62.7% 0.194 149.214)',
                confirmButtonText: 'Success'
            }).then((success) => {
                if (success) {
                    window.location.reload();
                }
            });

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            Swal.fire({
                title: error.response.data.message,
                text: 'The Page can be Reload',
                icon: 'error',
                confirmButtonColor: 'oklch(57.7% 0.245 27.325)',
                confirmButtonText: 'Error'
            });
        }
    }

  return (
    <div className='flex justify-center items-center pb-12'>
        <div className="bg-white w-[90%] min-h-[50vh] p-12 rounded-md">
            <div className=" font-poppins-semibold justify-between flex items-center mx-10">
                <h1 className='text-[36px]'><span className='text-primary'>All</span> Return List</h1>
                <Button
                    icon='add'
                    color='green'
                    paddingValue={10}
                    width={26}
                    height={26}
                    onClick={() => navigate('/admin/return/add')}
                />
            </div>
            {data.length > 0 ? (
                <table className='mt-16 border-collapse mx-auto'>
                    <thead>
                        <tr className='font-poppins-medium text-[16px] text-center'>
                            <td className='px-6 border-b-3 pb-3 border-black'>No</td>
                            <td className='px-6 border-b-3 pb-3 border-black'>Tenant</td>
                            <td className='px-6 border-b-3 pb-3 border-black'>No Car</td>
                            <td className='px-6 border-b-3 pb-3 border-black'>Penalties Name</td>
                            <td className='px-6 border-b-3 pb-3 border-black'>Date Borrow</td>
                            <td className='px-6 border-b-3 pb-3 border-black'>Date Return</td>
                            <td className='px-6 border-b-3 pb-3 border-black'>Discount</td>
                            <td className='px-6 border-b-3 pb-3 border-black'>Total</td>
                            <td className='px-6 border-b-3 pb-3 border-black'>Action</td>
                        </tr>
                    </thead>
                    {data.map((datas, index) => (
                        <tbody key={index}>
                            <tr className='font-poppins-medium text-[14px] text-center'>
                                <td className='px-6 py-6'>{index + 1}</td>
                                <td className='px-6 py-6'>{datas.user.name}</td>
                                <td className='px-6 py-6'>{datas.no_car}</td>
                                <td className='px-6 py-6'>{datas.penalties.penalties_name}</td>
                                <td className='px-6 py-6'>{datas.date_borrow}</td>
                                <td className='px-6 py-6'>{datas.date_return}</td>
                                <td className='px-6 py-6'>{datas.discount}</td>
                                <td className='px-6 py-6'>{rupiahFormat(datas.total)}</td>
                                <td className='px-6 py-6'>
                                    <div className="flex justify-center items-center gap-4">
                                        <Button
                                            icon='edit'
                                            color='blue'
                                            paddingValue={7}
                                            width={20}
                                            height={20}
                                            onClick={() => handleEdit(datas.id)}
                                        />
                                        <Button
                                            paddingValue={7}
                                            width={20}
                                            height={20}
                                            onClick={() => handleDelete(datas.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            ) : (
                <p className='mt-20 text-center text-gray-600 text-[22px] font-poppins-medium'>Data Not Found</p>
            )}
        </div>
    </div>
  )
}

export default Return