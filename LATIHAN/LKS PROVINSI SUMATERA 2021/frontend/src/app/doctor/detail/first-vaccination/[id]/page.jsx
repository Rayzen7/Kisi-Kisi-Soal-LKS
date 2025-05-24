"use client"
import Footer from "@/components/footer"
import NavbarDoctor from "@/components/navbar-doctor"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

export default function FirstVaccinationDetail() {
    const [vaccination, setVaccination] = useState([]);
    const [vaccine, setVaccine] = useState([]);
    const [officer, setOfficer] = useState([]);
    const navigate = useRouter();
    const { id } = useParams();
    const [userVaccine, setUserVaccine] = useState('');
    const [userOfficer, setUserOfficer] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const dataToken = token.data.token;

                const response = await axios.get(`http://localhost:8000/api/v1/doctor/first/${id}?token=${dataToken}`);
                setVaccination(response.data.first);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchVaccine = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const dataToken = token.data.token;

                const response = await axios.get(`http://localhost:8000/api/v1/doctor/vaccine/${id}?token=${dataToken}`);
                setVaccine(response.data.vaccine.vaccines);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchOfficer = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const dataToken = token.data.token;

                const response = await axios.get(`http://localhost:8000/api/v1/doctor/officer/${id}?token=${dataToken}`);
                setOfficer(response.data.officer);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
        fetchVaccine();
        fetchOfficer();
    }, [id]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const token = await axios.get('/api/cookies');
            const dataToken = token.data.token;

            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('vaccine_id', userVaccine);
            formData.append('officer_id', userOfficer);
            const response = await axios.post(`http://localhost:8000/api/v1/doctor/first/${id}?token=${dataToken}`, formData);

            Swal.fire({
                title: response.data.message,
                text: 'You can be redirect to Dashboard',
                icon: 'success',
                confirmButtonText: 'Oke',
                confirmButtonColor: '#229BD8'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate.push('/doctor/dashboard');
                }
            });
        } catch (error) {
            Swal.fire({
                title: error.response.data.message,
                text: 'Please field the input correctly',
                icon: 'error',
                confirmButtonText: 'Oke',
                confirmButtonColor: '#229BD8'
            });
        }
    }

    return (
        <div className="">
            <NavbarDoctor/>
            <div className="font-poppins pt-28 px-32">
                <h1 className="font-[350] text-[48px]">First Vaccination Society Detail</h1>
                <div className="mt-16 flex items-start gap-20">
                    <div className="w-[500px] min-h-[200px] rounded-md border-[1px] border-[rgba(0,0,0,.125)]">
                        <h1 className="font-[500] bg-[rgba(0,0,0,.03)] text-[20px] border-b-[1px] border-[rgba(0,0,0,.125)] py-3 px-5">Society Profile</h1>
                        <table className="border-collapse w-full">
                            <tbody>
                                <tr>
                                    <td className="font-[500] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">Name :</td>
                                    <td className="font-[400] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">{vaccination.society?.name}</td>
                                </tr>
                                <tr>
                                    <td className="font-[500] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">Gender :</td>
                                    <td className="font-[400] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">{vaccination.society?.gender}</td>
                                </tr>
                                <tr>
                                    <td className="font-[500] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">Spot :</td>
                                    <td className="font-[400] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">{vaccination.spot?.name}</td>
                                </tr>
                                <tr>
                                    <td className="font-[500] px-5 py-4 text-[16px]">Date :</td>
                                    <td className="font-[400] px-5 py-4 text-[16px]">{vaccination.date}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="">
                        <h1 className="font-[500] text-[28px]">Doctor Response</h1>
                        <div className="mt-5 flex items-center gap-8">
                            <label className="text-[18px]">Vaccine :</label>
                            <select className="outline-none text-[16px] border-[1px] border-[rgba(0,0,0,.125)] rounded-md p-1 cursor-pointer" value={userVaccine} onChange={(e) => setUserVaccine(e.target.value)}>
                                <option value="" disabled>select vaccine</option>
                                {vaccine.map((vaccines) => (
                                    <option key={vaccines.id} value={vaccines.id}>{vaccines.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-6 flex items-center gap-8">
                            <label className="text-[18px]">Officer :</label>
                            <select className="outline-none text-[16px] border-[1px] border-[rgba(0,0,0,.125)] rounded-md p-1 cursor-pointer" value={userOfficer} onChange={(e) => setUserOfficer(e.target.value)}>
                                <option value="" disabled>select officer</option>
                                {officer.map((officers) => (
                                    <option key={officers.id} value={officers.id}>{officers.name}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleSubmit} className="font-poppins hover:bg-blue-600 font-[500px] rounded-md mt-12 bg-primary text-[14px] text-white px-8 py-3 cursor-pointer">Submit</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}