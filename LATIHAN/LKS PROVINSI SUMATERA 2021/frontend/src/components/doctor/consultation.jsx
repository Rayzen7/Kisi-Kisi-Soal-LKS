"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Consultation() {
    const [consultation, setConsultation] = useState([]);
    const navigate = useRouter();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const dataToken = token.data.token;

                const response = await axios.get(`http://localhost:8000/api/v1/doctor/consultations?token=${dataToken}`);
                setConsultation(response.data.consultation);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const handleUpdate = (id) => {
        navigate.push(`/doctor/detail/consultation/${id}`);
    }
    return (
        <div className="font-poppins">
            <h1 className="font-[350] text-[48px]">Consultation Society</h1>
            <table className="mt-16 border-collapse ">
                <thead>
                    <tr>
                        <td className="text-[20px] font-[500] text-center px-4 border-b-2 border-black pb-3">No</td>
                        <td className="text-[20px] font-[500] text-center px-4 border-b-2 border-black pb-3">Name</td>
                        <td className="text-[20px] font-[500] text-center px-4 border-b-2 border-black pb-3">Status</td>
                        <td className="text-[20px] font-[500] text-center px-4 border-b-2 border-black pb-3">Disease History</td>
                        <td className="text-[20px] font-[500] text-center px-4 border-b-2 border-black pb-3">Current Symptoms</td>
                        <td className="text-[20px] font-[500] text-center px-4 border-b-2 border-black pb-3">Respond</td>
                    </tr> 
                </thead> 
                <tbody className="translate-y-3">
                    {consultation.map((consultations, index) => (
                        <tr key={index}>
                            <td className="text-[16px] font-[400] text-center px-4 py-5">{index + 1}</td>
                            <td className="text-[16px] font-[400] text-center px-4 py-5">{consultations.society.name}</td>
                            <td className="text-[16px] font-[400] text-center px-4 py-5">{consultations.status}</td>
                            <td className="text-[16px] font-[400] text-center px-4 py-5">{consultations?.disease_history ?? '-'}</td>
                            <td className="text-[16px] font-[400] text-center px-4 py-5">{consultations?.current_symptoms ?? '-'}</td>
                            <td className="text-[16px] font-[400] text-center px-4 py-5">
                                <button onClick={() => handleUpdate(consultations.id)} className="font-poppins hover:bg-blue-600 font-[500px] rounded-md bg-primary text-[14px] text-white px-4 py-2 cursor-pointer">Respond</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}