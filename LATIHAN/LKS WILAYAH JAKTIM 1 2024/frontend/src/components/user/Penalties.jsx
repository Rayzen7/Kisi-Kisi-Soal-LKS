import React from 'react'
import API from '../../libs/axios'
import { useState, useEffect } from 'react'
import cookie from 'js-cookie'
import { rupiahFormat } from '../../libs/rupiahFormat'

const Penalties = () => {
    const [data, setData] = useState([]);
    const token = cookie.get('token');

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await API.get(`/me?token=${token}`);
                setData(response.data.user[0].penalties);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [token]);

  return (
    <div className='flex justify-center items-center pb-12'>
        <div className="bg-white w-[90%] min-h-[50vh] p-12 rounded-md">
            <div className=" font-poppins-semibold justify-between flex items-center mx-10">
                <h1 className='text-[36px]'><span className='text-primary'>All</span> Penalties List</h1>
            </div>
            {data.length > 0 ? (
                <table className='mt-16 border-collapse mx-auto'>
                    <thead>
                        <tr className='font-poppins-medium text-[18px] text-center'>
                            <td className='px-16 border-b-3 pb-3 border-black'>No</td>
                            <td className='px-16 border-b-3 pb-3 border-black'>Penalties Name</td>
                            <td className='px-16 border-b-3 pb-3 border-black'>No Car</td>
                            <td className='px-16 border-b-3 pb-3 border-black'>Description</td>
                            <td className='px-16 border-b-3 pb-3 border-black'>Penalties Total</td>
                        </tr>
                    </thead>
                    {data.map((datas, index) => (
                        <tbody key={index}>
                            <tr className='font-poppins-medium text-[16px] text-center'>
                                <td className='px-16 py-6'>{index + 1}</td>
                                <td className='px-16 py-6'>{datas.penalties_name}</td>
                                <td className='px-16 py-6'>{datas.no_car}</td>
                                <td className='px-16 py-6'>{datas.description}</td>
                                <td className='px-16 py-6'>{rupiahFormat(datas.penalties_total)}</td>
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