"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Clock } from "./clock"
import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Swal from "sweetalert2"

export default function spotDetail() {
    const [spotDetail, setSpotDetail] = useState({});
    const [totalSession, setTotalSession] = useState(0);
    const [totalSlot, setTotalSlot] = useState(0);
    const [countSlot, setCountSlot] = useState(0);
    const [selected, setSelected] = useState(null);
    const { id } = useParams();
    const navigate = useRouter();

    useEffect(() => {
        const fetchSpotDetail = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const dataToken = token.data.token;

                const response = await axios.get(`http://localhost:8000/api/v1/spots/${id}?token=${dataToken}`);
                setSpotDetail(response.data.body);

                const spotCapacity = response.data.body.spot.capacity;
                const spotCount = response.data.body.vaccinations_count;
                setTotalSlot(spotCapacity / 3);
                setTotalSession(spotCapacity / 5);
                setCountSlot(spotCount);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSpotDetail();
    }, [id]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const token = await axios.get('/api/cookies');
            const dataToken = token.data.token;

            const response = await axios.post(`http://localhost:8000/api/v1/vaccinations?token=${dataToken}`, {
                date: spotDetail.date,
                spot_id: id
            });

            Swal.fire({
                title: response.data.message,
                text: 'You can be redirect to Dashboard',
                icon: 'success',
                confirmButtonText: 'Success',
                confirmButtonColor: '#229BD8'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate.push('/dashboard');
                }
            });
        } catch (error) {
            Swal.fire({
                title: error.response.data.error || error.response.data.message,
                text: 'You can be redirect to Dashboard',
                icon: 'error',
                confirmButtonText: 'Oke',
                confirmButtonColor: '#229BD8'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate.push('/dashboard');
                }
            });
        }
    }

    return (
        <div className="">
            <Navbar/>
            <div className="font-poppins pt-28 px-32">
                <div className="flex justify-between items-center">
                    <div className="">
                        <h1 className="font-[350] text-[48px]">{spotDetail.spot?.name}</h1>
                        <p className="font-[400] text-[16px] pt-1 text-[#a6a6a6]">{spotDetail.spot?.address}</p>
                    </div>
                    <button onClick={handleSubmit} className="font-poppins hover:bg-blue-600 font-[400px] bg-primary text-[14px] text-white px-4 py-3 cursor-pointer">Register Vaccination</button>
                </div>
                <div className="mt-24 flex flex-col gap-10">
                    <div className="font-poppins">
                        <p className="text-[16px] font-[400]">Select vaccination date</p>
                        <input 
                            type="date" 
                            value={spotDetail.date}
                            className="border-[1px] border-[#a6a6a6] outline-none p-1 w-[300px] rounded-md mt-2"
                        />
                    </div>
                    <div className="flex items-center gap-8">
                        {Array.from({ length: totalSession }, (_, sessionIndex) => {
                            const clockData = Clock[sessionIndex]?.clock;
                            const slotStart = sessionIndex * totalSlot;
                            return (
                                <div key={sessionIndex} className="border-[1px] border-[#a6a6a6] rounded-md py-5 px-7 w-[390px] min-h-[220px]">
                                    <div className="flex justify-between items-center">
                                        <h1 className="font-[500] text-[24px]">Session {sessionIndex + 1}</h1>
                                        <p className="text-[14px] text-[#a6a6a6]">{clockData}</p>
                                    </div>
                                    <div className="flex justify-start items-center gap-4 mt-6 flex-wrap">
                                        {Array.from({ length: totalSlot }, (_, index) => {
                                            const bookedSlot = (slotStart + index) < countSlot;
                                            const isSelected = selected === (slotStart + index);
                                            return (
                                                <div onClick={() => !bookedSlot && setSelected(slotStart + index)} key={index} className={`w-[82px] flex justify-center items-center h-[70px] rounded-md ${bookedSlot ? ' border-[2px] cursor-not-allowed border-[#44b844]' : ' cursor-pointer'} ${isSelected ? 'bg-[#229BD8] duration-200 text-white' : ''}`}>
                                                    <h1 className="font-[400] text-[14px]">#{slotStart + index + 1}</h1>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}