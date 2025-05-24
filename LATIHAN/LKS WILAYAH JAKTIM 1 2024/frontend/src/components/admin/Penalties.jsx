import React from 'react'
import API from '../../libs/axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import Button from '../../ui/button'
import Swal from 'sweetalert2'
import { rupiahFormat } from '../../libs/rupiahFormat'

const Penalties = () => {
    const [data, setData] = useState([]);
    const token = cookie.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await API.get(`/penalties?token=${token}`);
                setData(response.data.penalties);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [token]);

    const handleEdit = async(id) => {
        navigate(`/admin/penalties/edit/${id}`);
    }

    const handleDelete = async(id) => {
        try {
            const response = await API.delete(`/penalties/${id}?token=${token}`);
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
                <h1 className='text-[36px]'><span className='text-primary'>All</span> Penalties List</h1>
                <Button
                    icon='add'
                    color='green'
                    paddingValue={10}
                    width={26}
                    height={26}
                    onClick={() => navigate('/admin/penalties/add')}
                />
            </div>
            {data.length > 0 ? (
                <table className='mt-16 border-collapse mx-auto'>
                    <thead>
                        <tr className='font-poppins-medium text-[18px] text-center'>
                            <td className='px-10 border-b-3 pb-3 border-black'>No</td>
                            <td className='px-10 border-b-3 pb-3 border-black'>Penalties Name</td>
                            <td className='px-10 border-b-3 pb-3 border-black'>No Car</td>
                            <td className='px-10 border-b-3 pb-3 border-black'>Description</td>
                            <td className='px-10 border-b-3 pb-3 border-black'>Penalties Total</td>
                            <td className='px-10 border-b-3 pb-3 border-black'>Action</td>
                        </tr>
                    </thead>
                    {data.map((datas, index) => (
                        <tbody key={index}>
                            <tr className='font-poppins-medium text-[16px] text-center'>
                                <td className='px-10 py-6'>{index + 1}</td>
                                <td className='px-10 py-6'>{datas.penalties_name}</td>
                                <td className='px-10 py-6'>{datas.no_car}</td>
                                <td className='px-10 py-6'>{datas.description}</td>
                                <td className='px-10 py-6'>{rupiahFormat(datas.penalties_total)}</td>
                                <td className='px-10 py-6'>
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

export default Penalties