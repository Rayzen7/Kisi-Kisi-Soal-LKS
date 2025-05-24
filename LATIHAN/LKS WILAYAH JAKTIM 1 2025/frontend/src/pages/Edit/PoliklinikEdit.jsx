import React from 'react'
import Navbar from '../../components/Navbar'
import Auth from '../../utils/Auth'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import cookie from 'js-cookie'
import Swal from 'sweetalert2'
import API from '../../utils/API'

const PoliklinikEdit = () => {
    const [pol_name, setPolName] = useState('');
    const [pol_description, setPolDescription] = useState('');
    const { id } = useParams();
    const token = cookie.get('token');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await API.put(`/poliklinik/${id}`, {
                pol_name,
                pol_description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            Swal.fire({
                title: response.data.message,
                text: 'The page can redirect to Poliklinik Page',
                icon: 'success',
                confirmButtonText: 'Success',
                confirmButtonColor: 'green'
            });

            setTimeout(() => {
                navigate('/poliklinik');
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
        setPolDescription('');
        setPolName('');
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await API.get(`/poliklinik/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const getData = response.data.poliklinik;
                setPolName(getData.pol_name);
                setPolDescription(getData.pol_description);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [token, id]);
  
  return (
    <Auth>
        <Navbar/>
        <div>
            <div className="container my-4">
              <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="card card-info">
                    <div className="card-header">
                      Input Poliklinik
                    </div>
                    <div className="card-body">
                      <div className="form-body">
                        <form >
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              Poliklinik Name
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                              <input className="form-control" value={pol_name} onChange={(e) => setPolName(e.target.value)}/>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-md-4 col-sm-12 col-xs-12">
                              Description
                            </label>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                              <textarea className="form-control" value={pol_description} onChange={(e) => setPolDescription(e.target.value)}></textarea>
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

export default PoliklinikEdit