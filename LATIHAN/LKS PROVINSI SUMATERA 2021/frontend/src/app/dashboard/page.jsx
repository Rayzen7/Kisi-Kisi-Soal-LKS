"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer";
import axios from "axios";
import { useState, useEffect } from "react"
import Link from "next/link";

export default function dashboard() {
    const [consultation, setConsultation] = useState([]);
    const [firstVaccination, setFirst] = useState([]);
    const [secondVaccination, setSecond] = useState([]);
    const [consultationUser, setConsultationUser] = useState(true);
    const [showFirstVaccine, setShowFirstVaccine] = useState(true);
    const [firstVaccine, setFirstVaccine] = useState(true);
    const [showSecondVaccine, setShowSecondVaccine] = useState(true);
    const [secondVaccine, setSecondVaccine] = useState(true);
    const [firstStatus, setFirstStatus] = useState(false);
    const [secondStatus, setSecondStatus] = useState(false);

    useEffect(() => {
        const fetchConsultation = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const dataToken = token.data.token;

                const response = await axios.get(`http://localhost:8000/api/v1/consultations?token=${dataToken}`);
                setConsultation(response.data.consultation);
                const consultation = response.data.consultation;

                if (consultation.length == 0) {
                    setConsultationUser(false);
                    setShowFirstVaccine(false);
                    setShowSecondVaccine(false);
                }

                if (consultation) {
                    const statusConsultation = response.data.consultation[0].status;
                    if (statusConsultation == 'pending' || statusConsultation == 'decline') {
                        setShowFirstVaccine(false);
                        setShowSecondVaccine(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        const fetchFirstVaccination = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const dataToken = token.data.token;

                const response = await axios.get(`http://localhost:8000/api/v1/vaccinations?token=${dataToken}`);
                setFirst([response.data.vaccinations.first]);
                const firstVaccination = response.data.vaccinations.first;

                if (firstVaccination == null) {
                    setFirstVaccine(false);
                    setShowSecondVaccine(false);
                }

                if (firstVaccination) {                    
                    if (firstVaccination.vaccine.name) {
                        setFirstStatus(true);
                    }

                    if (firstStatus == false) {
                        setShowSecondVaccine(false);
                    } else {
                        setShowSecondVaccine(true);
                    }
                }

            } catch (error) {
                console.error(error);
            }
        }

        const fetchSecondVaccination = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const dataToken = token.data.token;

                const response = await axios.get(`http://localhost:8000/api/v1/vaccinations?token=${dataToken}`);
                setSecond([response.data.vaccinations.second]);
                const secondVaccination = response.data.vaccinations.second;

                if (secondVaccination == null) {
                    setSecondVaccine(false);
                }

                if (secondVaccination.vaccine.name) {
                    setSecondStatus(true)
                }

            } catch (error) {
                console.error(error);
            }
        }

        fetchConsultation();
        fetchFirstVaccination();
        fetchSecondVaccination();
    }, [firstStatus, secondStatus, showFirstVaccine, showSecondVaccine]);

    return (
        <div className="">
            <Navbar/>
            <div className="font-poppins pt-28 px-48">
                <h1 className="font-[350] text-[48px]">Dashboard</h1>
                <div className="mt-16 flex flex-col gap-10">
                    <div className="">
                        <h1 className="text-[#6c757d] text-[22px] font-[500]">My Consultation</h1>
                        <div className="flex items-start gap-8 mt-4">
                            <div className="border-[rgba(0,0,0,0.11)] border-[1px] rounded-md w-[400px] h-[120px]">
                                <h1 className="bg-[rgba(0,0,0,0.03)] w-full border-[rgba(0,0,0,0.11)] border-b-[1px] px-5 py-3 text-[18px] font-[500]">Consultation</h1>
                                <div className="w-full flex px-5 items-center h-[70px]">
                                    <Link href='/consultation'><p className="text-[16px] cursor-pointer hover:text-[#224fd8] hover:underline text-primary">+ Request consultation</p></Link>
                                </div>
                            </div>
                            <div className={`border-[rgba(0,0,0,0.11)] border-[1px] rounded-md w-[400px] min-h-[120px] block ${consultationUser == false ? 'hidden' : "block"}`}>
                                <h1 className="bg-[rgba(0,0,0,0.03)] w-full border-[rgba(0,0,0,0.11)] border-b-[1px] px-5 py-3 text-[18px] font-[500]">Consultation</h1>
                                <table className="border-collapse w-full">
                                    {consultation.map((consultations) => (
                                        <tbody key={consultations.id}>
                                            <tr className="bg-[rgba(0,0,0,0.03)] border-[rgba(0,0,0,0.11)] border-b-[1px]">
                                                <td className="font-[600] px-5 py-4">Status</td>
                                                <td className="">
                                                    <p className="bg-[#17a2b8] w-[80px] text-white text-[12px] p-1 rounded-md text-center">{consultations?.status}</p>
                                                </td>
                                            </tr>
                                            <tr className="border-[rgba(0,0,0,0.11)] border-b-[1px]">
                                                <td className="font-[600] px-5 py-4">Disease History</td>
                                                <td className="">
                                                    <p className="text-[rgb(118,117,117)] text-[14px] text-start">{consultations?.disease_history ?? '-' }</p>
                                                </td>
                                            </tr>
                                            <tr className="border-[rgba(0,0,0,0.11)] bg-[rgba(0,0,0,0.03)] border-b-[1px]">
                                                <td className="font-[600] px-5 py-4">Current Symptoms</td>
                                                <td className="">
                                                    <p className="text-[rgb(118,117,117)] text-[14px] text-start">{consultations?.current_symptoms ?? '-' }</p>
                                                </td>
                                            </tr>
                                            <tr className="border-[rgba(0,0,0,0.11)] border-b-[1px]">
                                                <td className="font-[600] px-5 py-4">Doctor Name</td>
                                                <td className="">
                                                    <p className="text-[rgb(118,117,117)] text-[14px] text-start">{consultations?.doctor ?? '-' }</p>
                                                </td>
                                            </tr>
                                            <tr className="bg-[rgba(0,0,0,0.03)]">
                                                <td className="font-[600] px-5 py-4">Doctor Notes</td>
                                                <td className="">
                                                    <p className="text-[rgb(118,117,117)] text-[14px] text-start">{consultations?.doctor_notes ?? '-' }</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={`${showFirstVaccine == false ? 'hidden' : 'block'}`}>
                        <h1 className="text-[#6c757d] text-[22px] font-[500]">My Vaccinations</h1>
                        <div className="bg-[#fff3cd] px-6 my-4 w-[830px] py-4 rounded-md">
                            <p className="text-[#856404] text-[14px]">Your consultation must be approved by doctor to get the vaccine.</p>
                        </div>
                        <div className="flex items-start gap-8 mt-4">
                            <div className="border-[rgba(0,0,0,0.11)] border-[1px] rounded-md w-[400px] h-[120px]">
                                <h1 className="bg-[rgba(0,0,0,0.03)] w-full border-[rgba(0,0,0,0.11)] border-b-[1px] px-5 py-3 text-[18px] font-[500]">First Vaccination</h1>
                                <div className="w-full flex px-5 items-center h-[70px]">
                                    <Link href='/first-vaccination-spot'>
                                        <p className="text-[16px] cursor-pointer hover:text-[#224fd8] hover:underline text-primary">+ Request vaccination</p>
                                    </Link>
                                </div>
                            </div>
                            <div className={`border-[rgba(0,0,0,0.11)] border-[1px] rounded-md w-[400px] min-h-[120px] block ${firstVaccine == false ? 'hidden' : "block"}`}>
                                <h1 className="bg-[rgba(0,0,0,0.03)] w-full border-[rgba(0,0,0,0.11)] border-b-[1px] px-5 py-3 text-[18px] font-[500]">First Vaccination</h1>
                                <table className="border-collapse w-full">
                                    {firstVaccination.map((vaccinations) => (
                                        <tbody key={vaccinations?.id ?? '-'}>
                                            <tr className="bg-[rgba(0,0,0,0.03)] border-[rgba(0,0,0,0.11)] border-b-[1px]">
                                                <td className="font-[600] px-5 py-4">Status</td>
                                                <td className="">
                                                    <p className="bg-[#17a2b8] w-[80px] text-white text-[12px] p-1 rounded-md text-center">{firstStatus == true ? 'vaccinated' : vaccinations?.status ?? '-'}</p>
                                                </td>
                                            </tr>
                                            <tr className="border-[rgba(0,0,0,0.11)] border-b-[1px]">
                                                <td className="font-[600] px-5 py-4">Date</td>
                                                <td className="">
                                                    <p className="text-[rgb(118,117,117)] text-[14px] text-start">{vaccinations?.vaccination_date ?? '-' }</p>
                                                </td>
                                            </tr>
                                            <tr className="border-[rgba(0,0,0,0.11)] bg-[rgba(0,0,0,0.03)] border-b-[1px]">
                                                <td className="font-[600] px-5 py-4">Spot</td>
                                                <td className="">
                                                    <p className="text-[rgb(118,117,117)] text-[14px] text-start">{vaccinations?.spot.name ?? '-' }</p>
                                                </td>
                                            </tr>
                                            <tr className="border-[rgba(0,0,0,0.11)] border-b-[1px]">
                                                <td className="font-[600] px-5 py-4">Vaccine</td>
                                                <td className="">
                                                    <p className="text-[rgb(118,117,117)] text-[14px] text-start">{vaccinations?.vaccine.name ?? '-' }</p>
                                                </td>
                                            </tr>
                                            <tr className="bg-[rgba(0,0,0,0.03)]">
                                                <td className="font-[600] px-5 py-4">Vaccinator</td>
                                                <td className="">
                                                    <p className="text-[rgb(118,117,117)] text-[14px] text-start">{vaccinations?.vaccinator.name ?? '-' }</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={`${showSecondVaccine == false ? 'hidden' : 'block'}`}>
                        <div className="flex items-start gap-8 mt-4">
                            <div className="border-[rgba(0,0,0,0.11)] border-[1px] rounded-md w-[400px] h-[120px]">
                                <h1 className="bg-[rgba(0,0,0,0.03)] w-full border-[rgba(0,0,0,0.11)] border-b-[1px] px-5 py-3 text-[18px] font-[500]">Second Vaccination</h1>
                                <div className="w-full flex px-5 items-center h-[70px]">
                                    <Link href='/second-vaccination-spot'>
                                        <p className="text-[16px] cursor-pointer hover:text-[#224fd8] hover:underline text-primary">+ Request vaccination</p>
                                    </Link>
                                </div>
                            </div>
                            <div className={`border-[rgba(0,0,0,0.11)] border-[1px] rounded-md w-[400px] min-h-[120px] block ${secondVaccine == false ? 'hidden' : "block"}`}>
                                <h1 className="bg-[rgba(0,0,0,0.03)] w-full border-[rgba(0,0,0,0.11)] border-b-[1px] px-5 py-3 text-[18px] font-[500]">Second Vaccination</h1>
                                <table className="border-collapse w-full">
                                    {secondVaccination.map((vaccinations) => (
                                        <tbody key={vaccinations?.id ?? ''}>
                                            <tr className="bg-[rgba(0,0,0,0.03)] border-[rgba(0,0,0,0.11)] border-b-[1px]">
                                                <td className="font-[600] px-5 py-4">Status</td>
                                                <td className="">
                                                    <p className="bg-[#17a2b8] w-[80px] text-white text-[12px] p-1 rounded-md text-center">{secondStatus == true ? 'vaccinated' : vaccinations?.status ?? ''}</p>
                                                </td>
                                            </tr>
                                            <tr className="border-[rgba(0,0,0,0.11)] border-b-[1px]">
                                                <td className="font-[600] px-5 py-4">Date</td>
                                                <td className="">
                                                    <p className="text-[rgb(118,117,117)] text-[14px] text-start">{vaccinations?.vaccination_date ?? '-' }</p>
                                                </td>
                                            </tr>
                                            <tr className="border-[rgba(0,0,0,0.11)] bg-[rgba(0,0,0,0.03)] border-b-[1px]">
                                                <td className="font-[600] px-5 py-4">Spot</td>
                                                <td className="">
                                                    <p className="text-[rgb(118,117,117)] text-[14px] text-start">{vaccinations?.spot.name ?? '-' }</p>
                                                </td>
                                            </tr>
                                            <tr className="border-[rgba(0,0,0,0.11)] border-b-[1px]">
                                                <td className="font-[600] px-5 py-4">Vaccine</td>
                                                <td className="">
                                                    <p className="text-[rgb(118,117,117)] text-[14px] text-start">{vaccinations?.vaccine.name ?? '-' }</p>
                                                </td>
                                            </tr>
                                            <tr className="bg-[rgba(0,0,0,0.03)]">
                                                <td className="font-[600] px-5 py-4">Vaccinator</td>
                                                <td className="">
                                                    <p className="text-[rgb(118,117,117)] text-[14px] text-start">{vaccinations?.vaccinator.name ?? '-' }</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}