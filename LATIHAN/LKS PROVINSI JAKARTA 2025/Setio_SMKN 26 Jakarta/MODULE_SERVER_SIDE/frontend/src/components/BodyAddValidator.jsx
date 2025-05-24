import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import API from '../utils/API';

const BodyAddValidator = () => {
    const token = localStorage.getItem('token');
    const [job, setJob] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [income, setIncome] = useState(0);
    const [reason, setReason] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async() => {
        try {
            const response = await API.post('/validation', {
                job: job,
                job_description: jobDesc,
                income: income,
                reason_accepted: reason
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert(response.data.message);
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <div>
            <main>
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Request Data Validation</h1>
                    </div>
                </header>

                <div className="container">

                    <div>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Are you working?</label>
                                        <select className="form-control-sm">
                                            <option value="yes">Yes, I have</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <input value={job} onChange={(e) => setJob(e.target.value)} type="text" placeholder="Your Job" className="form-control mt-2 mb-2" />
                                    <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} className="form-control" cols="30" rows="5" placeholder="describe what you do in your job"></textarea>
                                    <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Income (Rp)" className="form-control mt-2" />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Reason Accepted</label>
                                    </div>
                                    <textarea value={reason} onChange={(e => setReason(e.target.value))} className="form-control" cols="30" rows="6" placeholder="Explain why you should be accepted"></textarea>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={handleSubmit}>Send Request</button>
                    </div>
                </div>
            </main>
            <footer>
                <div className="container">
                    <div className="text-center py-4 text-muted">
                        Copyright &copy; 2024 - Web Tech ID
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default BodyAddValidator