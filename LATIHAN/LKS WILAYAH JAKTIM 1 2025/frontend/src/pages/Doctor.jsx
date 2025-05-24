import React from 'react'
import Auth from '../utils/Auth'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import cookie from 'js-cookie'
import Swal from 'sweetalert2'
import API from '../utils/API'
import { useNavigate } from 'react-router-dom'

const Doctor = () => {
    const [doctor_name, setDoctorName] = useState('');
    const [doctor_gender, setDoctorGender] = useState('');
    const [doctor_phone_number, setDoctorPhoneNumber] = useState('');
    const [doctor_address, setDoctorAddress] = useState('');
    const [doctor_email, setDoctorEmail] = useState('');
    const [doctor_bio, setDoctorBio] = useState('');
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const token = cookie.get('token');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await API.post('/doctor', {
                doctor_name,
                doctor_gender,
                doctor_phone_number,
                doctor_address,
                doctor_email,
                doctor_bio
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
        setDoctorAddress('');
        setDoctorBio('');
        setDoctorEmail('');
        setDoctorGender('');
        setDoctorName('');
        setDoctorPhoneNumber('');
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await API.get('/doctor', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setData(response.data.doctor);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [token]);

    const handleEdit = async(id) => {
        navigate(`/doctor/edit/${id}`);
    }

    const handleDelete = async(id) => {
        try {
            const response = await API.delete(`/doctor/${id}`, {
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
                text: 'This data is related to the Schedule data',
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
                      Input Doctor
                    </div>
                    <div className="card-body">
                      <div className="form-body">
                        <form >
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              Name
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                              <input className="form-control" value={doctor_name} onChange={(e) => setDoctorName(e.target.value)}/>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              Gender
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                              <select className="form-control" value={doctor_gender} onChange={(e) => setDoctorGender(e.target.value)}>
                                <option value=''>--Option--</option>
                                <option value='M'>Male</option>
                                <option value='F'>Female</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              Phone
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                              <input className="form-control" value={doctor_phone_number} onChange={(e) => setDoctorPhoneNumber(e.target.value)}/>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              Address
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                              <input className="form-control" value={doctor_address} onChange={(e) => setDoctorAddress(e.target.value)}/>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              Email
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                              <input className="form-control" value={doctor_email} onChange={(e) => setDoctorEmail(e.target.value)}/>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              Bio
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                              <textarea className="form-control" value={doctor_bio} onChange={(e) => setDoctorBio(e.target.value)}></textarea>
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
                                <th>ID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Bio</th>
                                <th>Act</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((datas, index) => (
                                  <tr key={index}>
                                      <td>{datas.doctor_id}</td>
                                      <td>{datas.doctor_name}</td>
                                      <td>{datas.doctor_gender == 'M' ? 'Male' : 'Female'}</td>
                                      <td>{datas.doctor_phone_number}</td>
                                      <td>{datas.doctor_address}</td>
                                      <td>{datas.doctor_email}</td>
                                      <td>{datas.doctor_bio ?? 'Nothing'}</td>
                                      <td style={{display: 'flex', gap: '10px'}}>
                                          <button onClick={() => handleEdit(datas.doctor_id)} className='btn btn-primary'>Edit</button>
                                          <button onClick={() => handleDelete(datas.doctor_id)} className='btn btn-danger'>Delete</button>
                                      </td>
                                  </tr>
                              ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Data Not Found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
        </div>
    </Auth>
  )
}

export default Doctor