import React from 'react'
import Navbar from '../components/Navbar'
import Auth from '../utils/Auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import Swal from 'sweetalert2'
import API from '../utils/API'

const Poliklinik = () => {
    const [pol_name, setPolName] = useState('');
    const [pol_description, setPolDescription] = useState('');
    const [data, setData] = useState([]);
    const token = cookie.get('token');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await API.post('/poliklinik', {
                pol_name,
                pol_description
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
        setPolDescription('');
        setPolName('');
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await API.get('/poliklinik', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setData(response.data.poliklinik);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [token]);

    const handleEdit = async(id) => {
        navigate(`/poliklinik/edit/${id}`);
    }

    const handleDelete = async(id) => {
        try {
            const response = await API.delete(`/poliklinik/${id}`, {
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
                              <th>Description</th>
                              <th>Act</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((datas, index) => (
                                <tr key={index}>
                                    <td>{datas.pol_id}</td>
                                    <td>{datas.pol_name}</td>
                                    <td>{datas.pol_description ?? 'Nothing'}</td>
                                    <td style={{display: 'flex', gap: '10px'}}>
                                        <button onClick={() => handleEdit(datas.pol_id)} className='btn btn-primary'>Edit</button>
                                        <button onClick={() => handleDelete(datas.pol_id)} className='btn btn-danger'>Delete</button>
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

export default Poliklinik