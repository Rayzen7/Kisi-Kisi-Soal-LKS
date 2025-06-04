/* eslint-disable no-unused-vars */
import React from 'react'
import API from '../utils/API'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import rupiahFormat from '../utils/RupiahFormat'

const BodyCarDetail = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { id } = useParams();
    const [nominal, setNominal] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCar = async() => {
            const response = await API.get(`/instalment_cars/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setData(response.data.cars);
        }

        fetchCar();
    }, [token, id]);
  return (
    <div>
        <main>
            <header className="jumbotron">
                <div className="container text-center">
                    <div>
                        <h1 className="display-4">{data.cars}</h1>
                        <span className="text-muted">Brand : {data.brand}</span>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-group">
                            <h3>Description</h3>
                            {data.description}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <h3>Price : <span className="badge badge-primary">{rupiahFormat(data.price)}</span></h3>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-group">
                            <h3>Select Months</h3>
                            <select 
                                name="months" 
                                className="form-control"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const monthNominal = data?.available_month?.find(e => e.month === parseInt(value));
                                    setNominal(monthNominal.nominal);
                                }}
                            >
                                <option value="" disabled selected>Select Month</option>
                                {data?.available_month?.map((datas, index) => (
                                    <option key={index} value={datas.month}>
                                    {datas.month} Months
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <h3>Nominal/Month : <span className="badge badge-primary">{rupiahFormat(nominal)}</span></h3>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="d-flex align-items-center mb-3">
                                <label className="mr-3 mb-0">Notes</label>
                            </div>
                            <textarea className="form-control" cols="30" rows="6" placeholder="Explain why your installment should be approved"></textarea>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="d-flex align-items-center mb-3">
                                <button className="btn btn-primary btn-lg">Apply</button>
                            </div>
                        </div>
                    </div>
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

export default BodyCarDetail