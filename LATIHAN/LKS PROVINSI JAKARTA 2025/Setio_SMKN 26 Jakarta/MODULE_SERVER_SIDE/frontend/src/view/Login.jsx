import React from 'react'
import API from '../utils/API'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
    const navigate = useNavigate();
    const [id_card_number, setCard] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async() => {
        try {
            const response = await API.post('/auth/login', {
                id_card_number,
                password
            });
            
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('name', response.data.name)

            alert('Login Success');
            setTimeout(() => {
                navigate('/home')
            }, 2000);
        } catch (error) {
            if (error) {
                alert('Login Failed', error.response.data.message);
            }
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="#">Installment Cars</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main>
                <header className="jumbotron">
                    <div className="container text-center">
                        <h1 className="display-4">Installment Cars</h1>
                    </div>
                </header>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card card-default">
                                <div className="card-header">
                                    <h4 className="mb-0">Login</h4>
                                </div>
                                <div className="card-body">
                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">ID Card Number</div>
                                        <div className="col-8"><input value={id_card_number} onChange={(e) => setCard(e.target.value)} type="text" className="form-control"/></div>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">Password</div>
                                        <div className="col-8"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"/></div>
                                    </div>
                                    <div className="form-group row align-items-center mt-4">
                                        <div className="col-4"></div>
                                        <div className="col-8"><button className="btn btn-primary" onClick={handleLogin}>Login</button></div>
                                    </div>
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

export default Login