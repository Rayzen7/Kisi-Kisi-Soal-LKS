"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function vaccinationSpot() {
    const [spot, setSpot] = useState([]);
    const [spotName, setSpotName] = useState([]);
    const navigate = useRouter();

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const dataToken = token.data.token;

                const response = await axios.get(`http://localhost:8000/api/v1/auth/user?token=${dataToken}`);
                const userSpotName = response.data.user.regional_id;
                if (userSpotName == 1) {
                    setSpotName('Central Jakarta');
                } else if (userSpotName == 2) {
                    setSpotName('South Jakarta');
                } else {
                    setSpotName('Bandung');
                }

            } catch (error) {
                console.error(error);
            }
        }

        const fetchSpot = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const dataToken = token.data.token;

                const response = await axios.get(`http://localhost:8000/api/v1/spots?token=${dataToken}`);
                setSpot(response.data.spots);

            } catch (error) {
                console.error(error);
            }
        }

        fetchUser();
        fetchSpot();
    }, []);

    const handleDetail = (id) => {
        navigate.push(`/first-vaccination-spot/detail/${id}`)
    }

    return (
        <div className="">
            <Navbar/>
            <div className="font-poppins pt-28 px-32">
                <h1 className="font-[350] text-[48px]">Second Vaccination</h1>
                <div className="mt-20 flex flex-col gap-10">
                    <p className="text-[#6c757d] font-[400] text-[22px]">List Vaccination Spots in {spotName}</p>
                    <table className="border-collapse">
                        {spot.map((spots) => (
                            <tbody key={spots.id}>
                                <tr className={`font-poppins ${spots.serve == 1 ? 'opacity-40' : ''}`}>
                                    <td className="bg-[#FAFAFA] py-10 px-6">
                                        <h1 onClick={spots.serve == 1 ? false : () => handleDetail(spots.id)} className={`text-primary text-[20px] font-[500] ${spots.serve == 1 ? 'cursor-default no-underline' : 'cursor-pointer hover:underline'}`}>{spots.name}</h1>
                                        <p className="text-[#6c757d] text-[16px] pt-2">{spots.address}</p>
                                    </td>
                                    <td className="bg-[#FAFAFA] py-10 px-6">
                                        <h1 className="text-black text-[20px] font-[500]">Available vaccines</h1>
                                        <p className="text-[#a6a6a6] text-[16px] font-[400] pt-2">
                                            {Object.keys(spots.available_vaccines).filter(vaccines => spots.available_vaccines[vaccines]).join(", ")}
                                        </p>
                                    </td>
                                    <td className='bg-[#FAFAFA] py-10 px-6'>
                                        <h1 className="text-black text-[20px] font-[500]">Serve</h1>
                                        <p className="text-[#a6a6a6] text-[16px] font-[400] pt-2">
                                            {spots.serve == '1' ? 'only first vaccination' : spots.serve == '2' ? 'only second vaccination' : 'both vaccination'}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    )
}