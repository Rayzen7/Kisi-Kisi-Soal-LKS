"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Swal from "sweetalert2"

export default function consultation() {
    const [disease, setDisease] = useState();
    const [sysmptoms, setSysmptoms] = useState();
    const [showDisease, setShowDisease] = useState(false);
    const [showSymptoms, setShowSysmptoms] = useState(false);
    const navigate = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const token = await axios.get('/api/cookies');
            const dataToken = token.data.token;

            const formData = new FormData();
            formData.append('disease_history', disease);
            formData.append('current_symptoms', sysmptoms);

            const response = await axios.post(`http://localhost:8000/api/v1/consultations?token=${dataToken}`, formData);
            Swal.fire({
                title: response.data.message,
                text: 'You can be redirect to Dashboard',
                icon: 'success',
                confirmButtonText: 'Oke',
                confirmButtonColor: '#229BD8'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate.push('/dashboard');
                }
            });

        } catch (error) {
            Swal.fire({
                title: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Oke'
            });
        }
    }

    const handleChangeDisease = (event) => {
        setShowDisease(event.target.value === 'yes');
    }

    const handleChangeSysmptoms = (event) => {
        setShowSysmptoms(event.target.value === 'yes');
    }

    console.log(showDisease);
    return (
        <div className="">
            <Navbar/>
            <div className="font-poppins pt-28 px-48">
                <h1 className="font-[350] text-[46px]">Request Consultation</h1>
                <div className="mt-16 flex flex-col gap-10 font-poppins">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <p className="text-[18px]">Do you have disease history?</p>
                            <select className="border-[1px] border-black rounded-md p-1 text-[14px]" onChange={handleChangeDisease}>
                                <option value="no">No</option>
                                <option value="yes">Yes, I have</option>
                            </select>
                        </div>
                        <textarea
                            className={`border-[1px] border-[rgba(0,0,0,0.11)] px-4 pt-4 focus-within:border-primary outline-none rounded-md w-[550px] h-[300px] ${showDisease == false ? 'hidden' : 'block'}`}
                            value={disease}
                            onChange={(e) => setDisease(e.target.value)}
                            placeholder="Describe your disease history"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <p className="text-[18px]">Do you have sysmptoms now?</p>
                            <select className="border-[1px] border-black rounded-md p-1 text-[14px]" onChange={handleChangeSysmptoms}>
                                <option value="no">No</option>
                                <option value="yes">Yes, I have</option>
                            </select>
                        </div>
                        <textarea
                            className={`border-[1px] border-[rgba(0,0,0,0.11)] px-4 pt-4 focus-within:border-primary outline-none rounded-md w-[550px] h-[300px] ${showSymptoms == false ? 'hidden' : 'block'}`}
                            value={sysmptoms}
                            onChange={(e) => setSysmptoms(e.target.value)}
                            placeholder="Describe your current sysmptoms"
                        />
                    </div>
                </div>
                <button onClick={handleSubmit} className="font-poppins hover:bg-blue-600 font-[400px] bg-primary text-[14px] text-white px-4 py-3 mt-10 cursor-pointer">Send Request</button>
            </div>
            <Footer/>
        </div>
    )
}