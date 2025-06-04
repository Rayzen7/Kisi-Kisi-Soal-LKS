// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import API from '../utils/API'

const BodyListCar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        const fetchInstallment = async() => {
            try {
                const response = await API.get('/instalment_cars', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data.cars;
                const newData = data.map((datas, index) => {
                    return {
                        id: datas.id,
                        cars: datas.cars,
                        status: status[index]?.status || false,
                        brand: datas.brand,
                        price: datas.price,
                        description: datas.description,
                        available_month: datas.available_month
                    };
                });

                setData(newData);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchApply = async() => {
            try {
                const response = await API.get('/applications', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const dataApply = response.data.instalments;
                let dataAllCar = [];
                                
                dataApply.filter(applyData => {
                    data.forEach((carData) => {
                        const dataCar = carData.cars;
                        const applyCar = applyData.car;

                        if (dataCar === applyCar) {
                            dataAllCar.push({'status': false});
                        } else {
                            dataAllCar.push({'status': true});
                        }
                    });                    
                });

                setStatus(dataAllCar);
            } catch (error) {
                console.error(error);
            }
        }

        fetchInstallment();
        fetchApply();
    }, [token, data, status]);    
  return (
    <div>
        <main>
            <header className="jumbotron">
                <div className="container">
                    <h1 className="display-4">Cars</h1>
                </div>
            </header>

            <div className="container mb-5">
                <div className="section-header mb-4">
                    <h4 className="section-title text-muted font-weight-normal">List of Cars</h4>
                </div>

                <div className="section-body">
                    {data.length > 0 ? (
                        data.map((datas, index) => (
                            <article className="spot" style={{ opacity: datas.status === false ? 0.5 : 1 }} key={index}>
                                <div className="row">
                                    <div className="col-5">
                                        <h5 className="text-primary">{datas.cars}</h5>
                                        <span className="text-muted">{datas.description}</span>
                                    </div>
                                    <div className="col-4">
                                        <h5>Available Month</h5>
                                        {datas.available_month.map((month, index) => (
                                            <span key={index} className="text-muted">{`${month.month} Month, `}</span>
                                        ))}
                                    </div>
                                    <div className="col-3">
                                        <button onClick={() => {datas.status === false ? '' : navigate(`/car/detail/${datas.id}`)}} className={`btn ${datas.status === false ? 'btn-success' : 'btn-danger'} btn-lg btn-block`} style={{fontSize: '14px'}}>
                                            {datas.status === false ? 'Vacancies have been submitted' : 'Detail'}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <p>Data Not Found</p>
                    )}
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

export default BodyListCar