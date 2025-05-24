import React from 'react'
import Auth from '../../utils/Auth'
import Navbar from '../../components/Navbar'
import { useState, useEffect } from 'react'
import cookie from 'js-cookie'
import Swal from 'sweetalert2'
import API from '../../utils/API'
import { useNavigate, useParams } from 'react-router-dom'

const DoctorEdit = () => {
    const [doctor_name, setDoctorName] = useState('');
    const [doctor_gender, setDoctorGender] = useState('');
    const [doctor_phone_number, setDoctorPhoneNumber] = useState('');
    const [doctor_address, setDoctorAddress] = useState('');
    const [doctor_email, setDoctorEmail] = useState('');
    const [doctor_bio, setDoctorBio] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const token = cookie.get('token');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await API.put(`/doctor/${id}`, {
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
                text: 'The page can redirect to Doctor Page',
                icon: 'success',
                confirmButtonText: 'Success',
                confirmButtonColor: 'green'
            });

            setTimeout(() => {
                navigate('/doctor');
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

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await API.get(`/doctor/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const getData = response.data.doctor;
                setDoctorAddress(getData.doctor_address);
                setDoctorBio(getData.doctor_bio);
                setDoctorEmail(getData.doctor_email);
                setDoctorGender(getData.doctor_gender);
                setDoctorName(getData.doctor_name);
                setDoctorPhoneNumber(getData.doctor_phone_number);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [token, id]);

    const handleReset = () => {
        setDoctorAddress('');
        setDoctorBio('');
        setDoctorEmail('');
        setDoctorGender('');
        setDoctorName('');
        setDoctorPhoneNumber('');
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
            </div>
        </div>
    </Auth>
  )
}

export default DoctorEdit