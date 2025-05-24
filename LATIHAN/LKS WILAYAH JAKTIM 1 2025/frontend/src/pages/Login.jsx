import React from 'react'
import API from '../utils/API'
import { useState } from 'react'
import cookie from 'js-cookie'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate();
    const [user_username, setUsername] = useState('');
    const [user_password, setPassword] = useState('');
    
    const handleLogin = async() => {
        try {
            const response = await API.post('/auth/login', {
                user_username,
                user_password
            });

            const token = response.data.token;
            cookie.set('token', token);

            setTimeout(() => {
                navigate('/home');
            }, 3000);

            toast.success(response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });
        }
    }
    
  return (
    <div>
        <div className="">
            <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#e3f2fd'}}>
              <div className="container">
                <a className="navbar-brand" href="home.html"><i className="fa-solid fa-notes-medical fa-lg"></i> E-HealthApps</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            </nav>
            <div className="container my-4">
              <div className="row justify-content-center">
                <div className="col-6">
                  <div className="card">
                    <div className="card-header text-center" style={{backgroundColor: '#e3f2fd'}}>
                      <h1><i className="fa-solid fa-notes-medical fa-lg"></i> E-HealthApps</h1>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mb-4">Login Form</h5>
                      <div className="form-group mb-4">
                        <label for="inputUsername" className="sr-only">Username</label>
                        <input type="text" id="inputUsername" className="form-control" value={user_username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required autofocus/>
                      </div>
                      <div className="form-group mb-4">
                        <label for="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" value={user_password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                      </div>
                      <div className="checkbox mb-4">
                        <label>
                          <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                      </div>
                      <div className="d-grid gap-2">
                        <button onClick={handleLogin} className="btn btn-xs btn-primary" type="submit">Sign in</button>
                        <p className='text-body-secondary text-center'>
                          Don't have an Account? <Link to='/register'>Register here</Link>
                        </p>
                      </div>
                    </div>
                    <div className="card-footer text-body-secondary text-center">
                      Copyright &copy; 2025
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Login