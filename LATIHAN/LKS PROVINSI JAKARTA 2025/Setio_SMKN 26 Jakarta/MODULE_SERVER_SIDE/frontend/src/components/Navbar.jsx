import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../utils/API';

const Navbar = () => {
    const [name, setName] = useState('');
    const nameUser = localStorage.getItem('name');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        setName(nameUser);
    }, []);

    const handleLogout = async() => {
        try {
            const response = await API.post('/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            localStorage.removeItem('token');
            localStorage.removeItem('name');

            alert(response.data.message)
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="/home">Installment Cars</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ml-auto mt-3">
                            <li className="nav-item">
                                <a className="nav-link" href="#">{name}</a>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link" style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar