"use client"
import Footer from "@/components/footer"
import NavbarDoctor from "@/components/navbar-doctor"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

export default function DetailConsultatiom() {
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');
    const navigate = useRouter();

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const token = await axios.get('/api/cookies');
                const dataToken = token.data.token;
                
                const response = await axios.get(`http://localhost:8000/api/v1/doctor/consultations/${id}?token=${dataToken}`);
                setUser(response.data.consultation);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUser();
    }, [id]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const token = await axios.get('/api/cookies');
            const dataToken = token.data.token;

            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('status', status);
            formData.append('doctor_notes', notes);
            const response = await axios.post(`http://localhost:8000/api/v1/doctor/consultations/${id}?token=${dataToken}`, formData);

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
                <h1 className="font-[350] text-[48px]">Consultation Society Detail</h1>
                <div className="mt-16 flex items-start gap-20">
                    <div className="w-[500px] min-h-[200px] rounded-md border-[1px] border-[rgba(0,0,0,.125)]">
                        <h1 className="font-[500] bg-[rgba(0,0,0,.03)] text-[20px] border-b-[1px] border-[rgba(0,0,0,.125)] py-3 px-5">Society Profile</h1>
                        <table className="border-collapse w-full">
                            <tbody>
                                <tr>
                                    <td className="font-[500] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">Name :</td>
                                    <td className="font-[400] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">{user.society?.name}</td>
                                </tr>
                                <tr>
                                    <td className="font-[500] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">Gender :</td>
                                    <td className="font-[400] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">{user.society?.gender}</td>
                                </tr>
                                <tr>
                                    <td className="font-[500] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">Address :</td>
                                    <td className="font-[400] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">{user.society?.address}</td>
                                </tr>
                                <tr>
                                    <td className="font-[500] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">Status :</td>
                                    <td className="font-[400] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">
                                        <p className="bg-[#17a2b8] w-[80px] text-white text-[12px] p-2 rounded-md text-center">{user.status}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-[500] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">Disease :</td>
                                    <td className="font-[400] px-5 py-4 text-[16px] border-b-[1px] border-[rgba(0,0,0,.125)]">{user.disease_history ?? '-'}</td>
                                </tr>
                                <tr>
                                    <td className="font-[500] px-5 py-4 text-[16px]">Symptoms :</td>
                                    <td className="font-[400] px-5 py-4 text-[16px]">{user.current_symptoms ?? '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="">
                        <h1 className="font-[500] text-[28px]">Doctor Response</h1>
                        <div className="mt-5 flex items-center gap-8">
                            <label className="text-[18px]">Status :</label>
                            <select className="outline-none text-[16px] border-[1px] border-[rgba(0,0,0,.125)] rounded-md p-1 cursor-pointer" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="" disabled>select status</option>
                                <option value="accepted">accepted</option>
                                <option value="declined">declined</option>
                            </select>
                        </div>
                        <div className="mt-5 flex flex-col gap-3">
                            <label className="text-[18px]">Notes :</label>
                            <textarea
                                className="outline-none text-[14px] pt-4 pl-4 border-[rgba(0,0,0,.125)] border-[1px] rounded-md w-[400px] h-[180px]"
                                placeholder="Please field the notes here"
                                required
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                        <button onClick={handleSubmit} className="font-poppins hover:bg-blue-600 font-[500px] rounded-md mt-6 bg-primary text-[14px] text-white px-8 py-3 cursor-pointer">Submit</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}