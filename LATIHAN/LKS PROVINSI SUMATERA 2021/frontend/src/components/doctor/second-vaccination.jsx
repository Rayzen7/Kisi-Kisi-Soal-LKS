"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function SecondVaccination() {
    const [vaccination, setVaccination] = useState([]);
    const navigate = useRouter();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const dataToken = token.data.token;

                const response = await axios.get(`http://localhost:8000/api/v1/doctor/second?token=${dataToken}`);
                setVaccination(response.data.second);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const handleUpdate = (id) => {
        navigate.push(`/doctor/detail/second-vaccination/${id}`);
    }
    return (
        <div className="font-poppins">
            <h1 className="font-[350] text-[48px]">Second Vaccination Society</h1>
            <table className="mt-16 border-collapse ">
                <thead>
                    <tr>
                        <td className="text-[20px] font-[500] text-center px-4 border-b-2 border-black pb-3">No</td>
                        <td className="text-[20px] font-[500] text-center px-4 border-b-2 border-black pb-3">Name</td>
                        <td className="text-[20px] font-[500] text-center px-4 border-b-2 border-black pb-3">Spot</td>
                        <td className="text-[20px] font-[500] text-center px-4 border-b-2 border-black pb-3">Date</td>
                        <td className="text-[20px] font-[500] text-center px-4 border-b-2 border-black pb-3">Respond</td>
                    </tr> 
                </thead> 
                <tbody className="translate-y-3">
                    {vaccination.map((vaccinations, index) => (
                        <tr key={index}>
                            <td className="text-[16px] font-[400] text-center px-4 py-5">{index + 1}</td>
                            <td className="text-[16px] font-[400] text-center px-4 py-5">{vaccinations.society.name}</td>
                            <td className="text-[16px] font-[400] text-center px-4 py-5">{vaccinations?.spot.name ?? '-'}</td>
                            <td className="text-[16px] font-[400] text-center px-4 py-5">{vaccinations?.date ?? '-'}</td>
                            <td className="text-[16px] font-[400] text-center px-4 py-5">
                                <button onClick={() => handleUpdate(vaccinations.id)} className="font-poppins hover:bg-blue-600 font-[500px] rounded-md bg-primary text-[14px] text-white px-4 py-2 cursor-pointer">Respond</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}