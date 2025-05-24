import React from 'react'
import Auth from '../utils/Auth'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import cookie from 'js-cookie'
import Swal from 'sweetalert2'
import API from '../utils/API'
import { useNavigate } from 'react-router-dom'

const Schedule = () => {
    const navigate = useNavigate();
    const token = cookie.get('token');
    const [data, setData] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [pol, setPol] = useState([]);
    const [doctor_id, setDoctorId] = useState('');
    const [pol_id, setPolId] = useState('');
    const [schedule_date, setScheduleDate] = useState('');
    const [schedule_start, setScheduleStart] = useState('');
    const [schedule_end, setScheduleEnd] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (schedule_start > schedule_end) {
                Swal.fire({
                    title: 'Invalid field',
                    text: 'Please input the time correctly',
                    icon: 'error',
                    confirmButtonText: 'Error',
                    confirmButtonColor: 'red'
                });

                setScheduleStart('');
                setScheduleEnd('');
            } else {
                const response = await API.post('/schedule', {
                    doctor_id,
                    pol_id,
                    schedule_date,
                    schedule_start,
                    schedule_end
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                Swal.fire({
                    title: response.data.message,
                    text: 'The page can be reload',
                    icon: 'success',
                    confirmButtonText: 'Success',
                    confirmButtonColor: 'green'
                });
    
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            const errors = error.response.data.errors;
            const errorMessages = Object.values(errors).map((msg) => `<p>- ${msg}</p>`).join('') || null;

            Swal.fire({
                title: error.response.data.message,
                text: 'The page can be reload',
                icon: 'error',
                confirmButtonText: 'Error',
                confirmButtonColor: 'red',
                html: errorMessages
            });
        }
    }

    const handleReset = () => {
        setDoctorId('')
        setPolId('');
        setScheduleDate('');
        setScheduleStart('');
        setScheduleEnd('');
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await API.get('/schedule', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setData(response.data.schedule);
            } catch (error) {
                console.error(error);
            }
        }
        
        const fetchDoctor = async() => {
            try {
                const response = await API.get('/doctor', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDoctor(response.data.doctor);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchPol = async() => {
            try {
                const response = await API.get('/poliklinik', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setPol(response.data.poliklinik);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
        fetchDoctor();
        fetchPol();
    }, [token]);

    const handleEdit = async(id) => {
        navigate(`/schedule/edit/${id}`);
    }

    const handleDelete = async(id) => {
        try {
            const response = await API.delete(`/schedule/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            Swal.fire({
                title: response.data.message,
                text: 'The page can be reload',
                icon: 'success',
                confirmButtonText: 'Success',
                confirmButtonColor: 'green'
            });

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            Swal.fire({
                title: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Error',
                confirmButtonColor: 'red',
            });
        }
    }

  return (
    <Auth>
        <Navbar/>
        <div>
            <div className="container my-4">
              <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="card card-info">
                    <div className="card-header">
                      Input Doctor's Schedules
                    </div>
                    <div className="card-body">
                      <div className="form-body">
                        <form >
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              Doctor ID
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                              <select value={doctor_id} onChange={(e) => setDoctorId(e.target.value)} className="form-control">
                                <option value="">-- Option --</option>
                                {doctor.map((doctors) => (
                                    <option value={doctors.doctor_id} key={doctors.doctor_id}>{doctors.doctor_id} | {doctors.doctor_name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              Poliklinik ID
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                                <select value={pol_id} onChange={(e) => setPolId(e.target.value)} className="form-control">
                                <option value="">-- Option --</option>
                                {pol.map((pols) => (
                                    <option value={pols.pol_id} key={pols.pol_id}>{pols.pol_id} | {pols.pol_name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              Date
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                              <input className="form-control" type='date' value={schedule_date} onChange={(e) => setScheduleDate(e.target.value)}/>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              Start
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                              <input className="form-control" type='time' value={schedule_start} onChange={(e) => setScheduleStart(e.target.value)}/>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              End
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                              <input className="form-control" type='time' value={schedule_end} onChange={(e) => setScheduleEnd(e.target.value)}/>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <div className="col-md-12">
                              <input type="submit" onClick={handleSubmit} value="Save" className="btn btn-primary"/> 
                              <input type="reset" onClick={handleReset} value="Reset" className="btn btn-danger"/>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4">
                <div className="card card-default">
                  <div className="card-header">
                    Data
                  </div>
                  <div className="card-body">
                    {data.length > 0 ? (
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Poliklinik</th>
                              <th>Doctor</th>
                              <th>Date</th>
                              <th>Start</th>
                              <th>End</th>
                              <th>Act</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((datas, index) => (
                                <tr key={index}>
                                    <td>{datas.schedule_id}</td>
                                    <td>{datas.doctor.doctor_name}</td>
                                    <td>{datas.pol.pol_name}</td>
                                    <td>{datas.schedule_date}</td>
                                    <td>{datas.schedule_start}</td>
                                    <td>{datas.schedule_end}</td>
                                    <td style={{display: 'flex', gap: '10px'}}>
                                        <button onClick={() => handleEdit(datas.schedule_id)} className='btn btn-primary'>Edit</button>
                                        <button onClick={() => handleDelete(datas.schedule_id)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                          </tbody>
                        </table>
                    ) : (
                        <p>Data not Found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
        </div>
    </Auth>
  )
}

export default Schedule